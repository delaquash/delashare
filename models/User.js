import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema ({
    name :{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String]
    }
},
    {timestamps: true}
)

/*  */
// module.exports = mongoose.model('User', UserSchema);

export default mongoose.model("User", UserSchema);