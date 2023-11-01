import { createContext } from "react";
import { BaseUserModel } from "../types/Auth.type";

interface IAuthContext {
  user: BaseUserModel,
}

const AuthContext = createContext<IAuthContext>({
  user: {
    name: "",
    email: "",
  },
});

export default AuthContext;