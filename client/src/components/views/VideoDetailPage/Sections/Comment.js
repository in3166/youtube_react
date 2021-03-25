import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
// 구조
// Single Comment [1. userInfo, 2. Content, 3. Comment Form, 4. Actions]
// Reply [<SingleCommnet> <ReplyComment>]
// Root Comment Form
// 댓글 작성 버튼을 누르면 Parent인 VideoDetailPage의 Comment State로 업데이트 해주고 리렌더링 (순환)

function Comment(props) {
    const videoId = props.videoId; // url
    const user = useSelector(state => state.user); // user-userdata-_id,name...
    const [CommentValue, setCommentValue] = useState('');

    const handleClick = (e) => {
        setCommentValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); // refresh 방지
        const variables = {
            content: CommentValue,
            writer: user.userData._id, // redux에서 가져와보기
            videoId: videoId, // props or url
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(res => {
                if (res.data.success) {
                    props.refreshFunction(res.data.result);
                    setCommentValue(''); // 보내면 빈칸
                    //console.log(res.data.result)
                } else {
                    alert('댓글 작성 실패');
                }
            })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment List */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                // 처음 화면 대댓글 아닌 애들만 출력
                (!comment.resposeTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} videoId={videoId} comment={comment} />
                        <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} videoId={videoId} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="댓글을 작성해 주세요."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
