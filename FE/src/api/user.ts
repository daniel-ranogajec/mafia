import axios from "axios";


export type UserReq = {
	email: string;
	name: string;
	userID: string;
	picture: string;
};

export type UserRes = {
	_id: string;
	email: string;
	name: string;
	userID: string;
	picture: string;
};

  
export function loginUser(
	user: UserReq
  ): Object{
	//TODO:		const response = await axios.post("/user/add-user", user);
  
	//if (response.status !== 200) {
	// const errorMessage = await response.data;
	//  throw new Error(errorMessage);
	//}
  
	//return response.data as Promise<UserRes>;

	//make async
	return {
		_id: 1, email: user.email, name: user.name, userID: user.userID, picture:user.picture
	}
  }
  