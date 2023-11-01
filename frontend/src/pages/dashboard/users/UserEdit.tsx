import React from "react";
import { useParams } from "react-router-dom";

const UserEdit = () => {
  const { userId } = useParams();

  return <div>UserEdit {userId}</div>;
};

export default UserEdit;
