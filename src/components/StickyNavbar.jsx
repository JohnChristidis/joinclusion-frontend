import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import {Link} from 'react-router-dom';
import { Help } from '/src/pages/Help.jsx'
import { About } from '/src/pages/About.jsx'
import {YourModList} from '/src/pages/YourModList.jsx';
import {YourMod} from '/src/pages/YourMod.jsx';
import {Login } from '/src/pages/Login.jsx'
import {NewMod} from '/src/pages/NewMod.jsx'
import { Route, Routes } from 'react-router-dom'

export function StickyNavbar({logedIn, handleLogedIn, hanldeId, id}) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("logedIn");
      localStorage.removeItem("userId");

      handleLogedIn(false);
      hanldeId(null);

    //  history.push("/login"); // Redirect to another page (e.g., "/login")
    };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-semibold"
      >
        <Link to="/newmod" className="flex items-center">
          Create
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h4"
        color="white"
        className="p-1 font-semibold"
      >
        <Link to="/help" className="flex items-center">
          Help
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="fixed  inset-0 p-6 h-screen w-screen overflow-scroll">

      <Navbar
        variant = "gradient"
        color = "blue-gray"
        className=" rounded-none fixed bg-from-blue-gray-900 to-blue-gray-800 top-0 left-0 right-0 z-10 h-max max-w-full">

<div className="flex items-center justify-between text-white">
            <a href="/" className="mr-4 cursor-pointer">
            <img
              src="assets/logo/joinclusion.png"
              alt="Joinclusion Logo"
              className="h-20 w-auto py-1.5 font-medium"
            />
          </a>
          <div className="flex items-center gap-4">
            <div className="mr-2 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="md"
              className="hidden lg:inline-block"
              onClick = {handleLogout}
            >
              <h4 className="text-lg font-semibold">{logedIn ? "Logout" : "Login"}</h4>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <h4 className="text-lg font-semibold">{logedIn ? "Logout" : "Login"}</h4>
          </Button>
        </Collapse>
      </Navbar>
       <div className="mx-auto max-w-screen-md py-20">
      <Routes>
        <Route
          path="/"
          element={logedIn ?
            <YourModList logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/> :
              <Login logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/>
            }
        />
        <Route
          path="/newmod"
          element={logedIn ?
            <NewMod logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/> :
              <Login logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/>
            }
        />
        <Route
          path="/help"
          element={logedIn ?
            <Help logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/> :
              <Login logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/>
            }
        />
      <Route path="/yourmod/:modId" element={logedIn ?
           <YourMod logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/> :
             <Login logedIn={logedIn} handleLogedIn={handleLogedIn} hanldeId={hanldeId} id={id}/>
           }
         />
      </Routes>
    </div>
  </div>
  );
}
