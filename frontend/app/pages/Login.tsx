import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "app/components/ui/tabs";
import { useNavigate } from "react-router";
import Container from "~/components/ui/container";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "~/services/auth";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<"Student" | "Teacher" | "Staff">("Student");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await signIn(values.email, values.password);
      console.log("Logged in:", user);
    } catch (error) {
      console.error(error);
    }

    // NOTIFY TO CONFIRM THE EMAIL VERIFICATION
    navigate("/dashboard");
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Container className="pt-10">
      <section className="space-y-12">
        <section className="text-center space-y-2">
          <h1 className="text-2xl font-medium">Welcome to SMS!</h1>
          <p className="text-gray-500">Sign in to access your portal!</p>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Tabs
            defaultValue="Student"
            onValueChange={(val) => setRole(val as any)}
          >
            <TabsList className="w-full">
              <TabsTrigger value="Student">Student</TabsTrigger>
              <TabsTrigger
                value="Teacher"
                className={`${role === "Teacher" && "text-green-600"}`}
              >
                Teacher
              </TabsTrigger>
              <TabsTrigger
                value="Staff"
                className={`${role === "Staff" && "text-blue-500"}`}
              >
                Staff
              </TabsTrigger>
            </TabsList>

            <TabsContent value={role}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="lg:col-start-4 space-y-8 mt-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex gap-x-1">
                            <Input
                              type={!showPassword ? "password" : "text"}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleShowPassword}
                            >
                              {!showPassword ? <Eye /> : <EyeOff />}
                            </Button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className={`w-full text-sm ${role === "Teacher" ? "bg-green-600" : role === "Staff" ? "bg-blue-500" : ""}`}
                  >
                    Log in as {role}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Forgot your password?
                  </p>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Container>
  );
}
