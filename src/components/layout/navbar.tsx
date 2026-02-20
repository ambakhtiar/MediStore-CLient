// "use client";

// import { Menu, } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { ModeToggle } from "./Modeoggle";
// import { SessionWithUser } from "@/types";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";
// import { adminNavbarRoutes, customerNavbarRoutes, sellerNavbarRoutes } from "@/routes/navbar.routes";
// import { Roles } from "@/constants/roles";
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// interface MenuItem {
//     title: string;
//     url: string;
//     description?: string;
//     icon?: React.ReactNode;
//     items?: MenuItem[];
// }

// interface Navbar1Props {
//     className?: string;
//     logo?: {
//         url: string;
//         src: string;
//         alt: string;
//         title: string;
//         className?: string;
//     };
//     menu?: MenuItem[];
//     auth?: {
//         login: {
//             title: string;
//             url: string;
//         };
//         signup: {
//             title: string;
//             url: string;
//         };
//     };
//     session?: { data?: SessionWithUser | null; error: unknown } | null;
// }

// export enum UserRole {
//     CUSTOMER = "CUSTOMER",
//     SELLER = "SELLER",
//     ADMIN = "ADMIN",
// }


// const Navbar = ({
//     logo = {
//         url: "/",
//         src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//         alt: "logo",
//         title: "MediStore",
//     },
//     menu = [
//         {
//             title: "Shop",
//             url: "/shop"
//         },
//     ],
//     auth = {
//         login: { title: "Login", url: "/login" },
//         signup: { title: "Sign up", url: "/register" },
//     },
//     className,
//     session = null,
// }: Navbar1Props) => {
//     const [open, setOpen] = useState(false);

//     const handleLogOut = async () => {
//         const toastId = toast.loading("Signing out...");
//         try {
//             // Sign the user out
//             await authClient.signOut();
//             toast.success("Succesfully Logout", { id: toastId });

//             setOpen(false);
//             // Force to go home
//             window.location.href = "/";

//         } catch (err) {
//             console.error("Logout failed:", err);
//         }
//     };

//     const role = session?.data?.user?.role ?? null;
//     const roleRoutes =
//         role === Roles.admin ? adminNavbarRoutes
//             : role === Roles.seller ? sellerNavbarRoutes
//                 : role === Roles.customer ? customerNavbarRoutes
//                     : [];

//     const mergedMenu = [...menu, ...roleRoutes];

//     // helper to build callbackUrl for sign -in links
//     const callbackUrl = () => {
//         try {
//             return encodeURIComponent(window.location.href);
//         } catch {
//             return encodeURIComponent("/");
//         }
//     };


//     return (
//         <section className={cn("py-4", className)}>
//             <div className="container">
//                 {/* Desktop Menu */}
//                 <nav className="hidden items-center justify-between lg:flex">
//                     <div className="flex items-center gap-6">
//                         {/* Logo */}
//                         <a href={logo.url} className="flex items-center gap-2">
//                             <img
//                                 src={logo.src}
//                                 className="max-h-8 dark:invert"
//                                 alt={logo.alt}
//                             />
//                             <span className="text-lg font-semibold tracking-tighter">
//                                 {logo.title}
//                             </span>
//                         </a>
//                         <div className="flex items-center">
//                             <NavigationMenu>
//                                 <NavigationMenuList>
//                                     {mergedMenu.map((item) => renderMenuItem(item))}
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </div>
//                     </div>
//                     <div className="flex gap-2">
//                         <ModeToggle />
//                         {/* {
//                             session && session?.data
//                                 ? <div>
//                                     <Button onClick={handleLogOut} variant="outline"
//                                     >Logout</Button>

//                                 </div>
//                                 : <div>
//                                     <Button asChild variant="outline">
//                                         <a href={auth.login.url}>{auth.login.title}</a>
//                                     </Button>
//                                     <Button asChild>
//                                         <a href={auth.signup.url}>{auth.signup.title}</a>
//                                     </Button>
//                                 </div>
//                         } */}

//                         {/* If not signed in: show login/signup */}
//                         {!session?.data?.user ? (
//                             <div className="flex gap-2">
//                                 <Button asChild variant="outline">
//                                     <a href={`${auth.login.url}?callbackUrl=${callbackUrl()}`}>{auth.login.title}</a>
//                                 </Button>
//                                 <Button asChild>
//                                     <a href={auth.signup.url}>{auth.signup.title}</a>
//                                 </Button>
//                             </div>
//                         ) : (
//                             // Signed in: avatar + cart
//                             <div className="flex items-center gap-4">
//                                 {/* Cart icon with badge (replace count with real value) */}
//                                 <Link href="/cart" className="relative inline-flex items-center">
//                                     <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
//                                         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
//                                     </svg>
//                                     <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
//                                         {/* TODO: replace 0 with dynamic cart count */}
//                                         0
//                                     </span>
//                                 </Link>

