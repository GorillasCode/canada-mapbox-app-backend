import { z } from "zod";

export const locationSchema = z.object({
  address: z.string().min(1, "Address must not be empty"),
  latitude: z.number({
    required_error: "Latitude must be a number",
    invalid_type_error: "Latitude must be a number",
  }),
  longitude: z.number({
    required_error: "Longitude must be a number",
    invalid_type_error: "Longitude must be a number",
  }),
});

