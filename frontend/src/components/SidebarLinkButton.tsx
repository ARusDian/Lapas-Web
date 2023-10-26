import { IconProps } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  linkTo: string;
  startIcon?: React.ReactElement<IconProps>;
  endIcon?: React.ReactElement<IconProps>;
  text: string;
  className?: string;
}

const SidebarLinkButton = ({ linkTo, startIcon, endIcon, text, className }: Props) => {
  return (
    <Link to={linkTo} className={`relative flex items-center gap-4 px-2 py-3 transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 rounded-lg  ${className}`}>
      {startIcon && startIcon}
      <p className='font-semibold'>{text}</p>
      <div className="absolute right-0">
        {endIcon && endIcon}
      </div>
    </Link>
  )
}

export default SidebarLinkButton