//                                 {/* Profile avatar + dropdown */}
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setOpen((s) => !s)}
//                                         className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
//                                         aria-expanded={open}
//                                     >
//                                         <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
//                                             {session.data?.user?.image ? (
//                                                 <Image src={session.data.user.image} alt={session.data.user.name ?? "User"} width={36} height={36} className="object-cover" />
//                                             ) : (
//                                                 <span className="text-sm font-medium text-gray-600">
//                                                     {(session.data?.user?.name ?? "U").slice(0, 1).toUpperCase()}
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <div className="hidden sm:flex flex-col text-left">
//                                             <span className="text-sm font-medium text-gray-800">{session.data?.user?.name ?? "User"}</span>
//                                             <span className="text-xs text-gray-500">Profile</span>
//                                         </div>
//                                     </button>

//                                     {open && (
//                                         <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-20">
//                                             <div className="py-2">
//                                                 <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50">Profile</Link>
//                                                 <button onClick={handleLogOut} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className="block lg:hidden">
//                     <div className="flex items-center justify-between">
//                         {/* Logo */}
//                         <a href={logo.url} className="flex items-center gap-2">
//                             <img
//                                 src={logo.src}
//                                 className="max-h-8 dark:invert"
//                                 alt={logo.alt}
//                             />
//                         </a>
//                         <Sheet>
//                             <SheetTrigger asChild>
//                                 <Button variant="outline" size="icon">
//                                     <Menu className="size-4" />
//                                 </Button>
//                             </SheetTrigger>
//                             <SheetContent className="overflow-y-auto">
//                                 <SheetHeader>
//                                     <SheetTitle>
//                                         <a href={logo.url} className="flex items-center gap-2">
//                                             <img
//                                                 src={logo.src}
//                                                 className="max-h-8 dark:invert"
//                                                 alt={logo.alt}
//                                             />
//                                         </a>
//                                     </SheetTitle>
//                                 </SheetHeader>
//                                 <div className="flex flex-col gap-6 p-4">
//                                     <Accordion
//                                         type="single"
//                                         collapsible
//                                         className="flex w-full flex-col gap-4"
//                                     >
//                                         {mergedMenu.map((item) => renderMobileMenuItem(item))}
//                                     </Accordion>

//                                     <div className="flex flex-col gap-3">
//                                         <ModeToggle />
//                                         {/* {
//                                             session && session?.data
//                                                 ? <div>
//                                                     <Button onClick={handleLogOut} variant="outline"
//                                                     >Logout</Button>

//                                                 </div>
//                                                 : <div>
//                                                     <Button asChild variant="outline">
//                                                         <a href={auth.login.url}>{auth.login.title}</a>
//                                                     </Button>
//                                                     <Button asChild>
//                                                         <a href={auth.signup.url}>{auth.signup.title}</a>
//                                                     </Button>
//                                                 </div>
//                                         } */}

//                                         {/* If not signed in: show login/signup */}
//                                         {!session?.data?.user ? (
//                                             <div className="flex gap-2">
//                                                 <Button asChild variant="outline">
//                                                     <a href={`${auth.login.url}?callbackUrl=${callbackUrl()}`}>{auth.login.title}</a>
//                                                 </Button>
//                                                 <Button asChild>
//                                                     <a href={auth.signup.url}>{auth.signup.title}</a>
//                                                 </Button>
//                                             </div>
//                                         ) : (
//                                             // Signed in: avatar + cart
//                                             <div className="flex items-center gap-4">
//                                                 {/* Cart icon with badge (replace count with real value) */}
//                                                 <Link href="/cart" className="relative inline-flex items-center">
//                                                     <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
//                                                         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
//                                                     </svg>
//                                                     <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
//                                                         {/* TODO: replace 0 with dynamic cart count */}
//                                                         0
//                                                     </span>
//                                                 </Link>

//                                                 {/* Profile avatar + dropdown */}
//                                                 <div className="relative">
//                                                     <button
//                                                         onClick={() => setOpen((s) => !s)}
//                                                         className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
//                                                         aria-expanded={open}
//                                                     >
//                                                         <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
//                                                             {session.data?.user?.image ? (
//                                                                 <Image src={session.data.user.image} alt={session.data.user.name ?? "User"} width={36} height={36} className="object-cover" />
//                                                             ) : (
//                                                                 <span className="text-sm font-medium text-gray-600">
//                                                                     {(session.data?.user?.name ?? "U").slice(0, 1).toUpperCase()}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                         <div className="hidden sm:flex flex-col text-left">
//                                                             <span className="text-sm font-medium text-gray-800">{session.data?.user?.name ?? "User"}</span>
//                                                             <span className="text-xs text-gray-500">Profile</span>
//                                                         </div>
//                                                     </button>

