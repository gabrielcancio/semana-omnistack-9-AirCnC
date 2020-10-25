const mongoose = require('mongoose');
const imageUrlParser = require('../utils/imageUrlParser');

const url = imageUrlParser();

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    value: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `${url}/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);