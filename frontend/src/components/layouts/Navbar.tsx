"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const links = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/directory" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Donate", href: "/donate" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-primary">
                    GH Ghana Charities
                </Link>

                {/* Desktop Nav */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="gap-4">
                        {links.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Nav */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="lg" className="md:hidden">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="flex flex-col space-y-4 mt-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-medium hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