//                                                     {open && (
//                                                         <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-20">
//                                                             <div className="py-2">
//                                                                 <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50">Profile</Link>
//                                                                 <button onClick={handleLogOut} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </SheetContent>
//                         </Sheet>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const renderMenuItem = (item: MenuItem) => {
//     if (item.items) {
//         return (
//             <NavigationMenuItem key={item.title}>
//                 <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//                 <NavigationMenuContent className="bg-popover text-popover-foreground">
//                     {item.items.map((subItem) => (
//                         <NavigationMenuLink asChild key={subItem.title} className="w-80">
//                             <SubMenuLink item={subItem} />
//                         </NavigationMenuLink>
//                     ))}
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//         );
//     }

//     return (
//         <NavigationMenuItem key={item.title}>
//             <NavigationMenuLink
//                 href={item.url}
//                 className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//             >
//                 {item.title}
//             </NavigationMenuLink>
//         </NavigationMenuItem>
//     );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//     if (item.items) {
//         return (
//             <AccordionItem key={item.title} value={item.title} className="border-b-0">
//                 <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
//                     {item.title}
//                 </AccordionTrigger>
//                 <AccordionContent className="mt-2">
//                     {item.items.map((subItem) => (
//                         <SubMenuLink key={subItem.title} item={subItem} />
//                     ))}
//                 </AccordionContent>
//             </AccordionItem>
//         );
//     }

//     return (
//         <a key={item.title} href={item.url} className="text-md font-semibold">
//             {item.title}
//         </a>
//     );
// };

// const SubMenuLink = ({ item }: { item: MenuItem }) => {
//     return (
//         <a
//             className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
//             href={item.url}
//         >
//             <div className="text-foreground">{item.icon}</div>
//             <div>
//                 <div className="text-sm font-semibold">{item.title}</div>
//                 {item.description && (
//                     <p className="text-sm leading-snug text-muted-foreground">
//                         {item.description}
//                     </p>
//                 )}
//             </div>
//         </a>
//     );
// };

// export { Navbar };



"use client";

import { Menu } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./Modeoggle";
import { SessionWithUser } from "@/types";
import { toast } from "sonner";
import { adminNavbarRoutes, customerNavbarRoutes, sellerNavbarRoutes } from "@/routes/navbar.routes";
import { Roles } from "@/constants/roles";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/providers/cart-context";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    className?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: { title: string; url: string };
        signup: { title: string; url: string };
    };
    session?: { data?: SessionWithUser | null; error: unknown } | null;
}

