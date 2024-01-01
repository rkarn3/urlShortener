const {
    Schema,
    model
} = require("mongoose");
  
const ShortnerSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    urlId: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    isSingleUse: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("Shortener", ShortnerSchema)