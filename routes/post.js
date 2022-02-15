const express = require("express");
const router = express.Router(); //라우터 선언
const Post = require("../schemas/post");
const authMiddleware = require("../middlewares/auth-middleware");
const Comment = require("../schemas/comment");

// // Post 관련 정보 불러오기
router.get("/post", async (req, res) => {
  try {
    const post = await Post.find({}).sort("-date").exec();
    const user = res.locals.users;

    const postId = post.postId;
    const comment = await Comment.find({ postId });
    const comment_cnt = comment.length;
    
    await Post.updateOne(
      { postId: postId },
      { $set: { comment_cnt: comment_cnt } }
    );

    res.json({
      post,
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });

    console.log("라우터post 전체목록조회 post값: " + post);
  }
});

//Post 생성
router.post("/post", authMiddleware, async (req, res) => {
  const { content, imgUrl } = req.body;
  const userIcon = res.locals.users.userIcon;
  const nickname = res.locals.users.nickname;
  const userId = res.locals.users.userId;

  //db의 date 호출전 날짜 형식 맞추기   //2022-02-03 09:40:10 형식으로 출력
  const date = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
  try {
    const result = await Post.create({
      nickname,
      userIcon,
      content,
      imgUrl,
      date,
      userId,
    });
    const postId = result.postId;
    res.status(200).json({
      postId,
      ok: true,
      message: "생성 성공",
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      errorMessage: "생성 실패",
    });
  }
});

//Post 생성
// 썬더 포스트생성 바디
// {
//     "content": "토큰 게시글입력 테스트",
//     "imgUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.msscdn.net%2Fimages%2Fgoods_img%2F20191216%2F1252014%2F1252014_1_500.jpg&imgrefurl=https%3A%2F%2Fstore.musinsa.com%2Fapp%2Fgoods%2F1252014&tbnid=3vNacgxz1vVfBM&vet=12ahUKEwjxhYDzu_f1AhVsz4sBHeXSA2QQMygeegUIARCUAg..i&docid=5VYXw3FcqVcrnM&w=500&h=500&q=%EA%B0%95%EC%95%84%EC%A7%80&ved=2ahUKEwjxhYDzu_f1AhVsz4sBHeXSA2QQMygeegUIARCUAg",
// }
// 썬더 Auth > OAuth2 >Access Token  (master토큰)
//

// Post 상세 보기
router.get("/detail/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(typeof postId);
    // const [detail] = await Post.findOne({ postId });
    console.log(postId);
    console.log("111넘버postId", Number(postId));
    const detail = await Post.findOne({ postId: Number(postId) });
    const userIcon = detail.userIcon; // 로컬에서 userIcon 찾기

    res.status(200).json({
      ok: true,
      detail,
      userIcon,
      message: "상세페이지 보기 성공",
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
  console.log(11, nickname);
  console.log(22, existPost);
  if (existPost.nickname !== nickname) {
    return res.status(400).json({
      existPost,
      ok: false,
      message: "수정 실패",
    });
  } else if (existPost.nickname === nickname) {
    await Post.updateOne(
      { postId: Number(postId) },
      { $set: { content, imgUrl } }
    );
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
router.delete("/item/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const nickname = res.locals.users.nickname;
  const existPost = await Post.findOne({ postId: Number(postId) });
  if (existPost.nickname !== nickname) {
    return res.status(400).json({
      nickname,
      existPost,
      ok: false,
      message: "삭제 실패",
    });
  } else if (existPost.nickname === nickname) {
    await Post.deleteOne({ postId: Number(postId) });
  }
  res.status(200).json({
    ok: true,
    errorMessage: "삭제 성공",
  });
});

module.exports = router;
