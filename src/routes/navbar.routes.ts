import { NavbarRoutesTypes } from "@/types";

export const customerNavbarRoutes: NavbarRoutesTypes[] = [
    {
        title: "Orders",
        url: "/orders"
    },
    {
        title: "Reviews",
        url: "/reviews"
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
        title: "Users",
        url: "/admin/users"
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

