import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState('')
    useEffect(() => {


    }, [])

    const renderReplyComment = (parentCommentId) => {
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    // 부모 댓글의 아이디와 자식 댓글으 responsTo 아이디가 같아야만 렌더링
                    comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={props.refreshFunction} videoId={props.videoId} comment={comment} />
                        <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} videoId={props.videoId} />
                    </div>
                }
            </React.Fragment>
        ))
    }
    return (
        <div>
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick>View 1 more comment(s)</p>

            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
