"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronRightIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export function TabsSection() {
  const [activeTab, setActiveTab] = useState("sketching");
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({
    sketching: false,
    modeling: false,
    visualization: false,
  });

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
  }, [activeTab]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-40 sm:px-5">
      <div className="space-y-4 text-center">
        <Badge variant="outline" className="px-4 py-2 text-sm font-semibold">
          All-in-One Design Tools
        </Badge>
        <h1 className="font-instrument-serif text-5xl leading-tight md:text-6xl">
          3D design made simple
        </h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-lg">
          Easily sketch, model, and explore a rich library of 3D models, textures, and more to bring
          your ideas to life in 3D.
        </p>
      </div>
      <div className="pt-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center pb-14">
            <TabsList className="bg-secondary grid h-14 w-fit grid-cols-3 p-1">
              {tabsData.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-background px-6 py-3 text-sm font-medium data-[state=active]:shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-6 lg:order-1">
                  <div className="space-y-4">
                    <Badge variant="outline" className="px-4 py-2 text-sm font-semibold">
                      {tab.badge}
                    </Badge>
                    <h2 className="font-instrument-serif text-4xl leading-tight font-semibold md:text-5xl lg:text-6xl">
                      {tab.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {tab.description}
                    </p>
                  </div>
                  <Button className="!h-11 w-full rounded-lg !px-4 text-base font-medium sm:w-auto">
                    {tab.buttonText}
                    <ChevronRightIcon className="mt-0.5 size-5" />
                  </Button>
                </div>
                <div className="lg:order-2">
                  <div className="relative mx-auto max-w-lg">
                    <div className="from-foreground/5 via-foreground/10 to-foreground/5 relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-xl">
                      <div className="relative aspect-[4/3]">
                        <video
                          ref={(el) => {
                            videoRefs.current[tab.id] = el;
                          }}
                          className="h-full w-full rounded-2xl object-cover"
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
                        <div className="absolute bottom-4 left-4 flex items-center">
                          <button
                            onClick={() => handlePlayPause(tab.id)}
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
                            aria-label={playingStates[tab.id] ? "Pause video" : "Play video"}
                          >
                            {playingStates[tab.id] ? (
                              <Pause className="h-4 w-4 text-white" />
                            ) : (
                              <Play className="ml-0.5 h-4 w-4 text-white" />
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
