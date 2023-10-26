interface LoginProps {
  email: string,
  password: string
};

interface RegisterProps {
  name: string,
  roles: string[],
  email: string,
  password: string,
  confirm_password: string
};

export type { LoginProps, RegisterProps };