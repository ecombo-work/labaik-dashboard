"use client";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "../../ui/time-picker";

import { useTranslations } from "next-intl";
import { Checkbox } from "../../ui/checkbox";
import { ar, enGB } from "date-fns/locale";
import { useDirLang } from "@/hooks/use-dir-lang";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useCreateNotificationMutation } from "@/lib/apis/notifications";
import { toast } from "sonner";

const RECEIVER_TYPES = [
  { value: "performers", label: "Performers" },
  { value: "seekers", label: "Seekers" },
  { value: "employees", label: "Employees" },
  { value: "all", label: "All" },
] as const;

const notificationFormSchema = z.object({
  title_ar: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  title_en: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  message_ar: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
  message_en: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
  receiver: z.enum(["performers", "seekers", "employees", "all"]),
  scheduledAt: z.date({
    required_error: "Please select a scheduled time",
  }),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onSubmit: (data: {
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    receiver: "performers" | "seekers" | "employees" | "all";
    scheduledAt: Date;
  }) => void;
}

export function NotificationDialog({
  open,
  onOpenChange,
  selectedDate,
  onSubmit,
}: NotificationDialogProps) {
  const [createNotification, { isLoading }] = useCreateNotificationMutation();
  const t = useTranslations("notifications");
  const { lang, dir } = useDirLang();
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title_ar: "",
      title_en: "",
      message_ar: "",
      message_en: "",
      receiver: "performers",
      scheduledAt: new Date(),
    },
  });
  const SendFor = [
    { value: "performers", label: t("form.receiver.types.performers") },
    { value: "seekers", label: t("form.receiver.types.seekers") },
    { value: "employees", label: t("form.receiver.types.employees") },
    { value: "all", label: t("form.receiver.types.all") },
  ] as const;

  const handleSubmit = (data: NotificationFormValues) => {

    if (onSubmit) {
      const notificationDate = new Date(selectedDate);
      const time = data.scheduledAt;
      // notificationDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
      createNotification({
        title_ar: data.title_ar,
        title_en: data.title_en,
        message_ar: data.message_ar,
        message_en: data.message_en,
        receiver: data.receiver,
        scheduled_at: notificationDate.toISOString(),
      })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          onSubmit({
            title_ar: data.title_ar,
            title_en: data.title_en,
            message_ar: data.message_ar,
            message_en: data.message_en,
            receiver: data.receiver,
            scheduledAt: notificationDate,
          });
          onOpenChange(false);
          form.reset();
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <span>{t("dialog.title")}</span>
          </DialogTitle>
          <DialogDescription className="pt-1">
            {t("dialog.description", {
              date: format(selectedDate, "EEEE, MMMM d, yyyy"),
            })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <Tabs defaultValue={lang}>
                <TabsList className="w-full bg-accent">
                  <TabsTrigger value="ar">{t("form.lang.ar")}</TabsTrigger>
                  <TabsTrigger value="en">{t("form.lang.en")}</TabsTrigger>
                </TabsList>
                <TabsContent value="ar">
                  <FormField
                    control={form.control}
                    name="title_ar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">
                          {t("form.title_ar")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message_ar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.message_ar")}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[100px] text-sm resize-none"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between">
                          <FormMessage className="text-xs" />
                          <span className="text-xs text-muted-foreground">
                            {field.value?.length || 0}/500
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="en">
                  <FormField
                    control={form.control}
                    name="title_en"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">
                          {t("form.title_en")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message_en"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.message_en")}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[100px] text-sm resize-none"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between">
                          <FormMessage className="text-xs" />
                          <span className="text-xs text-muted-foreground">
                            {field.value?.length || 0}/500
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
              {/* Receiver Selection */}
              <FormField
                control={form.control}
                name="receiver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {t("form.receiver.label")}
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                {SendFor.map((item) => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name="receiver"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value === item.value}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange(item.value); // ✅ set only one
                              } else {
                                field.onChange(undefined); // allow deselect
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              {/* Scheduled Time */}
              {/* Scheduled Time */}
              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {t("form.scheduledAt.label")}
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2 w-full">
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-full">
                            <TimePicker
                              date={field.value}
                              setDate={(newDate) => {
                                // Prevent selecting past times
                                const now = new Date();
                                if (newDate < now) {
                                  const adjusted = new Date(now);
                                  adjusted.setMinutes(now.getMinutes() + 5);
                                  field.onChange(adjusted);
                                } else {
                                  field.onChange(newDate);
                                }
                              }}
                            />
                          </div>

                          {/* Quick Actions */}
                          <div className="grid grid-cols-2 gap-2 w-full">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 whitespace-nowrap w-full"
                              onClick={() => {
                                const now = new Date();
                                now.setMinutes(now.getMinutes() + 5);
                                field.onChange(now);
                              }}
                            >
                              {t("form.scheduledAt.now_plus_5")}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 whitespace-nowrap w-full"
                              onClick={() => {
                                const later = new Date();
                                later.setMinutes(later.getMinutes() + 30);
                                field.onChange(later);
                              }}
                            >
                              {t("form.scheduledAt.plus_30")}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 whitespace-nowrap w-full"
                              onClick={() => {
                                const later = new Date();
                                later.setHours(later.getHours() + 1);
                                field.onChange(later);
                              }}
                            >
                              {t("form.scheduledAt.plus_1h")}
                            </Button>
                            {/* <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 whitespace-nowrap w-full"
                              onClick={() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(9, 0, 0, 0);
                                field.onChange(tomorrow);
                              }}
                            >
                              {t("form.scheduledAt.tomorrow")}
                            </Button> */}
                          </div>
                        </div>

                        {/* Friendly Preview */}
                        <p className="text-xs text-muted-foreground">
                          {t("form.scheduledAt.preview", {
                            date: format(field.value, "EEEE, MMMM d, yyyy", {
                              locale: dir === "rtl" ? ar : enGB,
                            }),
                            time: format(field.value, "hh:mm a", {
                              locale: dir === "rtl" ? ar : enGB,
                            }),
                          })}
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose onClick={() => form.reset()}>
                {t("close")}
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                is_loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                {/* <Bell className="mr-2 h-4 w-4" /> */}
                {t("schedule")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
