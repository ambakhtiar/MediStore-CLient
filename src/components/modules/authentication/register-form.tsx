"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const formSchema = z.object({
    name: z.string().min(1, "This field is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min length 8"),
    role: z.enum(["CUSTOMER", "SELLER"], "Please select a role"),
});

const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
    });
    console.log(data);
};
export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "CUSTOMER",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating user");
            try {
                // send only the fields the API expects
                const payload = {
                    name: value.name,
                    email: value.email,
                    password: value.password,
                };

                console.log("register payload:", payload);
                const { data, error } = await authClient.signUp.email(payload);
                // console.log(data);

                if (error) {
                    // backend validation errors often come back with details
                    console.error("signup error:", error);
                    toast.error(error.message || "Unable to create user", {
                        id: toastId,
                    });
                    return;
                }

                toast.success("User created successfully", { id: toastId });
                router.push("/");
                router.refresh();
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });
    return (
        <Card {...props} >
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
                        <form.Field
                            name="name" >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <form.Field
                            name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            type="email"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <form.Field
                            name="password">{(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field
                            name="role">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value || "CUSTOMER"}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="CUSTOMER">Customer</option>
                                            <option value="SELLER">Seller</option>
                                        </select>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>
                </form>

                <CardFooter className="flex flex-col gap-6 justify-end my-10">
                    <Button type="submit" form="login-form" className="w-full">
                        Register
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
            </CardContent>
        </Card>
    );
}

