const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, // User 모델로가서 모든 정보 긁어오기 가능
        ref: 'User',
    },
    commentId: {
        type: Schema.Types.ObjectId, // User 모델로가서 모든 정보 긁어오기 가능
        ref: 'Comment',
    },
    videoId: {
        type: Schema.Types.ObjectId, // User 모델로가서 모든 정보 긁어오기 가능
        ref: 'Video',
    }
}, { timestamps: true })

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }