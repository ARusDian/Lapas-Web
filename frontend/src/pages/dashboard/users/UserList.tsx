import React, { useContext, useEffect } from 'react'
import LinkHighlightContext from '../../../contexts/LinkHighlightContext';

const UserList = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);

  useEffect(() => {
    setCurrentPath("users");
    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  return (
    <div>UserList</div>
  )
}

export default UserList