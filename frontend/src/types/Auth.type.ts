interface LoginProps {
  email: string,
  password: string
};

interface RegisterProps {
  name: string,
  NIP?: string,
  gender: "L" | "P",
  jabatan: string,
  roleId: number,
  email: string,
  password: string,
  confirm_password?: string
  approved: boolean
};

interface BaseUserModel {
  name: string,
  email: string,
}

interface UserModel extends BaseUserModel{
  id: number,
  
  //Firebase Auth
  uid: string,
  disabled: boolean,

  //User Data
  NIP: string,
  gender: "L" | "P",
  jabatan: string,
  approved: boolean,
  roleId?: number
}

interface Role {
  id: number,
  name: string,
  created_at?: string,
  updated_at?: string
}

export type { LoginProps, RegisterProps, BaseUserModel, UserModel, Role };