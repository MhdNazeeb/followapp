import { Share, Linking } from 'react-native';
import { Haptics } from '../utils/Haptics';

export const shareJob = async (job:any) => {
  if (!job) return;
  const message = `
${job.jobTitle}
Company: ${job.companyName}
Location: ${job.location}
Apply at: ${job.websiteLink || job.email || job.phone}
  `.trim();

  await Share.share({ message });
  Haptics.success();
};

export const applyViaWhatsApp = (job:any) => {
  if (job?.whatsappNumber) {
    Linking.openURL(`whatsapp://send?phone=${job.whatsappNumber}&text=Applying for ${job.jobTitle}`);
    Haptics.success();
  }
};

export const applyViaEmail = (job:any) => {
  if (job?.email) {
    Linking.openURL(`mailto:${job.email}?subject=Application for ${job.jobTitle}`);
    Haptics.success();
  }
};
