import React, { useState } from "react"

interface Props {
	joinRoom: (roomCode: string) => void
}

export const JoinRoom: React.FC<Props> = ({ joinRoom }) => {
	const [RoomCode, setRoomCode] = useState<string>('')

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