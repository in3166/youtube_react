const { response } = require('express');
const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");



router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        // 여기서 그냥 comment만 전달하면 id 밖에 없음(이미지, 이름 등x) -> save에선 populate 사용 불가
        // 모델을 가져와서 그냥 다시 찾음
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
});

router.post('/getComments', (req, res) => {
    Comment.find({ 'videoId': req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, comments });
        });
});

module.exports = router;