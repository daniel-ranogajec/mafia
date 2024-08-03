export default class Websocket {
	private static ws: WebSocket | null

	static init() {

	}

	static close() {
		this.ws?.close()
	}
	static connect() {
		this.ws = new WebSocket("ws://localhost:8000?username=user&room_id=12345")

		this.ws.onmessage = (e) => {
            console.log(e.data)
		}
	}

}