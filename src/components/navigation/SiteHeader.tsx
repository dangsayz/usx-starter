
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "@headlessui/react";
import { Icon } from "@/src/components/ui/Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/forum", label: "Forum" },
  { href: "/resources", label: "Resources" },
  { href: "/admin", label: "Admin" },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border">
            <Icon name="Sparkles" className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight">Elyndor</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile */}
        <Menu as="div" className="relative md:hidden">
          <Menu.Button className="inline-flex h-9 w-9 items-center justify-center rounded-md border">
            <Icon name="Menu" className="h-4 w-4" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none">
            <div className="p-1">
              {links.map((l) => (
                <Menu.Item key={l.href}>
                  {({ active }) => (
                    <Link
                      href={l.href}
                      className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm ${
                        active ? "bg-accent text-accent-foreground" : "hover:bg-accent"
                      }`}
                    >
                      <Icon name="ArrowRight" className="h-4 w-4" />
                      {l.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
