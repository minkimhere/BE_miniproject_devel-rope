const express = require("express");
const router = express.Router(); //라우터 선언
const Post = require("../schemas/post");
const authMiddleware = require("../middlewares/auth-middleware");


// Post 전체 정보 불러오기
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


//Post 수정하기
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

//Post 삭제하기
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