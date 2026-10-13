import { settings } from './content';

const c = settings.contact ?? {};
export const phone: string = c.phone ?? '';
export const email: string = c.email ?? '';
export const whatsappNumber: string = String(c.whatsapp ?? '').replace(/\D/g, '');

export const telLink = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '';
export const mailLink = email ? `mailto:${email}` : '';
export const whatsappLink = (text = '') =>
  whatsappNumber ? `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '';
