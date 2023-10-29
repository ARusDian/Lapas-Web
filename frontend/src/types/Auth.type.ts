import { PushButtonLog } from "./log.type";

interface LoginProps {
  email: string,
  password: string
};

interface RegisterProps {
  name: string,
  NIP?: string,
  gender: "L" | "P",
  jabatan: string,
  roles: string[],
  email: string,
  password: string,
  confirm_password: string
};

interface UserModel {
  id?: number,
  
  //Firebase Auth
  uid: string,
  email: string,
  disabled: boolean,

  //User Data
  name: string,
  NIP?: string,
  gender: "L" | "P",
  jabatan: string,
  approved: boolean,

  roleId?: number,
  roles?: Role[],

  pushButtonLog?: PushButtonLog[],

  created_at?: string,
  updated_at?: string
}

interface Role {
  id: number,
  name: string,
  created_at?: string,
  updated_at?: string
}

export type { LoginProps, RegisterProps, UserModel, Role };