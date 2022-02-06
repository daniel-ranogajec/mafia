import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function JoinRoom(){
	const [RoomCode, setRoomCode] = useState<string>('')
	const navigate = useNavigate()

	const rooms: string[] = ['abcd', 'ecbd', 'shsh']


	const joinRoom = (roomCode: string) => {
		//TODO: switch to room page
		console.log(`App.tsx: ${roomCode}`)
		if(!rooms.includes(roomCode)){
			navigate('/notfound')
		}else{
			navigate(`/room/${roomCode}`);
		}
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		if(RoomCode) {
			console.log(RoomCode)
			joinRoom(RoomCode)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label>Join Room:</label>
				<input type='text' value={RoomCode} onChange={(e) => setRoomCode(e.target.value)}/>
			</div>
			<input type='submit' value='Join Room' />
		</form>
	)
}