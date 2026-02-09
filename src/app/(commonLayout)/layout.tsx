import { Navbar } from "@/components/layout/navbar";
import { ReactNode } from "react";
import { getSession } from "@/action/user.action";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getSession();

    return (
        // <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="w-11/12 md:max-w-5xl lg:max-w-6xl mx-auto px-4 lg:px-8">
            <Navbar session={session} />
            {children}
        </div>
    );
};

export default CommonLayout;