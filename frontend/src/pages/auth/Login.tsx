import React, { useEffect } from "react";
import { LoginProps } from "../../types/Auth.type";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState<LoginProps>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    login(form).then(() => {
      navigate('/dashboard')
    }).catch(err => {
      console.log(err);
      setError("Wrong email or password")
    })
    .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
    }
    
    if (location.state && location.state.tokenExpired) {
      setError("Sesi anda telah habis, harap login kembali!");
      window.history.replaceState(null, "");
    }
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login - LapasPanic</title>
      </Helmet>
      <div className="h-[100vh] gap-8 flex">
        <div className="fixed top-[50%] left-[50%] -z-10 opacity-50 translate-x-[-50%] translate-y-[-50%]">
          <img
            src="/assets/lapas-logo.png"
            className="brightness-50"
          />
        </div>
        <div className="w-[600px] h-[340px] mx-auto p-4 self-center bg-white bg-opacity-75 shadow-md rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full gap-4 mt-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email<span className="text-red-500">*</span></label>
              <TextField
                required
                id="email"
                type="email"
                variant="outlined"
                size="medium"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password<span className="text-red-500">*</span></label>
              <TextField
                required
                id="password"
                type="password"
                variant="outlined"
                size="medium"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              endIcon={<LoginIcon />}
              disabled={isLoading}
            >
              Login
            </Button>
            {error && (
              <div className="text-center text-red-600 font-bold text-lg">{error}</div>
            )}
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Login;
