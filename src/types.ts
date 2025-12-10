export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  skills: string; // Manter como string separada por vírgulas é melhor para edição rápida
  experience: Experience[];
  education: Education[];
}

export const initialResumeState: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  summary: '',
  skills: '',
  experience: [],
  education: [],
};
