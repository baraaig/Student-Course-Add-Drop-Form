
export interface Course {
  id: number;
  code: string;
  name: string;
  crn: string;
  section: string;
}

export interface Advisor {
  id: string;
  name: string;
}

export type Status = 'idle' | 'submitting' | 'success' | 'error';