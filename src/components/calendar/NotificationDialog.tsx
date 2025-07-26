import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { TimePicker } from "../ui/time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RECEIVER_TYPES = [
  { value: "performers", label: "Performers" },
  { value: "seekers", label: "Seekers" },
  { value: "employees", label: "Employees" },
] as const;

const notificationFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
  receiver: z.enum(["performers", "seekers", "employees"], {
    required_error: "Please select a receiver type",
  }),
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
    title: string;
    message: string;
    receiver: "performers" | "seekers" | "employees";
    scheduledAt: Date;
  }) => void;
}

export function NotificationDialog({
  open,
  onOpenChange,
  selectedDate,
  onSubmit,
}: NotificationDialogProps) {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title: "",
      message: "",
      receiver: undefined,
      scheduledAt: new Date(),
    },
  });

  const handleSubmit = (data: NotificationFormValues) => {
    console.log(data);
    if (onSubmit) {
      // Combine the selected date with the time from the time picker
      const notificationDate = new Date(selectedDate);
      const time = data.scheduledAt;
      notificationDate.setHours(time.getHours(), time.getMinutes(), 0, 0);

      onSubmit({
        title: data.title,
        message: data.message,
        receiver: data.receiver,
        scheduledAt: notificationDate,
      });
      onOpenChange(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <span>Schedule Reminder</span>
          </DialogTitle>
          <DialogDescription className="pt-1">
            Set a reminder for{" "}
            <span className="font-medium text-foreground">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-4">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter notification title"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your notification message"
                        className="min-h-[100px] text-sm"
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

              {/* Receiver Selection */}
              <FormField
                control={form.control}
                name="receiver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Send To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select receiver type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RECEIVER_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Scheduled Time */}
              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Scheduled Time
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <TimePicker
                            date={field.value}
                            setDate={field.onChange}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-10 whitespace-nowrap"
                          onClick={() => {
                            const now = new Date();
                            now.setMinutes(now.getMinutes() + 5);
                            field.onChange(now);
                          }}
                        >
                          Now + 5min
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={form.formState.isSubmitting}
              >
                <Bell className="mr-2 h-4 w-4" />
                {form.formState.isSubmitting
                  ? "Scheduling..."
                  : "Schedule Notification"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
