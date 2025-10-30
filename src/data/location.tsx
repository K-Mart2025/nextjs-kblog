import { Bus, Car } from "lucide-react";

export const hours = [
  { day: "Lunes - Sábado", time: "9:00 - 19:00" },
  { day: "Domingo", time: "Cerrado" },
];

export const transportOptions = [
  {
    icon: <Bus className="w-6 h-6" />,
    title: "Autobús",
    description: 'Parada "Calixto García"',
  },

  {
    icon: <Car className="w-6 h-6" />,
    title: "Aparcamiento",
    description: "Parking gratuito disponible para clientes",
  },
];
