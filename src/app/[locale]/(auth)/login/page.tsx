"use client";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase/config";
import { LoginInputs, useLoginValidation } from "@/validation/auth-validation";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Languages, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { PhoneInput } from "@/components/ui/phone-input";
import { useGetCurrentUserQuery, useLoginMutation } from "@/lib/apis/auth";
import { toast } from "sonner";
import { UserType } from "@/lib/roles";
import { PushNotificationsContext } from "@/providers/notifications-provider";
import Image from "next/image";
// const labaik_en = "/labaik_en.png";
// const labaik_ar = "/labaik_ar.png";
export default function Page() {
  const [login, { isLoading }] = useLoginMutation();
  const { refetch } = useGetCurrentUserQuery(undefined, { skip: true });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { fcmToken } = useContext(PushNotificationsContext);
  const t = useTranslations("auth.login");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<LoginInputs>({
    resolver: zodResolver(useLoginValidation()),
    criteriaMode: "firstError",
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      phone_number: "",
      password: "",
      // phone_number: "+201000000001",
      // password: "SecurePa$$123!",
    },
  });
  // 201000000001;
  // SecurePa$$123!
  const onSubmit = async (form_data: LoginInputs) => {
    try {
      const { data } = await login({
        ...form_data,
        fcm_token: fcmToken,
      }).unwrap();
      const user_type = data?.user_type;
      let redirect_path = "error/unauthorized";
      if ([UserType.ADMIN, UserType.SUPER_ADMIN].includes(user_type!)) {
        redirect_path = "/dashboard/overview";
      }
      if ([UserType.CALL_SERVICE, UserType.ACCOUNTANT].includes(user_type!)) {
        redirect_path = "/dashboard/umrah-requests/current-requests";
      }
      router.push(redirect_path);
      refetch()
        .unwrap()
        .then(() => router.refresh());
      toast.success(t("success"));
    } catch (err: any) {
      toast.error(err.data?.message);
    }
  };
  function handleLocale(value: string) {
    const locale = value as "en" | "ar";
    router.replace(pathname, { locale });
  }
  return (
    <div className="form relative">
      <Button
        variant={"icon"}
        size={"icon"}
        className="absolute top-4 ltr:right-4 rtl:left-4 rounded-full"
        onClick={(e) => handleLocale(locale === "en" ? "ar" : "en")}
        aria-label="change language"
      >
        <Languages className="size-5 text-white" aria-label="change language" />
      </Button>
      <div className="flex-center mb-5 h-[150px]">
        <Image
          src={locale === "en" ? "/labaik_en.png" : "/labaik_ar.png"}
          alt="Labaik Logo"
          width={320}
          height={250}
          priority
          className="object-cover"
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button is_loading={isLoading} className="w-full" type="submit">
            {t("login")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
