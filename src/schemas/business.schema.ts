import { z } from "zod";

export type BusinessData = z.infer<typeof businessSchema>;

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const businessSchema = z.object({
  name: z.string().min(3, "نام کسب‌وکار باید حداقل ۳ کاراکتر باشد"),

  slug: z
    .string()
    .min(3, "اسلاگ باید حداقل ۳ کاراکتر باشد")
    .transform(slugify)
    .refine((v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v), {
      message: "اسلاگ فقط حروف کوچک انگلیسی، عدد و خط تیره (مثال: my-salon)",
    }),

  business_type: z.enum(["male_salon", "female_salon"], {
    message: "لطفاً نوع کسب‌وکار را انتخاب کنید",
  }),

  address: z.string().min(10, "آدرس وارد شده خیلی کوتاه است"),

  // موبایل
  phone_number: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),

  // تلفن ثابت
  telephone_number: z
    .string()
    .min(8, "تلفن ثابت الزامی است")
    .regex(/^[0-9-]{8,15}$/, "تلفن ثابت معتبر نیست (مثال: 021-12345678)"),
});
