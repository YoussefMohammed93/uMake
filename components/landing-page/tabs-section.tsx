"use client";

import { gsap } from "gsap";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronRightIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TabsSection() {
  const [activeTab, setActiveTab] = useState("sketching");
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({
    sketching: false,
    modeling: false,
    visualization: false,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isAnimated, setIsAnimated] = useState(false);
  const [isTabSwitching, setIsTabSwitching] = useState(false);

  const tabsData = [
    {
      id: "sketching",
      label: "Sketching",
      badge: "Sketch and Draw",
      title: "Sketch with precision or go freestyle",
      description:
        "Use the Precision tool for straight lines and arcs, the Pen tool for smooth curves, or go freehand with the Freestyle tool. Sketch exactly how you want.",
      buttonText: "Explore Sketching",
      vidSrc: "./tab-1.mp4",
    },
    {
      id: "modeling",
      label: "Modeling",
      badge: "Advanced Modeling Tools",
      title: "Add depth with 3D modeling",
      description:
        "Create 3D models with ease using advanced features like Push & Pull, NURBS surfaces, or simply drag and drop elements from the library.",
      buttonText: "Explore Modeling",
      vidSrc: "./tab-2.mp4",
    },
    {
      id: "visualization",
      label: "Visualization",
      badge: "Showcase Your Work",
      title: "Visualize your ideas in the best light",
      description:
        "Showcase your designs with on-device ray-tracing for realistic rendering, or enhance presentations with Slides using Markup tools.",
      buttonText: "Explore Visualization",
      vidSrc: "./tab-3.mp4",
    },
  ];

  const handleVideoLoad = (tabId: string) => {
    const video = videoRefs.current[tabId];
    if (video) {
      video.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
    }
  };

  const handlePlayPause = (tabId: string) => {
    const video = videoRefs.current[tabId];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const handleVideoPlay = (tabId: string) => {
    setPlayingStates((prev) => ({ ...prev, [tabId]: true }));
  };

  const handleVideoPause = (tabId: string) => {
    setPlayingStates((prev) => ({ ...prev, [tabId]: false }));
  };

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && previousTab && contentRefs.current[previousTab]) {
      setIsTabSwitching(true);

      const previousContentElement = contentRefs.current[previousTab];
      const previousLeftElements =
        previousContentElement?.querySelectorAll(".left-content-animate");
      const previousRightElement = previousContentElement?.querySelector(".right-content-animate");

      const exitTl = gsap.timeline({
        onComplete: () => {
          setPreviousTab(activeTab);
          setActiveTab(newTab);
          setIsTabSwitching(false);
        },
      });

      if (previousLeftElements && previousLeftElements.length > 0) {
        exitTl.to(previousLeftElements, {
          opacity: 0,
          x: -50,
          y: -25,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
        });
      }

      if (previousRightElement) {
        exitTl.to(
          previousRightElement,
          {
            opacity: 0,
            x: 50,
            y: -25,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.3",
        );
      }
    } else {
      setPreviousTab(activeTab);
      setActiveTab(newTab);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && sectionRef.current && !isAnimated) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      if (headerRef.current) {
        const headerElements = headerRef.current.querySelectorAll(".animate-element");
        tl.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        );
      }

      if (tabsListRef.current) {
        tl.fromTo(
          tabsListRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        );
      }

      setIsAnimated(true);
    }
  }, [isAnimated]);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeTab];
    if (currentVideo) {
      currentVideo.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
    }

    Object.keys(videoRefs.current).forEach((tabId) => {
      if (tabId !== activeTab) {
        const video = videoRefs.current[tabId];
        if (video) {
          video.pause();
        }
      }
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && contentRefs.current[activeTab] && !isTabSwitching) {
      const contentElement = contentRefs.current[activeTab];
      const leftContentElements = contentElement?.querySelectorAll(".left-content-animate");
      const rightContentElement = contentElement?.querySelector(".right-content-animate");

      const tl = gsap.timeline();

      if (leftContentElements && leftContentElements.length > 0) {
        gsap.set(leftContentElements, { opacity: 0, x: -100, y: -50 });
        tl.to(leftContentElements, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        });
      }

      if (rightContentElement) {
        gsap.set(rightContentElement, { opacity: 0, x: 100, y: -50 });
        tl.to(
          rightContentElement,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.5",
        );
      }
    }
  }, [activeTab, isTabSwitching]);

  useEffect(() => {
    setPreviousTab(null);
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-32">
      <div ref={headerRef} className="space-y-6 text-center lg:space-y-8">
        <Badge
          variant="outline"
          className="animate-element px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base"
        >
          All-in-One Design Tools
        </Badge>
        <h1 className="animate-element font-instrument-serif text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          3D design made simple
        </h1>
        <p className="animate-element text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-lg lg:text-xl">
          Easily sketch, model, and explore a rich library of 3D models, textures, and more to bring
          your ideas to life in 3D.
        </p>
      </div>
      <div className="pt-12 lg:pt-16">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center pb-12 lg:pb-16">
            <div ref={tabsListRef} className="w-full max-w-md sm:w-auto">
              <TabsList className="bg-secondary/80 hover:bg-secondary grid h-12 w-full grid-cols-3 gap-2 p-1 backdrop-blur-sm transition-all duration-300 sm:h-14 sm:w-fit sm:gap-0">
                {tabsData.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-background hover:bg-background/50 relative px-3 py-2 mx-1 text-xs font-medium transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:shadow-lg sm:px-6 sm:py-3 sm:text-sm"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div
                ref={(el) => {
                  contentRefs.current[tab.id] = el;
                }}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20"
              >
                <div className="space-y-6 lg:order-1 lg:space-y-8">
                  <div className="space-y-4 lg:space-y-6">
                    <Badge
                      variant="outline"
                      className="left-content-animate px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base"
                    >
                      {tab.badge}
                    </Badge>
                    <h2 className="left-content-animate font-instrument-serif text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                      {tab.title}
                    </h2>
                    <p className="left-content-animate text-muted-foreground text-base leading-relaxed sm:text-lg lg:text-xl">
                      {tab.description}
                    </p>
                  </div>
                  <Button className="left-content-animate group !h-12 w-full rounded-xl !px-6 text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:!h-14 sm:w-auto sm:!px-8 sm:text-lg">
                    {tab.buttonText}
                    <ChevronRightIcon className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1 sm:size-6" />
                  </Button>
                </div>
                <div className="lg:order-2">
                  <div className="right-content-animate relative mx-auto max-w-lg lg:max-w-xl xl:max-w-2xl">
                    <div className="from-foreground/5 via-foreground/10 to-foreground/5 group hover:shadow-3xl relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-2xl transition-all duration-500 hover:scale-[1.02] lg:rounded-3xl">
                      <div className="relative aspect-[4/3]">
                        <video
                          ref={(el) => {
                            videoRefs.current[tab.id] = el;
                          }}
                          className="h-full w-full rounded-2xl object-cover transition-all duration-500 group-hover:scale-[1.01] lg:rounded-3xl"
                          onLoadedData={() => handleVideoLoad(tab.id)}
                          onPlay={() => handleVideoPlay(tab.id)}
                          onPause={() => handleVideoPause(tab.id)}
                          onPlaying={() => handleVideoPlay(tab.id)}
                          onWaiting={() => handleVideoPause(tab.id)}
                          onEnded={() => handleVideoPause(tab.id)}
                          autoPlay={activeTab === tab.id}
                          loop
                          playsInline
                          preload="metadata"
                          muted
                        >
                          <source src={tab.vidSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute bottom-4 left-4 flex items-center sm:bottom-6 sm:left-6">
                          <button
                            onClick={() => handlePlayPause(tab.id)}
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/40 active:scale-95 sm:h-14 sm:w-14"
                            aria-label={playingStates[tab.id] ? "Pause video" : "Play video"}
                          >
                            {playingStates[tab.id] ? (
                              <Pause className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                            ) : (
                              <Play className="ml-0.5 h-5 w-5 text-white sm:h-6 sm:w-6" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
