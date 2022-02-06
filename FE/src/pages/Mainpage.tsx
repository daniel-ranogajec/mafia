import JoinRoom from "../components/JoinRoom";
import { CreateRoom } from "../components/CreateRoom"
import uniqid from 'uniqid'

export const Mainpage = () => {
	const createRoom = () => {
		//TODO: get all current rooms from db
		//Check if generated ID is the same as one of current rooms
		
		console.log(uniqid())
	}
	return <div>
		<CreateRoom createRoom={createRoom}/>
		<JoinRoom />
	</div>;
};
