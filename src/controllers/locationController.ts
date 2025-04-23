import { Request, Response } from "express";

interface LocationRequestBody {
  address: string;
  latitude: number;
  longitude: number;
}

const savedLocations: LocationRequestBody[] = []; //temporário até BD

export const searchLocation = (req: Request, res: Response) => {
  const { address, latitude, longitude } = req.body;

  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: "Endereço inválido." });
  }
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: "Latitude e longitude devem ser números." });
  }

  const newLocation = { address, latitude, longitude };

  savedLocations.push(newLocation); //temporário até BD


  return res.status(201).json(newLocation);
};
