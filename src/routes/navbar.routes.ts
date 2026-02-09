import { NavbarRoutesTypes } from "@/types";

export const customerNavbarRoutes: NavbarRoutesTypes[] = [
    {
        title: "Cart",
        url: "/cart"
    },
    {
        title: "Orders",
        url: "/orders"
    },
    {
        title: "Dashboard",
        url: "/dashboard",
    }
];

export const sellerNavbarRoutes: NavbarRoutesTypes[] = [
    {
        title: "Medicine",
        url: "/seller/medicine"
    },
    {
        title: "Orders",
        url: "/seller/orders"
    },
    {
        title: "Dashboard",
        url: "/seller/dashboard",
    }
];

export const adminNavbarRoutes: NavbarRoutesTypes[] = [
    {
        title: "user",
        url: "/admin/user"
    },
    {
        title: "Orders",
        url: "/admin/orders"
    },
    {
        title: "Categories",
        url: "/admin/categories"
    },
    {
        title: "Dashboard",
        url: "/dashboard",
    }
];

