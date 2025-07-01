"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-36">
      <div className="container mx-auto max-w-5xl px-5">
        <div className="mx-auto mb-12 w-full max-w-3xl">
          <Link
            href="/product"
            className="group inline-flex w-full items-center justify-between gap-2 rounded-lg bg-[#faf3ec] p-5"
          >
            <div className="flex items-center gap-5">
              <Sparkles className="size-5 text-orange-500" />
              <p className="text-sm md:text-base">
                Just Launched: Discover Our AI-Powered Creative Tools.
              </p>
            </div>
            <ChevronRight className="text-muted-foreground hidden size-7 stroke-[1.5] md:block" />
          </Link>
        </div>
        <div className="mb-8 text-center">
          <h1 className="font-ovo text-5xl leading-tight md:text-6xl lg:text-7xl">
            Create freely.
            <br />
            Design and ideate in 3D.
          </h1>
        </div>
        <div className="mb-12 text-center">
          <p className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed md:text-lg">
            Bring your concepts to life with uMake's 3D modeling and design tools, turning your
            vision into reality.
          </p>
        </div>
        <div className="flex justify-center">
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
          <p className="text-muted-foreground text-sm">Trusted by Designers Worldwide</p>
        </div>
      </div>
    </section>
  );
}
