"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";

export const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null
  );

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
      <header className="flex items-center justify-between max-w-6xl mx-auto md:mt-5 px-5 md:px-6 py-4 border md:rounded-full bg-background">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              priority
              alt="Logo"
              src="./logo.svg"
              width={24}
              height={24}
            />
            <span className="text-xl font-bold">uMake</span>
          </Link>
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <HoverCard
                  key={item.name}
                  openDelay={200}
                  onOpenChange={(open) =>
                    setHoveredItem(open ? item.name : null)
                  }
                >
                  <HoverCardTrigger asChild>
                    <button className="cursor-pointer flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 hover:bg-accent dark:hover:bg-accent/50">
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          hoveredItem === item.name ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="w-auto p-2 animate-in fade-in-0 zoom-in-95 duration-200"
                    align="start"
                  >
                    <div className="space-y-1">
                      {item.links?.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="block px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150"
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
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 hover:bg-accent dark:hover:bg-accent/50 px-3.5 py-2 rounded-md"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/download">Download</Link>
          </Button>
          <Button asChild variant="default" className="rounded-full">
            <Link href="/contact-sales">Contact Sales</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" aria-label="Toggle mobile menu">
              <Menu className="h-6 w-6 stroke-2" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80">
            <SheetHeader className="pb-4">
              <SheetTitle className="flex items-center gap-2 text-left">
                <Image
                  priority
                  alt="Logo"
                  src="./logo.svg"
                  width={24}
                  height={24}
                />
                <span className="text-xl font-bold">uMake</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto space-y-6 px-5">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-3">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setExpandedMobileItem(
                            expandedMobileItem === item.name ? null : item.name
                          )
                        }
                        className="cursor-pointer flex items-center justify-between w-full text-left text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expandedMobileItem === item.name
                              ? "rotate-180"
                              : "rotate-0"
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
                              className="block text-base text-muted-foreground hover:text-foreground transition-colors duration-150 py-2"
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
                      className="block text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200"
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
      </header>
    </>
  );
};
