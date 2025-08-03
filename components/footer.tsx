"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Linkedin, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "uMake",
      links: [
        { name: "Download App", href: "/download" },
        { name: "Pricing", href: "/pricing" },
        { name: "uMake+", href: "/umake-plus" },
        { name: "For Education", href: "/education" },
      ],
    },
    {
      title: "Industries",
      links: [
        { name: "Architecture", href: "/architecture" },
        { name: "Interior Design", href: "/interior-design" },
        { name: "Product Design", href: "/product-design" },
      ],
    },
    {
      title: "Learn",
      links: [
        { name: "Knowledge Base", href: "/learn" },
        { name: "Design Glossary Hub", href: "/glossary" },
        { name: "Forum", href: "/forum" },
        { name: "FAQ", href: "/faq" },
        { name: "Product Updates", href: "/updates" },
      ],
    },
    {
      title: "Product",
      links: [
        { name: "Sketching", href: "/sketching" },
        { name: "Modeling", href: "/modeling" },
        { name: "Visualization", href: "/visualization" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Customer Stories", href: "/customer-stories" },
        { name: "Editorial Articles", href: "/articles" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About uMake", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Terms of Use", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookies Policy", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/umake", icon: Instagram },
    { name: "YouTube", href: "https://youtube.com/umake", icon: Youtube },
    { name: "LinkedIn", href: "https://linkedin.com/company/umake", icon: Linkedin },
    { name: "Facebook", href: "https://facebook.com/umake", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/umake", icon: Twitter },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-7">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <Image priority alt="uMake Logo" src="./logo.svg" width={24} height={24} />
              <span className="text-xl font-bold">uMake</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm text-sm leading-relaxed">
              Bring your concepts to life with uMake's powerful 3D modeling and design tools,
              turning your vision into reality.
            </p>
            <div className="flex items-center gap-7">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Navigation sections */}
          <div className="lg:col-span-5 lg:pl-32">
            <div className="space-y-12">
              {/* First row: uMake, Industries, Product */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {footerSections.slice(0, 3).map((section) => (
                  <div key={section.title}>
                    <h3 className="text-foreground mb-4 text-base font-semibold">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Second row: Explore, Learn, Company */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {footerSections.slice(3, 6).map((section) => (
                  <div key={section.title}>
                    <h3 className="text-foreground mb-4 text-base font-semibold">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