const Navbar = ({
    logo = {
        url: "/",
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "MediStore",
    },
    menu = [{ title: "Shop", url: "/shop" }],
    auth = { login: { title: "Login", url: "/login" }, signup: { title: "Sign up", url: "/register" } },
    className,
    session = null,
}: Navbar1Props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const cbUrlRef = useRef<string>("/");
    const [cbUrl, setCbUrl] = useState<string>("");
    const [mounted, setMounted] = useState(false);
    const { cartCount } = useCart();
    console.log("CartCount: ", cartCount);

    // Compute callbackUrl on client only to avoid SSR/CSR mismatch
    useEffect(() => {
        try {
            cbUrlRef.current = window.location.href;
        } catch {
            cbUrlRef.current = "/";
        }
        setCbUrl(cbUrlRef.current);
        setMounted(true);
    }, []);

    // BroadcastChannel listener so other tabs/components update immediately
    useEffect(() => {
        let bc: BroadcastChannel | null = null;
        try {
            bc = new BroadcastChannel("auth");
            bc.onmessage = (ev) => {
                if (ev.data?.type === "signed-out" || ev.data?.type === "signed-in") {
                    router.refresh();
                }
            };
        } catch {
            bc = null;
        }
        return () => bc?.close();
    }, [router]);

    // Robust logout: call server route that clears cookies, close dropdown, notify tabs, refresh server components
    const handleLogOut = async () => {
        const toastId = toast.loading("Signing out...");
        try {

            await authClient.signOut();
            toast.success("Successfully logged out", { id: toastId });

            // close dropdown immediately
            setOpen(false);

            // notify other tabs / components
            try {
                const bc = new BroadcastChannel("auth");
                bc.postMessage({ type: "signed-out" });
                bc.close();
            } catch { }

            // re-run server components and update UI
            router.refresh();

            // navigate without stacking history
            router.replace("/");
        } catch (err) {
            console.error("Logout failed:", err);
            toast.error("Logout failed", { id: toastId });
        }
    };

    // role-based routes (immutable)
    const role = session?.data?.user?.role ?? null;
    const roleRoutes = useMemo(
        () =>
            role === Roles.admin ? adminNavbarRoutes
                : role === Roles.seller ? sellerNavbarRoutes
                    : role === Roles.customer ? customerNavbarRoutes
                        : [],
        [role]
    );

    const mergedMenu = useMemo(() => [...menu, ...roleRoutes], [menu, roleRoutes]);

    return (
        <section className={cn("py-4", className)}>
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                        </Link>

                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {mergedMenu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <ModeToggle />

                        {/* Not signed in */}
                        {!session?.data?.user ? (
                            <div className="flex gap-2">
                                <Button asChild variant="outline">
                                    <a href={`${auth.login.url}?callbackUrl=${encodeURIComponent(cbUrl)}`}>{auth.login.title}</a>
                                </Button>
                                <Button asChild>
                                    <a href={auth.signup.url}>{auth.signup.title}</a>
                                </Button>
                            </div>
                        ) : (
                            // Signed in: avatar + cart
                            <div className="flex items-center gap-4">
                                {/* Cart icon with badge (only for CUSTOMER) */}
                                {session.data?.user?.role === Roles.customer && (
                                    // <Link href="/cart" className="relative inline-flex items-center">
                                    //     <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    //         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
                                    //     </svg>

                                    //     {/* replace `cartCount` with your state variable */}
                                    //     <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                                    //         {/* {cartCount} */} 0
                                    //     </span>
                                    // </Link>
                                    <Button variant="ghost" size="icon" className="relative" asChild>
                                        <a href="/cart">
                                            <ShoppingCart className="size-5" />
                                            {cartCount > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                                    {cartCount > 99 ? "99+" : cartCount}
                                                </span>
                                            )}
                                        </a>
                                    </Button>

                                )}

                                {/* Profile avatar + dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpen((s) => !s)}
                                        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
                                        aria-expanded={open}
                                        type="button"
                                    >
                                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                            {session.data?.user?.image ? (
                                                <Image src={session.data.user.image} alt={session.data.user.name ?? "User"} width={36} height={36} className="object-cover" />
                                            ) : (
                                                <span className="text-sm font-medium text-gray-600">
                                                    {(session.data?.user?.name ?? "U").slice(0, 1).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="hidden sm:flex flex-col text-left">
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{session.data?.user?.name ?? "User"}</span>
                                            <span className="text-xs text-gray-500">Profile</span>
                                        </div>
                                    </button>

                                    {open && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-20">
                                            <div className="py-2">
                                                <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 dark:text-black">Profile</Link>
                                                <button onClick={handleLogOut} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href={logo.url} className="flex items-center gap-2">
                            <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                        </Link>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link href={logo.url} className="flex items-center gap-2">
                                            <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                                        {mergedMenu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        <ModeToggle />
                                        {!session?.data?.user ? (
                                            <div className="flex gap-2">
                                                <Button asChild variant="outline">
                                                    <a href={`${auth.login.url}?callbackUrl=${encodeURIComponent(cbUrl)}`}>{auth.login.title}</a>
                                                </Button>
                                                <Button asChild>
                                                    <a href={auth.signup.url}>{auth.signup.title}</a>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <Link href="/cart" className="relative inline-flex items-center">
                                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
                                                    </svg>
                                                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                                                        0
                                                    </span>
                                                </Link>

                                                <div className="relative">
                                                    <button
                                                        onClick={() => setOpen((s) => !s)}
                                                        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
                                                        aria-expanded={open}
                                                        type="button"
                                                    >
                                                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                                            {session.data?.user?.image ? (
                                                                <Image src={session.data.user.image} alt={session.data.user.name ?? "User"} width={36} height={36} className="object-cover" />
                                                            ) : (
                                                                <span className="text-sm font-medium text-gray-600">
                                                                    {(session.data?.user?.name ?? "U").slice(0, 1).toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="hidden sm:flex flex-col text-left">
                                                            <span className="text-sm font-medium text-gray-800">{session.data?.user?.name ?? "User"}</span>
                                                            <span className="text-xs text-gray-500">Profile</span>
                                                        </div>
                                                    </button>

                                                    {open && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-20">
                                                            <div className="py-2">
                                                                <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50">Profile</Link>
                                                                <button onClick={handleLogOut} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>}
            </div>
        </a>
    );
};

export { Navbar };