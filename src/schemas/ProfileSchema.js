import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less")
    .regex(/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u, "Name contains invalid characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less")
    .regex(/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u, "Name contains invalid characters"),
});
