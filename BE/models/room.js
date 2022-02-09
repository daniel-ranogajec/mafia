const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    user_id: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
	picture: {
		type: String
	}
}, { _id : false })

const roomSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	owner: {
		type: userSchema,
		required: true
	},
	users: [userSchema],
	expires_at: {
		type: String
	}
}, {timestamps: true});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;