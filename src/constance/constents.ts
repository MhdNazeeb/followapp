export type JobDescription = {
  key: string;
  value?:string
};

export const jobDescriptions: JobDescription[] = [
  { key: 'companyName' },
  { key: 'location' },
  { key: 'offeredSalary' },
  { key: 'expirationDate' },
  { key: 'experience' },
  { key: 'websiteLink' },
  { key: 'jobType' },
  { key: 'jobDescription' },
  { key: 'email' }


]

export default jobDescriptions;

export const whatsppMessage:string = `Hi, I am interested in the job you posted on Qatar Follow. Can you please provide more details?`;
