import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FC, useState, ComponentProps } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed } from "lucide-react"
import { signUp } from "@/services/auth.service"
import { toast } from "sonner"
import { SignUpSchema } from "@/domain/schemas/sign-up.schema"

export const SignUpForm: FC<ComponentProps<"div">> = ({
    className,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(SignUpSchema),
    })

    const onSubmit = async (payload: {
        email: string;
        password: string;
        name: string;
    }) => {
        const response = await signUp(payload);

        if (response.status !== 201) {
            toast("Sign up has throw error ", {
                description: `Error ${response.status}: ${response.statusText}`,
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
        }
        if (response.status === 201) {
            toast("Sign up", {
                description: `Sign up successfully`,
            })
            navigate('/sign-in');
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Sign up with your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="joe"
                                    required
                                    {...register("name")}
                                />
                                {errors.name?.type === "required" && (
                                    <p role="alert">Mame is required</p>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                                {errors.email?.type === "required" && (
                                    <p role="alert">Email is required</p>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel
                                        htmlFor="password"
                                    >Password</FieldLabel>
                                    <Link
                                        to="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="flex ">
                                    <Input type={showPassword ? "text" : "password"} {...register("password")} />
                                    <button
                                        type="button"
                                        className=""
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeClosed /> : <Eye />}
                                    </button>
                                </div>
                                {errors.password?.type === "required" && (
                                    <p role="alert">Password is required</p>
                                )}
                            </Field>
                            <Field>
                                <Button type="submit" disabled={!isValid}>Sign up</Button>
                                <FieldDescription className="text-center">
                                    have you an account? <Link to='/sign-in'>Sign In</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <Link to='#'>Terms of Service</Link>{" "}
                and <Link to='#'>Privacy Policy</Link>.
            </FieldDescription>
        </div>
    );
}
