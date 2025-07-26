import { useTranslations } from "next-intl";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
export const useLoginValidation = () => {
  const t = useTranslations("validation");
  return z.object({
    phone_number: z.string()
    .refine(isValidPhoneNumber, { message: t("phone") }),
    // email: z.string().email(t("email")),
    password: z.string().min(8, t("minLength", { min: 8 })),
  });
};
export type LoginInputs = z.infer<ReturnType<typeof useLoginValidation>>;
