import { useEffect } from "react";
import ReactFacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { Card, CardContent } from "@material-ui/core";
import { loginUser, UserRes } from "../api/user"
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
  const { userInfo, login } = useAuth();

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const loginCallback = (
    userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
	  console.log("inside login callback")
    const res = loginUser({
      userID: (userInfo as ReactFacebookLoginInfo).userID!!,
      email: (userInfo as ReactFacebookLoginInfo).email!!,
      name: (userInfo as ReactFacebookLoginInfo).name!!,
      picture: (userInfo as ReactFacebookLoginInfo).picture?.data.url!!,
    });

	  console.log(login)

	login(res as UserRes)
	//TODO: make async
    //res
    //  .then((data) => {
    //    login(data);
    //  })
    //  .catch((err) => {
    //    console.log(err);
    // });
  };
	return (
		  <div>
			<Card>
			  <CardContent>
				<div>
				  <ReactFacebookLogin
					appId={"270711568527887"}
					fields="name,email,picture"
					callback={loginCallback}
				  />
				</div>
			  </CardContent>
			</Card>
		  </div>
	  );
};
