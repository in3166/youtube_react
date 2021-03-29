import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo.js';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';


function VideoDetailPage(props) {
    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([])
    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId } // url에서 id 가져오기

    useEffect(() => {
        // 비디오 정보 가져오기
        Axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data.videoDetail)
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert("비디오 정보 가져오기 실패");
                }
            })

        // 댓글 정보 가져오기
        Axios.post('/api/comment/getComments', variable)
            .then(res => {
                if (res.data.success) {
                    //   console.log(res.data.comments)
                    setComments(res.data.comments);
                } else {
                    alert("비디오 정보 가져오기 실패");
                }
            })

    }, []);
    // state 끌어올리기: 밑에서 댓글 등록하면 리렌더? 업데이트
    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }

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
                        <List.Item actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />, subscribeButton]} >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* 댓글 */}
                        <Comment refreshFunction={refreshFunction} videoId={videoId} commentLists={Comments} />
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
