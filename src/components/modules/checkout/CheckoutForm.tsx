"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/action/order.action";
import { checkoutFormSchema, type CheckoutFormValues } from "@/lib/validations/order.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/providers/cart-context";

interface CheckoutFormProps {
    subtotal: number;
    itemCount: number;
}

export default function CheckoutForm({ subtotal, itemCount }: CheckoutFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { refreshCart } = useCart();

    const form = useForm<CheckoutFormValues>({
        defaultValues: {
            shippingName: "",
            shippingPhone: "",
            shippingAddress: "",
        },
        validatorAdapter: zodValidator(),
        validators: {
            onChange: checkoutFormSchema,
        },
        onSubmit: async ({ value }) => {
            setIsSubmitting(true);
            const toastId = toast.loading("অর্ডার প্রসেস হচ্ছে...");

            try {
                const result = await createOrder(value);

                if (!result.ok) {
                    toast.error(result.error?.message || "অর্ডার করা যায়নি", { id: toastId });
                    return;
                }

                toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!", { id: toastId });

                // Refresh cart (will be empty now)
                await refreshCart();

                // Redirect to orders page
                router.push("/orders");
            } catch (error) {
                console.error("Order submission error:", error);
                toast.error("একটি সমস্যা হয়েছে", { id: toastId });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>ডেলিভারি তথ্য</CardTitle>
                        <CardDescription>আপনার ডেলিভারি তথ্য দিন</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-6"
                        >
                            {/* Shipping Name */}
                            <form.Field
                                name="shippingName"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="shippingName">
                                            নাম <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="shippingName"
                                            type="text"
                                            placeholder="আপনার পূর্ণ নাম লিখুন"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                        {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                            <p className="text-sm text-red-500">
                                                {field.state.meta.errors[0]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Shipping Phone */}
                            <form.Field
                                name="shippingPhone"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="shippingPhone">
                                            মোবাইল নম্বর <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="shippingPhone"
                                            type="tel"
                                            placeholder="01712345678"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            disabled={isSubmitting}
                                            inputMode="numeric"
                                        />
                                        {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                            <p className="text-sm text-red-500">
                                                {field.state.meta.errors[0]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Shipping Address */}
                            <form.Field
                                name="shippingAddress"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="shippingAddress">
                                            সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="shippingAddress"
                                            placeholder="আপনার সম্পূর্ণ ঠিকানা বিস্তারিত লিখুন (বাড়ি নং, রোড নং, এলাকা, থানা, জেলা)"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            disabled={isSubmitting}
                                            rows={5}
                                            className="resize-none"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            {field.state.value.length}/500 অক্ষর (কমপক্ষে ১০০ অক্ষর)
                                        </p>
                                        {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                            <p className="text-sm text-red-500">
                                                {field.state.meta.errors[0]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Submit Button */}
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={!canSubmit || isSubmitting}
                                    >
                                        {isSubmitting ? "অর্ডার প্রসেস হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
                                    </Button>
                                )}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>অর্ডার সামারি</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">আইটেম সংখ্যা</span>
                            <span className="font-medium">{itemCount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">সাবটোটাল</span>
                            <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                            <span className="font-medium text-green-600">ফ্রি</span>
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>মোট</span>
                                <span>৳{subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method Info */}
                        <div className="rounded-lg border bg-muted/50 p-4">
                            <h4 className="font-semibold mb-2">পেমেন্ট মেথড</h4>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    ₹
                                </div>
                                <div>
                                    <p className="font-medium">ক্যাশ অন ডেলিভারি</p>
                                    <p className="text-xs text-muted-foreground">
                                        পণ্য হাতে পেয়ে টাকা দিন
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}