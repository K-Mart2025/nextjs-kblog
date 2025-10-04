import { Instagram } from "lucide-react";
import Image from "next/image";

  export const socialLinks = [
    /* { icon: <Facebook size={20} />, href: '#', label: 'Facebook' }, */
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/k_marthavana/', label: 'Instagram' },
    { icon: <Image alt="WhatsApp" width={100} height={100} src='./assets/whatsapp-white-icon.svg' className='p-2.5'/>, href: 'https://whatsapp.com/channel/0029Vb0INLb5Ejxue4p7BS1q', label: 'WhatsApp' },
    /* { icon: <Twitter size={20} />, href: '#', label: 'Twitter' } */
  ];

  export const quickLinks = [
    { label: 'Conócenos', href: '#about' },
    { label: 'Productos', href: '#shop' },
    { label: 'Blog', href: '#blog' },
    { label: 'Ubicación', href: '#location' },
    { label: 'Contacto', href: '#contact' },
    { label: 'Noticias', href: '#news' }
  ];

  export const categories = [
    'Snacks Coreanos',
    'Bebidas Tradicionales',
    'Salsas y Condimentos',
    'Fideos y Ramen',
    'Productos Congelados',
    'K-Beauty',
    'Utensilios de Cocina',
    'Productos Frescos'
  ];