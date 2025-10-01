"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { FileInput } from "@/components/file-input";
import { useCreateDonationMutation } from "@/lib/apis/donations";
import { toast } from "sonner";
// import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).nullable(),
  link: z.string().url("Invalid URL").min(1, "Link is required"),
});
type FormSchemaType = z.infer<typeof formSchema>;
export default function AddDonation({ pre_loader }: { pre_loader: boolean }) {
  const [createDonation, { isLoading }] = useCreateDonationMutation();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
      link: "",
    },
  });
  const t = useTranslations("donations");
  const onSubmit = async (data: FormSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("link", data.link);
    if (data.image) {
      formData.append("image", data.image);
    }
    await createDonation(formData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        form.reset();
      });
  };
  if (pre_loader) {
    return <Skeleton className="!h-9 w-[125px]" />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!h-9">{t("add_donation")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_donation_title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("link")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("image")}</FormLabel>

                  <FormControl className="w-full !h-[150px]">
                    <FileInput
                      value={field.value}
                      onChange={field.onChange}
                      className="!h-[150px] !w-full !object-contain border-solid border-border"
                      image_class="!h-[140px] !w-full rounded-lg !object-contain"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose onClick={() => form.reset()}>
                {t("close")}
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
