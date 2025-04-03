
export interface Job {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  description?: string;
  url?: string;
  postDate?: string;
  dataQuality: number; // 0-100 score indicating completeness
}
