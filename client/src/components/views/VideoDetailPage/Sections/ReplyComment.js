import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        // 댓글마다 대댓글 개수 찾기
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
            setChildCommentNumber(commentNumber);
        })
    }, [props.commentLists, props.parentCommentId]) // 부모의 comments들이 바뀔때마다 이 전체를 실행

    const renderReplyComment = (parentCommentId) => {
        return props.commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    // 부모 댓글의 아이디와 자식 댓글의 responsTo 아이디가 같아야만 렌더링
                    (comment.responseTo === parentCommentId &&
                        <div style={{ width: '80%', marginLeft: '40px' }}>
                            <SingleComment refreshFunction={props.refreshFunction} videoId={props.videoId} comment={comment} />
                            <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} parentCommentId={comment._id} videoId={props.videoId} />
                        </div>)
                }
            </React.Fragment>
        ))
    }

    const onHandleChange = () => {
        console.log(OpenReplyComments);
        setOpenReplyComments(!OpenReplyComments);
    }


    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>View {ChildCommentNumber} more comment(s)</p>
            }
            {
                OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
