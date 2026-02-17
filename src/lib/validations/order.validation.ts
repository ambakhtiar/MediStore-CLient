import { z } from "zod";

/**
 * Checkout Form Validation Schema
 *
 * Requirements:
 * - shippingName: required, minimum 2 characters, maximum 100 characters
 * - shippingPhone: required, must match Bangladeshi mobile format (01XXXXXXXXX, total 11 digits)
 * - shippingAddress: required, minimum 100 characters, maximum 500 characters
 */
export const checkoutFormSchema = z.object({
    // Customer's full name
    shippingName: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
        .trim()
        .refine((val) => val.length > 0, "Name is required"),

    // Bangladeshi phone number validation (starts with 01, second digit 3–9, total 11 digits)
    shippingPhone: z
        .string()
        .trim()
        .refine(
            (val) => /^01[3-9]\d{8}$/.test(val),
            "Enter a valid Bangladeshi mobile number (e.g., 01712345678)"
        ),

    // Detailed shipping address, must be long enough
    shippingAddress: z
        .string()
        .min(100, "Address must be at least 100 characters (write in detail)")
        .max(500, "Address cannot exceed 500 characters")
        .trim()
        .refine((val) => val.length >= 100, "Please provide a more detailed address"),
});

// Infer TypeScript type from Zod schema
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;