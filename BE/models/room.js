const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	owner_id: {
		type: String,
		required: true
	},
	started_at: {
		type: String,
	},
	expires_at: {
		type: String
	}
}, {timestamps: true});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;