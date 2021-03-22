import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

// option 반복을 위해 중복 제거 (map으로 만듦)
const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]
const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
]


function VideoUploadPage(props) {
    const user = useSelector(state => state.user); // state stroe (redux 상태관리 저장소?)에서 user state을 가져옴
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        // 파일을 보낼 때는 header가 없으면 오류 발생
        formData.append("file", files[0]);
        //console.log(files)
        Axios.post('/api/video/uploadfiles', formData, config)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)

                    let variable = {
                        url: res.data.url,
                        fileName: res.data.fileName
                    }
                    setFilePath(res.data.url);
                    // 비디오 업로드 성공 후 axios 다시 날림
                    Axios.post('/api/video/thumbnail', variable)
                        .then(res => {
                            if (res.data.success) {
                                // 정보를 state에 저장
                                setDuration(res.data.fileDuration);
                                setThumbnailPath(res.data.url);
                            } else {
                                alert('썸네일 생성 실패');
                            }
                        })
                } else {
                    alert('비디오 가져오기 실패');
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault(); // 원래 하려던걸 방지, 중지 후 아래 코드 실행
        // 이미 state에 user 데이터 존재 -> redux hook으로 가져옴
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }
        Axios.post('/api/video/uploadVideo', variables)
            .then((res) => {
                if (res.data.success) {
                    message.success('업로드 성공')
                    setTimeout(() => {
                        props.history.push('/');
                    }, 1000);

                } else {
                    alert("비디오 업로드 실패");
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone: npm install react-dropzone --save */}
                    <Dropzone
                        accept="video/*"
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000} >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>
                    {/* 비디오 업로드 시 썸네일 */}
                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                        </div>
                    }
                </div>

                <br />
                <br />
                <label>Ttitle</label>
                {/* onChange에 아무것도 없으면 입력이 안됨 -> onChange에서 state를 바꿔주고 그 state를 value에 넣어줘야 적용 */}
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
