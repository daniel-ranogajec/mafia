import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
  } from "react";
  import { UserRes } from "../api/user";
  import { useNavigate } from "react-router-dom";
  
  type AuthContextProps = {
	userInfo: UserRes | undefined;
	login: (user: UserRes) => void;
	logout: () => void;
  };
  
  const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
  
  type AuthProviderProps = {
	children: ReactNode;
  };
  
  export default function AuthProvider({ children }: AuthProviderProps) {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<UserRes | undefined>(
	  JSON.parse(window.localStorage.getItem("user") as string)
	);
  
	useEffect(() => {
	  console.log(userInfo);
	  if (userInfo) {
		window.localStorage.setItem("user", JSON.stringify(userInfo));
	  }
	}, [userInfo]);
  
	const login = (user: UserRes) => {
	  console.log(user)
	  setUserInfo(user);
	  navigate("/");
	};
  
	const logout = () => {
	  FB.getLoginStatus((response) => {
		if (response.status === "connected") {
		  FB.logout((res) => {
			window.localStorage.removeItem("user");
			setUserInfo(undefined);
		  });
		}
	  });
	};
  
	return (
	  <AuthContext.Provider value={{ userInfo, login, logout }}>
		{children}
	  </AuthContext.Provider>
	);
  }
  
  export const useAuth = () => {
	return useContext(AuthContext);
  };
  