const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");



router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => { // userTo를 구독하는 모든 케이스가 들어있음
            //console.log("subscribe")
            //console.log(subscribe)
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })
})

router.post('/subscribed', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom }) // 둘 다 포함되는게 있으면 구독 중
        .exec((err, subscribe) => { // userTo를 구독하는 모든 케이스가 들어있음
            //console.log("subscribe2")
            // console.log(subscribe)
            if (err) return res.status(400).send(err);
            let result = false;
            if (subscribe.length !== 0) result = true;
            res.status(200).json({ success: true, subscribed: result })
        })
})

router.post('/unsubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, doc })
        })
})

router.post('/subscribe', (req, res) => {
    // 저장을 위한 인스턴스를 만들고 정보 저장(user)
    const subscribe = new Subscriber(req.body);
    subscribe.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true })
    })
})

module.exports = router;