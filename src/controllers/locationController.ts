import { Request, Response } from "express";
import { locationSchema } from "../validators/locationsValidator";

interface LocationRequestBody {
  address: string;
  latitude: number;
  longitude: number;
}

const savedLocations: LocationRequestBody[] = [];

export const searchLocation = (req: Request, res: Response) => {
  const parsed = locationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { address, latitude, longitude } = parsed.data;

  const newLocation = { address, latitude, longitude };

  savedLocations.push(newLocation);

  return res.status(201).json(newLocation);
};
