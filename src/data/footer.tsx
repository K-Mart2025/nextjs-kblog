import { Facebook, Instagram, Twitter } from "lucide-react";

  export const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <img src='./assets/whatsapp-white-icon.svg' className='p-2.5'/>, href: '#', label: 'WhatsApp' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' }
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