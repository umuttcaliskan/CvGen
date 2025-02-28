import { firebase } from '../../firebase.config';

export interface CVData {
  id: string;
  userId: string;
  personal?: {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    gender?: string;
    maritalStatus?: string;
    drivingLicense?: string;
    militaryStatus?: string;
  };
  about?: string;
  education?: Array<{
    id: string;
    schoolName: string;
    department: string;
    startDate: string;
    endDate: string;
  }>;
  experience?: Array<{
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills?: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  languages?: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  references?: Array<{
    id: string;
    fullName: string;
    company: string;
    position: string;
    phone: string;
    email: string;
  }>;
  socialMedia?: Array<{
    platform: string;
    username: string;
    url?: string;
  }>;
  projects?: Array<{
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies?: string;
    projectUrl?: string;
  }>;
  certificates?: Array<{
    name: string;
    institution: string;
    date: string;
  }>;
  createdAt: firebase.firestore.Timestamp;
} 