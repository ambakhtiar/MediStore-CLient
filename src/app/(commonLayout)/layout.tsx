import { Navbar1 } from "@/components/layout/navbar1";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8">
            <Navbar1 />
            {children}
        </div>
    );
};

export default CommonLayout;