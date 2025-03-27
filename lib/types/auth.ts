export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  sshKey: string;
}

export interface LoginData {
  username: string;
  password: string;
}
