import { z } from "zod";

export type BusinessData = z.infer<typeof businessSchema>;

export const businessSchema = z.object({
  name: z.string().min(3, "نام کسب‌وکار باید حداقل ۳ کاراکتر باشد"),

  slug: z
    .string()
    .min(3, "اسلاگ باید حداقل ۳ کاراکتر باشد")
    .regex(
      /^[a-z0-9-]+$/,
      "اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد",
    ),

  business_type: z.string().min(1, "لطفاً نوع کسب‌وکار را انتخاب کنید"),

  address: z.string().min(10, "آدرس وارد شده خیلی کوتاه است"),

  phone_number: z.string().regex(/^09\d{9}$/, "شماره تماس معتبر نیست"),
});
