const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

// config option
// client 파일을 보내면 여길 먼저 타서 upload에 저장
let storage = multer.diskStorage({
    destination: (req, file, cb) => {  // 파일을 어디에 저장할지 설명
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {  // 저장할 때 어떤 파일 이름으로 저장할지
        cb(null, `${Date.now()}_${file.originalname}`);  // 120323_hi.mp4
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file"); // 파일은 하나만 



//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })  // route폴더의 video 파일에서 ('/upload'){} 안에 res.data.success가 false로 돼서 alert 띄움
        }
        console.log(req.body)
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename }) //url: 비디오가 저장되는 경로를 클라이언트에 보내줌
    })
})

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성 후 비디오 정보(러닝타임) 가져오기
    let filePath = '';
    let fileDuration = '';

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성
    ffmpeg(req.body.url) // 비디오 저장 경로 (uploads)
        .on('filenames', function (filenames) {  // 비디오 썸네일 파일네임 생성
            console.log('Will generate ' + filenames.join(', '));
            //  console.log(filenames);
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () { // 썸네일 생성 후 무엇을 할건지
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration })
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshots({ // 
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
})


module.exports = router;
