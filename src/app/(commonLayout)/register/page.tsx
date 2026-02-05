import { RegisterForm } from "@/components/modules/authentication/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
};

export default function RegisterPage() {

    return (
        <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
            <div className="">
                <RegisterForm />
            </div>
        </div>
    );
}