

  export interface JobData  {
    jobTitle: string;
    companyName: string;
    jobType: string;
    jobDescription: string;
    email: string;
    websiteLink: string;
    experience: string;
    expirationDate: Date;
    image: any;
    _id:string
    createdAt:string|null|Date
    jobsStatus?: boolean;
    location?:string
    saved?:boolean
};

