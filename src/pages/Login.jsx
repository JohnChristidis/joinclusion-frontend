import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { config } from "../utils/config";



export function Login({handleLogedIn, hanldeId, logedIn}) {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  const handleLogin = async () => {
      try {
        const response = await axios.post(`${config.backendUrl}/login`, {
          username,
          pwd,
        });

        if (response.status === 200) {
          localStorage.setItem("logedIn", "true");
          localStorage.setItem("userId", response.data.teacher.id);

          handleLogedIn(true);
          hanldeId(response.data.teacher.id);

          // Handle successful login
          //history.push("/youmodlist"); // Redirect to another page (e.g., "/dashboard")
        }
      } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("Bad request: " + error.response.data.error);
        } else if (error.response.status === 401) {
          setError("Unauthorized: " + error.response.data.error);
        } else if (error.response.status === 500) {
          setError("Internal server error: " + error.response.data.error);
        } else {
          setError("Error with status code: " + error.response.status);
        }
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("Request error: " + error.message);
      }
    }
  };




    return (
     <div className="flex items-start justify-center min-h-screen p-6">
       <div className="w-full max-w-screen-lg sm:w-96 p-4 border-b-4 border-l-2 border-r-2">
         <Card color="transparent" shadow={false}>
           <Typography variant="h2" color="blue-gray">
             {logedIn ? "Logout" : "Login"}
           </Typography>
           <Typography color="gray" className="mt-1 font-normal">
             {logedIn ? `Logged in as User ${userId}` : "Enter your username and password."}
           </Typography>

           <form className="mt-8 mb-2">
             <div className="mb-4 flex flex-col gap-6">
               <Input
                 size="lg"
                 label="Username"
                 value={username}
                 onChange={handleUsernameChange}
               />
               <Input
                 type="password"
                 size="lg"
                 label="Password"
                 value={pwd}
                 onChange={handlePwdChange}
               />
             </div>

             <Button className="mt-6" fullWidth onClick={handleLogin}>
               Login
             </Button>
             {error && <p className="text-red-500 mt-2">{error}</p>}
           </form>
         </Card>
       </div>
     </div>
   );
 }
