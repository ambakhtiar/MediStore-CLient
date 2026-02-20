"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createReview } from "@/action/review.action";
import { reviewFormSchema } from "@/lib/validations/review.validation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import StarRating from "./StarRating";

interface ReviewFormProps {
    medicineId: string;
    medicineName: string;
    medicineImage?: string | null;
}

export default function ReviewForm({ medicineId, medicineName, medicineImage }: ReviewFormProps) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            rating: 0,
            comment: "",
        },
        validators: {
            onSubmit: reviewFormSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Posting review...");
            try {
                const result = await createReview(medicineId, value); // value inferred as {rating:number, comment:string}
                if (!result.ok) {
                    toast.error(result.error?.message || "Failed to post review", { id: toastId });
                    return;
                }
                toast.success("Review posted successfully!", { id: toastId });
                router.push("/reviews?tab=my-reviews");
                router.refresh();
            } catch (error) {
                console.error("Review submission error:", error);
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>Share your opinion about this product</CardDescription>
            </CardHeader>
            <CardContent>
                {/* product info */}
                <div className="mb-6 flex items-center gap-3 p-4 bg-muted rounded-lg">
                    {medicineImage &&
                        <img src={medicineImage}
                            alt={medicineName}
                            className="h-16 w-16 rounded object-cover" />
                    }
                    <div>
                        <p className="font-semibold">{medicineName}</p>
                        <p className="text-sm text-muted-foreground">You purchased this product</p>
                    </div>
                </div>

                <form
                    id="review-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="rating">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>
                                            Rating <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <div className="py-2">
                                            <StarRating rating={field.state.value} onChange={(r) => field.handleChange(r)} size={32} />
                                        </div>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="comment">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Comment (optional)</FieldLabel>
                                        <Textarea
                                            name={field.name}
                                            id={field.name}
                                            placeholder="Write your experience about the product..."
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            rows={5}
                                            className="resize-none"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">{field.state.value?.length || 0}/500 characters</p>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>

                    <div className="flex gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" form="review-form" className="flex-1">
                            Post Review
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}