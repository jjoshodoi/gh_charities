"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Directory", href: "/directory" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Supporters", href: "/supporters" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center space-x-2">
                    <img
                        src="/images/gh-charities-logo-2.png"
                        alt="UK Ghana Charities Logo"
                        className="h-16 w-auto"
                    />
                    <span className="sr-only">UK Ghana Charities</span>
                </Link>


                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-6">
                            {links.map((link) => (
                                <NavigationMenuItem key={link.name}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-medium text-accent hover:text-white transition-colors no-underline"
                                        >
                                            {link.name}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Donate CTA */}
                    <Button className="bg-accent text-white hover:bg-accent/90 text-sm px-5 py-2 rounded-md shadow">
                        <Link href="/donate" className={"no-underline"}>Donate</Link>
                    </Button>
                </div>

                {/* Mobile Nav */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-white/80">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[250px] bg-primary text-white">
                        <nav className="flex flex-col gap-4 mt-8">
                            {links.concat({ name: "Donate", href: "/donate" }).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-accent hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
