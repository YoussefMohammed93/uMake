"use client";

import { gsap } from "gsap";
import { Play, Pause } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const setupScrollAnimations = useCallback(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        scale: 0.8,
        opacity: 0,
        rotationY: -15,
        z: -100,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        z: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    if (controlsRef.current) {
      gsap.fromTo(
        controlsRef.current,
        {
          y: 20,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          delay: 0.6,
          scrollTrigger: {
            trigger: controlsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    gsap.to(containerRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const setupVideoAnimations = useCallback(() => {
    if (!videoRef.current) return;

    gsap.fromTo(
      videoRef.current,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        filter: "brightness(0.3) contrast(1.2)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        filter: "brightness(1) contrast(1)",
        duration: 2,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    ScrollTrigger.create({
      trigger: videoRef.current,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        if (videoRef.current && isVideoLoaded) {
          videoRef.current.play().catch((error) => {
            console.log("Play prevented:", error);
          });
        }
      },
      onLeave: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      onEnterBack: () => {
        if (videoRef.current && isVideoLoaded) {
          videoRef.current.play().catch((error) => {
            console.log("Play prevented:", error);
          });
        }
      },
      onLeaveBack: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
    });
  }, [isVideoLoaded]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setupScrollAnimations();
      setupVideoAnimations();
    }, sectionRef);

    return () => ctx.revert();
  }, [setupScrollAnimations, setupVideoAnimations]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatePlayingState = () => {
      setIsPlaying(!video.paused && !video.ended);
    };

    updatePlayingState();

    video.addEventListener("play", updatePlayingState);
    video.addEventListener("pause", updatePlayingState);
    video.addEventListener("playing", updatePlayingState);
    video.addEventListener("waiting", updatePlayingState);
    video.addEventListener("seeking", updatePlayingState);
    video.addEventListener("seeked", updatePlayingState);
    video.addEventListener("ended", updatePlayingState);

    return () => {
      video.removeEventListener("play", updatePlayingState);
      video.removeEventListener("pause", updatePlayingState);
      video.removeEventListener("playing", updatePlayingState);
      video.removeEventListener("waiting", updatePlayingState);
      video.removeEventListener("seeking", updatePlayingState);
      video.removeEventListener("seeked", updatePlayingState);
      video.removeEventListener("ended", updatePlayingState);
    };
  }, [isVideoLoaded]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.log("Play prevented:", error);
      });
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Auto-play prevented:", error);
          setIsPlaying(false);
        });
    }
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused && !videoRef.current.ended);
    }
  };

  const handleVideoPause = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused && !videoRef.current.ended);
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          <div className="from-foreground via-foreground/80 to-foreground/60 relative overflow-hidden rounded-3xl bg-gradient-to-br shadow-2xl">
            <div className="relative z-10 aspect-square sm:aspect-video">
              <video
                ref={videoRef}
                className="h-full w-full rounded-3xl object-cover"
                onLoadedData={handleVideoLoad}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onPlaying={handleVideoPlay}
                onWaiting={handleVideoPause}
                onEnded={handleVideoPause}
                autoPlay
                loop
                playsInline
                preload="metadata"
                muted
              >
                <source src="/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div ref={controlsRef} className="absolute bottom-6 left-6 flex items-center">
                <button
                  ref={playButtonRef}
                  onClick={handlePlayPause}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
