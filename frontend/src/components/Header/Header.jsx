import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import useAuthCheck from "../../hooks/useAuthCheck";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";



const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const {loginWithRedirect,isAuthenticated,user,logout} = useAuth0();
  const [modalOpened,setModalOpened]=useState(false);
  const {validateLogin} =useAuthCheck();
  const handleButtonClick=()=>{
    if(validateLogin()){
      setModalOpened(true);
    }
  }
  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
        <img src="./logo.png" alt="logo" width={100} />
        </Link>
        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>
            
            <a href="mailto:n210494@rguktn.ac.in">Contact</a>

            <div onClick={handleButtonClick}>Add Property</div>

            <AddPropertyModal
            opened={modalOpened}
            setOpened={setModalOpened}
            />

            {!isAuthenticated?
            <button className="button" onClick={loginWithRedirect}>Login</button>
            :<ProfileMenu user={user} logout={logout}/>
            }
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
