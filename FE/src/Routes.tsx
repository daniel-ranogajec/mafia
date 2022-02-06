import { useEffect } from "react";

import { Route, Routes as Switch, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Mainpage } from "./pages/Mainpage";
import { useAuth } from "./provider/AuthProvider";
import { NotFound } from "./components/NotFound";


export const Routes = () => {
	const { userInfo } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
	  if (!userInfo) {
		navigate("/login");
	}
	}, [navigate, userInfo]);
  
  return <div>
	  <Switch>
		<Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
		<Route path="/notfound" element={<NotFound />} />
    </Switch>
  </div>;
};
