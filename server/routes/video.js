const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require('multer');

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
        if (ext !== '.mp4' || ext !== '.txt') {
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
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename }) //url: 비디오가 저장되는 경로를 클라이언트에 보내줌
    })
})


module.exports = router;
