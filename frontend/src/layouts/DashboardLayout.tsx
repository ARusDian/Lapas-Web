import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import { Button, Collapse, Divider } from '@mui/material';
import SidebarLinkButton from '../components/SidebarLinkButton';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const DashboardLayout = () => {
  const [openCollapse, setOpenCollapse] = React.useState<boolean>(true);

  return (
    <div>
      <div className="fixed left-0 top-0 w-60 z-10 bg-primary-main h-[100vh] text-primary-contrast px-2">
        <h1 className='text-2xl text-start pl-2 py-4'>LapasPanic</h1>
        <Divider />
        <div className="flex flex-col mt-2">
          <div className="flex flex-col items-start gap-4 px-2 py-3 transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer" onClick={() => setOpenCollapse(prev => !prev)}>
            <div className="relative flex items-center gap-4 w-full">
              <PersonIcon />
              <p className='font-semibold'>Users</p>
              <div className="absolute right-0">
                {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
            </div>
          </div>
          <Collapse in={openCollapse} unmountOnExit className='pl-4'>
            <SidebarLinkButton linkTo='/dashboard' startIcon={<VisibilityIcon/>} text='Daftar Pengguna' className='text-sm'/>
            <SidebarLinkButton linkTo='/dashboard' startIcon={<AddIcon/>} text='Tambah Pengguna' className='text-sm'/>
          </Collapse>
          <SidebarLinkButton linkTo='/dashboard' startIcon={<ArticleIcon />} text='Logs' />
          <SidebarLinkButton linkTo='/dashboard' startIcon={<PersonIcon />} text='Users' />
        </div>
      </div>
      <div className="fixed top-0 h-16 bg-primary-main w-full flex justify-end items-center text-primary-contrast px-4">
        <Link to={'/'}>
          <Button variant='text' sx={{ color: "white" }} endIcon={<LogoutIcon />} >Logout</Button>
        </Link>
      </div>
      <div className="ml-60 mt-16">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout