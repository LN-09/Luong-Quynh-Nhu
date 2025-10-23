import { z } from "zod";

export const PriceDataSchema = z.object({
  currency: z.string(),
  date: z.string(),
  price: z.number().or(z.string().transform(Number)),
});

export const PricesResponseSchema = z.array(PriceDataSchema);

export type PriceData = z.infer<typeof PriceDataSchema>;
export type PricesResponse = z.infer<typeof PricesResponseSchema>;
