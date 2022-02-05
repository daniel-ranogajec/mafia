interface Props {
	createRoom: () => void
}

export const CreateRoom: React.FC<Props> = ({createRoom}) => {
  return <div>
	  <button onClick={createRoom}>Create New Room</button>
  </div>;
};
