import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WatermarkMaskBadge from './WatermarkMaskBadge';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothVideoStage({
  videoSrc = '/assets/video/skylance-exploded.mp4',
  maxTime = 10.0,
  children,
  className = '',
  id,
}) {
  const stageRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [exactDuration, setExactDuration] = useState(maxTime);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!stage || !videoWrapper || !video) return;

    video.pause();
    video.muted = true;

    // Show initial frame immediately
    if (video.readyState >= 1) {
      video.currentTime = 0.01;
    }

    let targetTime = 0;
    let isSeeking = false;
    let animFrameId = null;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setExactDuration(video.duration);
        video.currentTime = 0.01;
      }
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const handleSeeked = () => {
      isSeeking = false;
    };
    video.addEventListener('seeked', handleSeeked);

    // Smooth RAF loop with non-blocking seek execution
    const renderTick = () => {
      if (video && !isSeeking && Math.abs(video.currentTime - targetTime) > 0.03) {
        isSeeking = true;
        if (typeof video.fastSeek === 'function') {
          video.fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      }
      animFrameId = requestAnimationFrame(renderTick);
    };
    animFrameId = requestAnimationFrame(renderTick);

    const ctx = gsap.context(() => {
      // Pin the video wrapper across an expanded scroll track so the 10-second video plays out completely and smoothly
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: 'bottom bottom',
        pin: videoWrapper,
        pinSpacing: false,
        scrub: 0.5,
        onUpdate: (self) => {
          const totalDuration = video.duration || exactDuration || maxTime || 10.0;
          const cappedTime = Math.min(Math.max(self.progress * totalDuration, 0), totalDuration - 0.02);
          targetTime = cappedTime;
        },
      });
    }, stage);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      ctx.revert();
    };
  }, [videoSrc, maxTime, exactDuration, prefersReducedMotion]);

  return (
    <div
      ref={stageRef}
      id={id}
      className={`relative w-full bg-[#FF7900] min-h-[220vh] sm:min-h-[240vh] pb-16 sm:pb-24 ${className}`}
    >
      {/* Pinned Video Background with 100% Solid Color Blending and Zero Glitch Overlays */}
      <div
        ref={videoWrapperRef}
        className="w-full h-screen overflow-hidden z-0 pointer-events-none bg-[#FF7900]"
        style={{ willChange: 'transform' }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center select-none"
        />

        {/* Seamless Perimeter Edge Blenders: dissolves any MP4 color compression step into #FF7900 */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FF7900] via-[#FF7900]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FF7900] via-[#FF7900]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FF7900] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FF7900] to-transparent pointer-events-none" />

        {/* Strategic Watermark Concealer Badge */}
        <WatermarkMaskBadge />
      </div>

      {/* Content overlays that scroll naturally upward over the pinned video with expanded scroll distance */}
      <div className="relative z-10 -mt-[100vh] flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
