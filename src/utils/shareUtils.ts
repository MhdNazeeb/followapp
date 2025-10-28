export const createShareMessage = (job: any): string => {
    return `
  ${job.jobTitle}
  Company: ${job.companyName || 'N/A'}
  Location: ${job.location || 'N/A'}
  Apply at: ${job.websiteLink || job.email || job.phone || 'N/A'}
  ${job.jobDescription?.slice(0, 100)}${job.jobDescription?.length > 100 ? '...' : ''}
    `.trim();
  };