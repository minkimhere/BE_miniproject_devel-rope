const express = require("express");
const router = express.Router(); //라우터 선언
const Post = require("../schemas/post");
const authMiddleware = require("../middlewares/auth-middleware");
// const path = require('path');


//1번 uploads저장, 2번 이미지보여주는 라우터
//파일업로드 multer모듈 적용
// const multer = require('multer'); 
// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } }); 
// 입력한 파일이 uploads/ 폴더 내에 저장된다.
// multer라는 모듈이 함수라서 함수에 옵션을 줘서 실행을 시키면, 해당 함수는 미들웨어를 리턴한다.
  // 서버 디스크에 저장하거나 AWS S3와 같은 외부에 저장합니다.
  // multer-s3나 multer-google-storage와 같은 모듈을 찾아서 활용해봅시다
/**
 * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
 * 다른 폼으로 데이터를 전송하면 적용이 안된다.
 * HTTP Header에 명시해서 보내주는게 좋다.
 */


// //Storage multer 
// //multer 의 diskStorage를 정의
// const storage = multer.diskStorage({
//   //저장경로 - uploads폴더
//   destination:(req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   //파일명- 타임스탬프.확장자 형식
//   filename:(req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
//   //업로드된 파일의 유효성 검사
//   //webp - 구글에서 만든 이미지 파일 포맷 '웹피'
//   fileFilter:(req, file, fn)=>{
//     const typeArray = file.mimetype.split('/');
//     const fileType = typeArray[1];

//     if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' 
//         || fileType == 'gif' || fileType == 'webp') {
//         req.fileValidationError = null;
//         cb(null, true);
//     } else {
//         req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
//         cb(null, false)
//     }
//   },
//    // limit : 파일 사이즈 제한 (byte 단위) 아래는 5mb 까지만 허용함
//    limit: { fileSize: 5 * 1024 * 2014 }
// })

// // multer 미들웨어를 설정합니다.
// // upload.single외에도 array, fields, none이 존재합니다.
// // upload.single()에는 제출하는 input의 name을 적어주면 됩니다.
// const upload = multer({ storage: storage }).single("img")

// //파일 크기제한 2가지 방법 1.아래와같이, 2.storage함수안에 limit~~
// // const upload = multer({ storage: storage, limit: { fileSize: 5 * 1024 * 2014 } }).single("img")




// // Post 전체 정보 불러오기
router.get("/post", async (req, res) => {
  try {
    const post = await Post.find({}).sort("-date").exec();
    const user = res.locals.users;
    res.json({
      post, user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });

  }
});

//Post 생성
router.post("/post", authMiddleware, async (req, res) => {
  const {content, imgUrl } = req.body;  //{} 비구조화 할당, [] 구조분해 할당
  const userIcon  = res.locals.users.userIcon
  const nickname  = res.locals.users.nickname
  const userId = res.locals.users.userId 
  const comment_cnt = 0;

  //db의 date 호출전 날짜 형식 맞추기   //2022-02-03 09:40:10 형식으로 출력
const date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "");
  try {
    const result = await Post.create({ userId, nickname, userIcon, content, imgUrl, date, comment_cnt });
    const postId = result.postId;

    res.status(200).json({
      postId,
      ok: true,
      message: "생성 성공"
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      errorMessage: "생성 실패"
    });
  }
});
//Post 생성
// 썬더 포스트생성 바디
// {
//     "content": "토큰 게시글입력 테스트",
//     "imgUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.msscdn.net%2Fimages%2Fgoods_img%2F20191216%2F1252014%2F1252014_1_500.jpg&imgrefurl=https%3A%2F%2Fstore.musinsa.com%2Fapp%2Fgoods%2F1252014&tbnid=3vNacgxz1vVfBM&vet=12ahUKEwjxhYDzu_f1AhVsz4sBHeXSA2QQMygeegUIARCUAg..i&docid=5VYXw3FcqVcrnM&w=500&h=500&q=%EA%B0%95%EC%95%84%EC%A7%80&ved=2ahUKEwjxhYDzu_f1AhVsz4sBHeXSA2QQMygeegUIARCUAg",
// }
// 썬더 Auth > OAuth2 > Access Token  (master토큰)
//   

//썬더 로그인 바디 (master)
// {
//   "email": "email@email.com",
//   "password": "asdfasdf"
// }
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY0NDkyMTU1Mn0.4zW5NBzBDHO00LGAj3z6zVJ-PhZ6axvIQTXhXux9Tsk",
//   "ok": true
// }





// Post 상세 보기 
router.get("/detail/:postId",  async (req, res) => {
    try {
      const { postId } = req.params;
      const detail = await Post.findOne({ postId: Number(postId) });
      const userIcon = detail.userIcon // 로컬에서 userIcon 찾기 
      
      res.status(200).json({
        ok: true,
        detail,
        userIcon,
        message: "상세페이지 보기 성공"
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      errorMessage: "상세페이지 보기 실패",
    });
    console.log("Post 상세페이지 보기 실패: " + err);
  }
});


// //Post 수정하기
router.put("/item/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { content, imgUrl } = req.body;
  const nickname = res.locals.users.nickname;
  const existPost = await Post.findOne({ postId: Number(postId) });
  if (existPost.nickname !== nickname) {
    return res.status(400).json({
      existPost,
      ok: false,
      message: "수정 실패"
    });
  } else if (existPost.nickname === nickname) {
        await Post.updateOne({ postId: Number(postId) }, { $set: { content, imgUrl }});
    }
    res.status(200).json({
        ok: true,
        errorMessage: "수정 성공",
      });

});
// {
//   "content": "수정수정테스트",
//   "imgUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpurplejam.kr%2Fcontent%2Fimages%2F2020%2F02%2Fshutterstock_1544993138-1.jpg&imgrefurl=https%3A%2F%2Fpurplejam.kr%2Fcat-whiskers%2F&tbnid=PPqYOsFYQ7knIM&vet=12ahUKEwj21oXQvfn1AhXZOnAKHcShDaYQMyhMegQIARBu..i&docid=zt5_8DNuqu8prM&w=2000&h=1333&q=%EA%B3%A0%EC%96%91%EC%9D%B4&ved=2ahUKEwj21oXQvfn1AhXZOnAKHcShDaYQMyhMegQIARBu"
// }



// //Post 삭제하기
router.delete("/item/:postId", authMiddleware, async  (req, res) => {
  const { postId } = req.params;
  const nickname = res.locals.users.nickname
  const existPost = await Post.findOne({ postId: Number(postId) });
  if (existPost.nickname !== nickname) {
    return res.status(400).json({
      nickname,
      existPost,
      ok: false,
      message: "삭제 실패"
    });
  } else if (existPost.nickname === nickname) {
      await Post.deleteOne({ postId: Number(postId)});
  }
  res.status(200).json({
    ok: true,
    errorMessage: "삭제 성공"
  });
});



module.exports = router;