"use client";

import { useSearchUsersQuery } from "@/lib/apis/user";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useReassignUmrahMutation } from "@/lib/apis/umrah";
import { toast } from "sonner";

const searchSchema = z.object({
  text: z.string().optional(),
});

// 🔹 Small debounce hook for cleaner code
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function Reassign({ umrah_id }: { umrah_id: number }) {
  const t = useTranslations("umrah_details");
  const [reassignUmrah, { isLoading }] = useReassignUmrahMutation();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { text: "" },
  });

  const query = form.watch("text");
  const debouncedQuery = useDebounce(query, 400);

  const { data, isFetching } = useSearchUsersQuery(debouncedQuery, {
    skip: !debouncedQuery || debouncedQuery.length < 2,
  });

  const users = data?.data || [];

  const handleAssign = async (userId: number) => {
    await reassignUmrah({ umrah_id: umrah_id.toString(), user_id: userId })
    .unwrap()
    .then((res) => {
      console.log(res);
      toast.success(res.message);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.data.message);
    })
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">{t("reassign")}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg ">
        <DialogHeader>
          <DialogTitle>{t("reassign")}</DialogTitle>
          <DialogDescription>{t("reassign_description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="mb-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("search_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="min-h-[10rem] text-center">
          {/* Loading State */}
          {isFetching && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!isFetching && users.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {users.map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between rounded-md border p-2 hover:bg-accent transition"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.profile_image || ""} />
                      <AvatarFallback>
                        {user.username?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.phone_number}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    is_loading={isLoading}
                    onClick={() => handleAssign(user.user_id)}
                  >
                    {t("assign")}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {!isFetching && debouncedQuery && users.length === 0 && (
            <p className="text-sm text-muted-foreground">{t("no_results")}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
