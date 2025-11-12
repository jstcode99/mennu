import * as z from "zod";

export const passwordSchema = z
    .string()
    .min(8, { message: '' })
    .max(20, { message: '' })
    .refine((password) => /[A-Z]/.test(password), {
        message: 'Debe contener una letra mayuscula',
    })
    .refine((password) => /[a-z]/.test(password), {
        message: 'Debe contener una letra minuscula',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Debe contener un numero' })
    .refine((password) => /[!@#$%^&*.-_]/.test(password), {
        message: 'Debe tener al menos un caracter especial !@#$%^&*-._',
    });