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
          // Smooth non-linear or calibrated progress mapping to ensure all 10 seconds are experienced
          const cappedTime = Math.min(Math.max(self.progress * totalDuration, 0), totalDuration - 0.02);
          targetTime = cappedTime;
        },
      });

      // Gentle subtle breathing bob when stationary
      if (!prefersReducedMotion) {
        gsap.to(video, {
          y: 6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
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
      {/* Pinned Video Background */}
      <div
        ref={videoWrapperRef}
        className="w-full h-screen overflow-hidden z-0 pointer-events-none"
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

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 aerospace-radial opacity-45 pointer-events-none" />

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
