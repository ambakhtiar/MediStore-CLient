"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    password: z.string().min(8, "Minimum length is 8"),
    email: z.string().email("Invalid email"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";


    const handleGoogleLogin = async () => {
        const data = authClient.signIn.social({
            provider: "google",
            callbackURL: callbackUrl,
        });

        console.log(data);
    };

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in");
            try {
                const { data, error } = await authClient.signIn.email(value);

                if (error) {
                    // log full error and any server data for debugging 401
                    console.error("Sign-in error:", error, { data });
                    const message = error?.message ?? "Unauthorized - check credentials";
                    toast.error(message, { id: toastId });
                    return;
                }

                if (!data) {
                    console.error("Empty sign-in response:", data);
                    toast.error("Unexpected response from server", { id: toastId });
                    return;
                }

                console.log(data);
                console.log(window.location.pathname);
                toast.success("User Logged in Successfully", { id: toastId });

                router.push(callbackUrl);
            } catch (err: unknown) {
                console.error("Network/exception during sign-in:", err);

                if (err instanceof Error) {
                    toast.error(err.message ?? "Something went wrong, please try again.", { id: toastId });
                } else {
                    toast.error(String(err) || "Something went wrong, please try again.", { id: toastId });
                }
            }
        },
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-5 justify-end">
                <Button form="login-form" type="submit" className="w-full">
                    Login
                </Button>
                <Button
                    onClick={() => handleGoogleLogin()}
                    variant="outline"
                    type="button"
                    className="w-full"
                >
                    Continue with Google
                </Button>
            </CardFooter>
        </Card>
    );
}
