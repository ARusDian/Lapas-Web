// import { TextField } from "@mui/material";
// import React, { useEffect } from "react";
// import { UserModel } from "../../../types/Auth.type";
// import { api } from "../../../lib/api";

// interface Props {
//   user: UserModel | null;
// }

// const UserShowForm = ({ user }: Props) => {
//   // useEffect(() => {
//   //   api.get(`/roles/${user?.roleId}`);
//   // }, []);

//   return (
//     <>
//       <div className="flex flex-col w-full gap-1 mb-4">
//         <label htmlFor="uid">UID</label>
//         <TextField
//           type="text"
//           variant="outlined"
//           size="small"
//           inputProps={{ readOnly: true }}
//           value={user?.uid}
//         />
//       </div>
//       <div className="flex flex-row gap-4 mb-4">
//         <div className="flex flex-col w-full gap-1">
//           <label htmlFor="nama">Nama</label>
//           <TextField
//             type="text"
//             variant="outlined"
//             size="small"
//             inputProps={{ readOnly: true }}
//             value={user?.name}
//           />
//         </div>
//         <div className="flex flex-col w-full gap-1">
//           <label htmlFor="email">Email</label>
//           <TextField
//             type="email"
//             variant="outlined"
//             size="small"
//             inputProps={{ readOnly: true }}
//             value={user?.email}
//           />
//         </div>
//       </div>
//       <div className="flex flex-row gap-4 mb-4">
//         <div className="flex flex-col w-full gap-1">
//           <label htmlFor="NIP">NIP</label>
//           <TextField
//             type="text"
//             variant="outlined"
//             size="small"
//             inputProps={{ readOnly: true }}
//             value={user?.NIP}
//           />
//         </div>
//         <div className="flex flex-col w-full gap-1">
//           <label>Gender</label>
//           <TextField
//             type="text"
//             variant="outlined"
//             size="small"
//             inputProps={{ readOnly: true }}
//             value={user?.gender}
//           />
//         </div>
//       </div>
//       <div className="flex flex-row gap-4 mb-4">
//         <div className="flex flex-col w-full gap-1">
//           <label htmlFor="NIP">Jabatan</label>
//           <TextField
//             type="text"
//             variant="outlined"
//             size="small"
//             inputProps={{ readOnly: true }}
//             value={user?.jabatan}
//           />
//         </div>
//         <div className="flex flex-col w-full gap-1">
//           <label>Role</label>
//           <TextField
//             type="text"
//             variant="outlined"
//             size="small"
//             inputProps={{ readOnly: true }}
//             value={user?.roleId}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserShowForm;
