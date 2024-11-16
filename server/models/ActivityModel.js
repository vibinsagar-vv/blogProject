const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: String,
    description:String,
    images:[],
    creator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    users:[{ type: mongoose.Schema.Types.ObjectId,
        ref: "user"}]
}, { timestamps: true });

const activityModel= mongoose.model("activities", activitySchema);

module.exports = activityModel;
