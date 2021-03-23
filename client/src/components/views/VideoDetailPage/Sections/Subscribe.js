import Axios from 'axios'
import React, { useState, useEffect } from 'react'

function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);
    useEffect(() => {
        let variable = { userTo: props.userTo }
        // 비디오 업로드 사용자를 구독하는 사람의 수
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(res => {
                if (res.data.success) {
                    setSubscribeNumber(res.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 가져오지 못했습니다.');
                }
            })

        // 비디오 페이지에 들어가면 내가 이사람을 구독하는지 알기 위해서 내 정보 필요
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(res => {
                if (res.data.success) {
                    setSubscribed(res.data.subscribed)
                } else {
                    alert('구독여부 정보를 가져오지 못했습니다.')
                }
            })
    }, [])

    const onSubscribe = () => {
        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }
        if (Subscribed) {
            // 이미 구독 중
            Axios.post('/api/subscribe/unsubscribe', subscribeVariable)
                .then(res => {
                    if (res.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독 취소 실패');
                    }
                })
        } else {
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(res => {
                    if (res.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독 실패');
                    }
                })
        }
    }

    return (
        <div>
            <button style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
