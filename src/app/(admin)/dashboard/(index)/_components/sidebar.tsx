// Sidebar.tsx
import React from "react";
import Link from "next/link";
import {
    Archive,
    Building,
    Home,
    Package,
    Package2,
    ShoppingCart,
    Users2,
    MapPin
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FormLogout from "./form-logout";

export default function Sidebar() {
    return (
        <aside className="w-14 bg-background flex flex-col items-center py-5 border-r">
            <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
                <Package2 className="h-4 w-4" />
            </Link>

            <nav className="mt-6 flex flex-col gap-4">
                <TooltipProvider>
                    <NavItem href="#" icon={Home} label="Dashboard" />
                    <NavItem href="/dashboard/categories" icon={Archive} label="Categories" />
                    <NavItem href="/dashboard/locations" icon={MapPin} label="Locations" />
                    <NavItem href="/dashboard/brands" icon={Building} label="Brands" />
                    <NavItem href="/dashboard/products" icon={Package} label="Products" />
                    <NavItem href="/dashboard/orders" icon={ShoppingCart} label="Orders" isActive />
                    <NavItem href="/dashboard/customers" icon={Users2} label="Customers" />
                </TooltipProvider>
            </nav>

            <div className="mt-auto">
                <TooltipProvider>
                    <FormLogout />
                </TooltipProvider>
            </div>
        </aside>
    );
}

function NavItem({
    href,
    icon: Icon,
    label,
    isActive = false,
}: {
    href: string;
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors 
                        ${isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Icon className="h-5 w-5" />
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    );
}
