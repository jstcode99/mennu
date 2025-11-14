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
import { useSessionStore } from "@/app/stores/session.store"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/domain/schemas/login.schema"
import { Eye, EyeClosed } from "lucide-react"
import { signIn } from "@/services/auth.service"
import { toast } from "sonner"

export const SignInForm: FC<ComponentProps<"div">> = ({
    className,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const { setAccessToken, setEmail, clear } = useSessionStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = async (payload) => {
        const response = await signIn(payload);
        if (!response || response.status !== 201) {
            toast("Login has throw error ", {
                description: `Error ${response.status}: ${response.statusText}`
            })
            clear();
        }
        if (response.status === 201) {
            const { access_token, payload } = await response.json();
            setAccessToken(access_token);
            setEmail(payload.username);
            toast("Welcome ", {
                description: `Hi, ${payload.sub}`,
            })
            navigate("/welcome");
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
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
                                <Button type="submit" disabled={!isValid}>Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/sign-up">Sign up</a>
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
