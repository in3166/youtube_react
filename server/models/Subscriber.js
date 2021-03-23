const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId, // User 모델로가서 모든 정보 긁어오기 가능
        ref: 'User',
    },
    userFrom: {
        type: Schema.Types.ObjectId, // User 모델로가서 모든 정보 긁어오기 가능
        ref: 'User',
    },

}, { timestamps: true })

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }