import * as z from "zod";
import { passwordSchema } from "./commons.schema";

export const SignUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

