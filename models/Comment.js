const mongoose = require('mongoose');
const { Schema } = mongoose;

const Commentchema = new Schema({
    userId : {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    }
})

export default mongoose.model("Comment", CommentSchema);