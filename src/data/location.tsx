import { Bus, Train, Car } from "lucide-react";

export const hours = [
  { day: "Lunes - Viernes", time: "9:00 - 21:00" },
  { day: "Sábado", time: "9:00 - 22:00" },
  { day: "Domingo", time: "10:00 - 20:00" },
];

export const transportOptions = [
  {
    icon: <Bus className="w-6 h-6" />,
    title: "Autobús",
    description: 'Líneas 15, 32, 47 - Parada "Mercado Central"',
  },
  {
    icon: <Train className="w-6 h-6" />,
    title: "Metro",
    description: 'Línea 3 - Estación "Plaza Mayor" (5 min caminando)',
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "Aparcamiento",
    description: "Parking gratuito disponible para clientes",
  },
];
