import { z } from "zod";

export const reviewFormSchema = z.object({
    rating: z
        .number()
        .int("Rating must be integer")
        .min(1, "At least give 1 Star")
        .max(5, "Maximum 5 Stars"),

    // Always string, even if omitted
    comment: z
        .string()
        .max(500, "Comment must be within 500 characters")
    // .optional()
    // .or(z.literal("")),
});