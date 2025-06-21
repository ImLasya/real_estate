// import React from 'react'
// import {Avatar, Menu} from '@mantine/core'
// import { useNavigate } from 'react-router-dom'
// import '@mantine/core/styles.css';
// const ProfileMenu = ({user, logout}) => {
//     const navigate = useNavigate()
//   return (
//     <Menu>
//         <Menu.Target>
//             <Avatar src={user?.picture} alt='user image' radius={"xl"}/>
//         </Menu.Target>
//         <Menu.Dropdown>
//             <Menu.Item onClick={()=>{
//                 navigate("/favourites",{replace:true})
//             }}>
//                 Favourites
//             </Menu.Item>

//             <Menu.Item onClick={()=>
//                 navigate("/bookings",{replace:true})
//             }>
                
//                 Bookings
//             </Menu.Item>

//             <Menu.Item onClick={()=>{
//                 localStorage.clear();
//                 logout()
//             }}>
//                 Logout
//             </Menu.Item>
//         </Menu.Dropdown>
//     </Menu>
//   )
// }

// export default ProfileMenu

import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt='user image' radius="xl" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} to="/favourites">
          Favourites
        </Menu.Item>

        <Menu.Item component={Link} to="/bookings">
          Bookings
        </Menu.Item>

        <Menu.Item
          component="button"
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
