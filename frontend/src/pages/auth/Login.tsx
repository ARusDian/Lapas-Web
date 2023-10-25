import React from 'react';
import { LoginProps } from '../../types/Auth.type';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [form, setForm] = React.useState<LoginProps>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(form);
  }

  return (
    <div className='flex flex-col justify-center h-[100vh]'>
      <div className="w-1/3 h-96 mx-auto bg-white drop-shadow-lg border rounded-2xl p-4">
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4 h-full'>
          <h1 className='text-3xl font-bold text-center'>LapasPanic</h1>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <TextField type="email" name="email" id="email" value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="password">Password</label>
            <TextField type="password" name="password" id="password" value={form.password} onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} />
          </div>
          <Button type='submit' variant='contained' size='large' endIcon={<LoginIcon />}>Login</Button>
        </form>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fixed -bottom-16 left-0 -z-10'><path fill="#0099ff" fillOpacity="1" d="M0,128L34.3,138.7C68.6,149,137,171,206,181.3C274.3,192,343,192,411,208C480,224,549,256,617,240C685.7,224,754,160,823,160C891.4,160,960,224,1029,250.7C1097.1,277,1166,267,1234,256C1302.9,245,1371,235,1406,229.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    </div>
  )
}

export default Login;