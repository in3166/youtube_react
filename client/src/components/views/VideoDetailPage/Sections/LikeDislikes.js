import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
    // DB에서 좋아요, 싫어요 정보 가져오기
    // 좋아요, 싫어요 개수
    // 내가 둘 중 하나 눌렀는지 여부
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    // post 보낼때 이게 비디오/댓글에 관한건지 구별 -> 부모 detail에서 props을 넣어 존재여부
    let variable = {};
    if (props.video) {
        variable = {
            videoId: props.videoId,
            userId: props.userId,
        }
    } else {
        variable = {
            commentId: props.commentId,
            userId: props.userId,
        }
    }


    useEffect(() => {
        // Likes
        Axios.post('/api/like/getLikes', variable)
            .then(res => {
                if (res.data.success) {
                    // 개수
                    setLikes(res.data.likes.length);

                    // 클릭 여부
                    res.data.likes.map(like => {
                        // like 한 사람들중 내가 있다면
                        console.log(like)
                        console.log(like.userId, props.userId)
                        if (like.userId === props.userId) {
                            console.log("좋아요함")
                            setLikeAction('liked');
                        }
                    })
                } else {
                    alert("Like 정보 가져오기 실패")
                }
            })

        // Dislikes
        Axios.post('/api/like/getDislikes', variable)
            .then(res => {

                if (res.data.success) {
                    // 개수
                    setDislikes(res.data.dislikes.length);

                    // 클릭 여부
                    res.data.dislikes.map(dislike => {
                        // like 한 사람들중 내가 있다면
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    })
                } else {
                    alert("Dislike 정보 가져오기 실패")
                }
            })
    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(res => {
                    console.log("좋아요 함 아이디: ", variable.userId)
                    if (res.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');
                        if (DislikeAction !== null) {
                            setDislikeAction(null);
                            setDislikes(Dislikes - 1);
                        }
                    } else {
                        alert('좋아요 실패');
                    }
                })
        } else {
            // like 이미 클릭
            Axios.post('/api/like/unLike', variable)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes - 1);
                        setLikeAction(null);
                    } else {
                        alert('좋아요 해제 실패');
                    }
                })
        }
    }

    const onDislike = () => {
        if (DislikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(res => {
                    if (res.data.success) {
                        setDislikes(Dislikes - 1);
                        setDislikeAction(null);
                    } else {
                        alert('싫어요 해제 실패');
                    }
                })
        } else {
            // like 이미 클릭
            Axios.post('/api/like/upDislike', variable)
                .then(res => {
                    if (res.data.success) {
                        setDislikes(Dislikes + 1);
                        setDislikeAction('disliked');
                        if (LikeAction !== null) {
                            setLikeAction(null);
                            setLikes(Likes - 1);
                        }
                    } else {
                        alert('싫어요 실패');
                    }
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>&nbsp;
        </div>
    )
}

export default LikeDislikes
