"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/lib/roles";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, EyeOff, LockKeyhole, Mail, UserIcon } from "lucide-react";
import { userTypeToString } from "@/components/data-table/reuseable";
import { useCreateEmployeeMutation } from "@/lib/apis/user";
import { toast } from "sonner";

const FormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  phone_number: z.string().min(10).max(15),
  password: z.string().min(8).max(50),
  user_type: z.string(),
});
type FormSchemaType = z.infer<typeof FormSchema>;
function AddEmployee({ pre_loader }: { pre_loader: boolean }) {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const t = useTranslations("employees");
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone_number: "",
      password: "",
      user_type: UserType.CALL_SERVICE,
    },
  });
  const onSubmit = (data: FormSchemaType) => {
    createEmployee(data)
      .unwrap()
      .then((res) => {
        form.reset();
        toast.success(res.message);
      })
      .catch((error) => {
        error.data.errors?.forEach(
          (error: { field: string; message: string[] }) => {
            toast.error(error.message[0]);
          }
        );
      });
  };
  return pre_loader ? (
    <Skeleton className="!h-9 w-[125px]" />
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!h-9">{t("add_employee")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_employee_title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>
                  <FormControl>
                    <Input left_icon={<UserIcon />} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input left_icon={<Mail />} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone_number")}</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
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
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      left_icon={<LockKeyhole />}
                      right_icon={
                        showPassword ? (
                          <Eye
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user_type")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserType)
                          .filter(
                            (type) =>
                              type !== UserType.SUPER_ADMIN &&
                              type !== UserType.PERFORMER
                          )
                          .map((type) => {
                            const userTypeKey = userTypeToString(type);
                            return (
                              <SelectItem key={type} value={type}>
                                {t(`roles.${userTypeKey}`)}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose onClick={() => form.reset()}>
                {t("close")}
              </DialogClose>
              <Button
                className="!h-9 !w-30"
                disabled={isLoading}
                is_loading={isLoading}
              >
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEmployee;
