export interface Todo {
  id: string;
  title: string;
  description?: string;
  deadlineDate?: Date;
  isDone: boolean;
}
