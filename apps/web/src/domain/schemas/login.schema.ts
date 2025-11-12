import * as z from "zod";
import { passwordSchema } from "./commons.schema";

export const LoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

