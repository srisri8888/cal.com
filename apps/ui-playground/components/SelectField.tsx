import { Dayjs } from 'dayjs';

export interface FormData {
  department: string;
  priority: string;
  dueDate: Dayjs | null;
}