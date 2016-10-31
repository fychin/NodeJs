var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var commentSchema = new Schema({
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
	}, { timestamp: true }
);

var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [commentSchema]
	},{ timestamps: true }	// createdAt: , updatedAt:
);

// the schema is useless so far
// we need to export a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to Node app
module.exports = Dishes;

