// interface nie - bo swagger wymaga klas do adnotacji
export interface UserModel {
  id: number;
  name: string;
  password: string;
  email: string;
  roles?: string[];
  data?: any;
}
