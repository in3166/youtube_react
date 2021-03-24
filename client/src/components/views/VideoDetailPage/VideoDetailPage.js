import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo.js';
import Subscribe from './Sections/Subscribe';


function VideoDetailPage(props) {
    const [VideoDetail, setVideoDetail] = useState([]);

    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId } // url에서 id 가져오기

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                if (res.data.success) {
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert("비디오 정보 가져오기 실패");
                }
            })
    }, []);

    if (VideoDetail.writer) {
        // 사용자 자신의 동영상에 구독 버튼 없애기
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />;

        return (
            // gutter: 여백 (표 사이)
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                        {/* 구독 버튼 */}
                        <List.Item actions={[subscribeButton]} >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />

                </Col>
            </Row >
        )
    } else {
        return (
            <div>...loading</div>
        )
    }
}

export default VideoDetailPage
