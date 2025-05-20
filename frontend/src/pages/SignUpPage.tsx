//ignore typescript
// @ts-nocheck
// @ts-ignore

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpSchemaType } from "../../../shared/auth.types";
import { signUpSchema } from "../../../shared/auth.schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function SignUpPage() {

    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: ""
        }
    })

    const onSubmit = async (data: SignUpSchemaType) => {
        console.log(data);
        // Call your sign-up API here
        // await signUp(data);
    };

    return (
        <div className="P-8" >
            <Card className="w-[400px]" >
                <CardHeader>
                    <CardTitle>Join Us Today</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        disable={form.formState.isSubmitting}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        disable={form.formState.isSubmitting}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter your Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        disable={form.formState.isSubmitting}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Create your password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        disable={form.formState.isSubmitting}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Confirm your Password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">Create Account</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
export default SignUpPage;