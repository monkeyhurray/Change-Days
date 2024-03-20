export type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export interface infiniteTodo {
  id: string;
  title: string;
}
