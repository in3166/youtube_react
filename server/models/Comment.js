const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, // 답글 다는 사람
        ref: 'User',
    },
    videoId: {
        type: Schema.Types.ObjectId, // 어떤 비디오에 답근을 다는가
        ref: 'Video',
    },
    responseTo: {
        type: Schema.Types.ObjectId, // 누구에게 답글 (루트 댓글 작성자-젤 처음은 없음)
        ref: 'User',
    },
    content: {
        type: String, //답글 내용
    },

}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }