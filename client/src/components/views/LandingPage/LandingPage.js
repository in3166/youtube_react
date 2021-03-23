import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';


const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);

    // db에서 비디오 정보 가져오기
    useEffect(() => {
        // 랜딩페이지에 오자마자 Request
        Axios.get('/api/video/getVideos')
            .then(res => {
                if (res.data.success) {
                    setVideo(res.data.videos)
                } else {
                    alert("비디오 정보 가져오기 실패")
                }
            })
    }, []) // [] 비어있으면 DOM 업데이트 시 한번만 실행, 아예 없으면 업데이트마다

    const renderCards = Video.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>
            <br />
            <Meta
                // 유저 임지ㅣ
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=""
            />
            <span>{video.writer.name}</span><br />
            <spna style={{ marginLeft: '3rem' }}>{video.views} views</spna> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Recommended</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {/* 전체가 24사이즈 */}
                {renderCards}

            </Row>
        </div>
    )
}

export default LandingPage
