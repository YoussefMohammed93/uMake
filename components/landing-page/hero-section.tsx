"use client";

import Link from "next/link";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { Button } from "@/components/ui/button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const trustedByRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateGradientBackground();

      const tl = gsap.timeline();

      tl.fromTo(
        announcementRef.current,
        {
          y: -100,
          opacity: 0,
          scale: 0.8,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.3,
        },
      );

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=1",
      );

      tl.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.5,
          rotationY: 180,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5",
      );

      tl.fromTo(
        trustedByRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8",
      );

      setupContinuousAnimations();

      setupScrollAnimations();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateGradientBackground = () => {
    if (!gradientRef.current) return;

    gsap.fromTo(
      gradientRef.current,
      {
        rotation: 0,
        scale: 0.8,
        opacity: 0,
      },
      {
        rotation: 360,
        scale: 1,
        opacity: 0.3,
        duration: 3,
        ease: "power2.out",
      },
    );
  };

  const setupContinuousAnimations = () => {
    const sparklesIcon = announcementRef.current?.querySelector(".sparkles-icon");
    if (sparklesIcon) {
      gsap.to(sparklesIcon, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    }

    if (buttonRef.current) {
      const button = buttonRef.current.querySelector("a");
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button.querySelector("svg"), {
            x: 5,
            rotation: 15,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(button.querySelector("svg"), {
            x: 0,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    }
  };

  const setupScrollAnimations = () => {
    gsap.to(gradientRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden sm:pt-10">
      <div
        ref={gradientRef}
        className="absolute inset-0 -z-10 min-h-[110vh] opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 165, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(173, 216, 230, 0.1) 100%)
          `,
        }}
      />
      <div className="flex h-screen items-center justify-center">
        <div className="relative z-10 container mx-auto max-w-5xl px-5">
          <div ref={announcementRef} className="mx-auto mb-12 w-full max-w-3xl">
            <Link
              href="/product"
              className="group bg-background/85 inline-flex w-full items-center justify-between gap-2 rounded-lg p-5"
            >
              <div className="flex items-center gap-5">
                <Sparkles className="sparkles-icon size-5 text-orange-500" />
                <p className="text-sm md:text-base">
                  Just Launched: Discover Our AI-Powered Creative Tools.
                </p>
              </div>
              <ChevronRight className="text-muted-foreground hidden size-7 stroke-[1.5] md:block" />
            </Link>
          </div>
          <div className="mb-8 text-center">
            <h1 ref={titleRef} className="font-ovo text-5xl leading-tight md:text-6xl lg:text-7xl">
              Create freely.
              <br />
              Design and ideate in 3D.
            </h1>
          </div>
          <div className="mb-12 text-center">
            <p
              ref={subtitleRef}
              className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed md:text-lg"
            >
              Bring your concepts to life with uMake's 3D modeling and design tools, turning your
              vision into reality.
            </p>
          </div>
          <div ref={buttonRef} className="flex justify-center">
            <Button asChild size="lg" className="!h-11 w-full !px-8 sm:w-auto">
              <Link href="/" className="flex items-center gap-2 !text-base">
                Get uMake
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  focusable="false"
                  className="fill-current text-white"
                >
                  <g>
                    <path d="M244,160a12,12,0,0,1-12,12H200.67l17.66,29.89a12,12,0,1,1-20.66,12.21L140.9,118a12,12,0,0,1,20.66-12.2L186.48,148H232A12,12,0,0,1,244,160ZM133.15,148H97.39L162.33,38.11A12,12,0,1,0,141.67,25.9L128,49,114.33,25.9A12,12,0,1,0,93.67,38.11l20.39,34.51L69.52,148H24a12,12,0,0,0,0,24H133.15a12,12,0,0,0,0-24ZM58.83,189.67a12,12,0,0,0-16.43,4.22l-4.73,8A12,12,0,1,0,58.33,214.1l4.73-8A12,12,0,0,0,58.83,189.67Z"></path>
                  </g>
                </svg>
              </Link>
            </Button>
          </div>
          <div className="mt-10 text-center">
            <p ref={trustedByRef} className="text-muted-foreground text-sm">
              Trusted by Designers Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
