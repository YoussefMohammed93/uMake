"use client";

import Link from "next/link";
import Image from "next/image";

import { gsap } from "gsap";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const tl = gsap.timeline();

      gsap.set(headerRef.current, { y: -100, opacity: 0 });
      gsap.set([logoRef.current, navRef.current, buttonsRef.current, mobileMenuRef.current], {
        y: -50,
        opacity: 0,
        scale: 0.8,
      });

      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          logoRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )
        .to(
          navRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          buttonsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.1",
        )
        .to(
          mobileMenuRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        );

      const navItems = navRef.current?.querySelectorAll("a, button");
      if (navItems) {
        gsap.set(navItems, { y: -20, opacity: 0 });
        gsap.to(navItems, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.8,
        });
      }

      const buttons = buttonsRef.current?.querySelectorAll("a");
      if (buttons) {
        gsap.set(buttons, { y: -15, opacity: 0, scale: 0.9 });
        gsap.to(buttons, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
          stagger: 0.1,
          delay: 1.0,
        });
      }
    }
  }, []);

  const navItems = [
    {
      name: "Product",
      hasDropdown: true,
      links: [
        { name: "Ideating", href: "/ideating" },
        { name: "Sketching", href: "/sketching" },
        { name: "Modeling", href: "/modeling" },
        { name: "Visualization", href: "/visualization" },
        { name: "AI Tools", href: "/ai" },
      ],
    },
    {
      name: "Industries",
      hasDropdown: true,
      links: [
        { name: "Architecture", href: "/architecture" },
        { name: "Interior Design", href: "/interior-design" },
        { name: "Product Design", href: "/product-design" },
      ],
    },
    {
      name: "Explore",
      hasDropdown: false,
      href: "/explore",
    },
    {
      name: "Learn",
      hasDropdown: true,
      links: [
        { name: "Knowledge Base", href: "/learn" },
        { name: "Forum", href: "/forum" },
        { name: "FAQ", href: "/faq" },
      ],
    },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="bg-background/95 fixed top-0 right-0 left-0 z-50 mx-auto flex max-w-6xl items-center justify-between border px-5 py-4 backdrop-blur-sm md:mt-5 md:rounded-full md:px-6"
      >
        <div className="flex items-center gap-8">
          <div ref={logoRef}>
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Image priority alt="Logo" src="./logo.svg" width={24} height={24} />
              <span className="text-xl font-bold">uMake</span>
            </Link>
          </div>
          <nav ref={navRef} className="hidden items-center gap-3 md:flex">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <HoverCard
                  key={item.name}
                  openDelay={200}
                  onOpenChange={(open) => setHoveredItem(open ? item.name : null)}
                >
                  <HoverCardTrigger asChild>
                    <button className="text-foreground hover:text-primary hover:bg-accent dark:hover:bg-accent/50 flex cursor-pointer items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200">
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          hoveredItem === item.name ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="animate-in fade-in-0 zoom-in-95 w-auto p-2 duration-200"
                    align="start"
                  >
                    <div className="space-y-1">
                      {item.links?.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-foreground hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-sm transition-colors duration-150"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  className="text-foreground hover:text-primary hover:bg-accent dark:hover:bg-accent/50 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div ref={buttonsRef} className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/download">Download</Link>
          </Button>
          <Button asChild variant="default" className="rounded-full">
            <Link href="/contact-sales">Contact Sales</Link>
          </Button>
        </div>
        <div ref={mobileMenuRef} className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" aria-label="Toggle mobile menu">
                <Menu className="h-6 w-6 stroke-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80">
              <SheetHeader className="pb-4">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <Image priority alt="Logo" src="./logo.svg" width={24} height={24} />
                  <span className="text-xl font-bold">uMake</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-6 overflow-y-auto px-5">
                {navItems.map((item) => (
                  <div key={item.name} className="space-y-3">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedMobileItem(
                              expandedMobileItem === item.name ? null : item.name,
                            )
                          }
                          className="text-foreground hover:text-primary flex w-full cursor-pointer items-center justify-between text-left text-lg font-semibold transition-colors duration-200"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              expandedMobileItem === item.name ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedMobileItem === item.name
                              ? "max-h-60 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="space-y-2">
                            {item.links?.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground block py-2 text-base transition-colors duration-150"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className="text-foreground hover:text-primary block text-lg font-semibold transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <SheetFooter>
                <Button variant="default" size="lg" className="w-full" asChild>
                  <Link href="/download">Download</Link>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};
