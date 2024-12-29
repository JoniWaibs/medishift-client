import { ContactInfo } from '@/models';

export const handleOpenWhatsapp = (contactInfo: ContactInfo) => {
  const phoneNumber = `${contactInfo?.phone.countryCode}${contactInfo?.phone.area}${contactInfo?.phone.number}`;
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
};
