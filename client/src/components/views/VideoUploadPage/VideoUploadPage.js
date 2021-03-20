import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
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

function VideoUploadPage() {
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

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
        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        // 파일을 보낼 때는 header가 없으면 오류 발생
        formData.append("file", files[0]);
        //console.log(files)
        Axios.post('/api/video/uploadfiles', formData, config)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                } else {
                    alert('비디오 업로드 실패');
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone: npm install react-dropzone --save */}
                    <Dropzone
                        accept="video/*"
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>
                    {/* 비디오 업로드 시 썸네일 */}
                    <div>
                        <img src alt />
                    </div>
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

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
