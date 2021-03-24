import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';

const { TextArea } = Input;

function SingleComment(props) {
    const videoId = props.videoId; // url
    const [OpenReply, setOpenReply] = useState(false);

    const [CommentValue, setCommentValue] = useState('');
    const user = useSelector(state => state.user); // user-userdata-_id,name...

    const onClickReplyOpen = (e) => {
        setOpenReply(!OpenReply);
    }
    const actions2 = [<span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply</span>]

    const onHandleChange = (e) => {
        setCommentValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); // refresh 방지

        // const variables = {
        //     content: CommentValue,
        //     writer: user.userData._id, // redux에서 가져와보기
        //     videoId: videoId, // props or url
        //     //responseTo: 
        // }

        // Axios.post('/api/comment/saveComment', variables)
        //     .then(res => {
        //         if (res.data.success) {
        //             console.log(res.data.result)
        //         } else {
        //             alert('댓글 작성 실패');
        //         }
        //     })
    }

    return (
        <div>
            <Comment
                actions={actions2}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="댓글을 작성해 주세요."
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
