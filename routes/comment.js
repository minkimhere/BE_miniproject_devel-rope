const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");

// 댓글쓰기
router.post("/comment/:postId", authMiddleware, async (req, res) => {
  const { comment } = req.body; // 댓글, 댓글 번호
  const { postId } = req.params; // 게시글 번호
  const userId = res.locals.users.userId; // 로그인 정보에 담아 놓은 유저 아이디
  const nickname = res.locals.users.nickname; // 로그인 정보에 담아놓은 닉네임
  const userIcon = res.locals.users.userIcon; // 로그인 정보에 담아놓은 유저 아이콘
  //db의 date 호출전 날짜 형식 맞추기   //2022-02-03 09:40:10 형식으로 출력
  const date = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
  try {
    if (!comment) {
      return res.status(400).send({ ok: false, message: "등록 실패" });
    }
    const result = await Comment.create({
      userId,
      comment,
      nickname,
      postId,
      userIcon,
      date,
    });
    res.json({ ok: true, message: "등록 성공", commentId: result.commentId });
  } catch (error) {
    res.status(400).json({ ok: false, message: "등록 실패" });
    console.log(`${error}에러로 인해 댓글쓰기가 실패했습니다.`);
  }
});

// 댓글조회
router.get("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await Comment.find({
      postId: postId,
    }).sort("-commentId");
    res.json({ ok: true, result: comment });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 댓글수정
router.put("/comment/:commentId", authMiddleware, async (req, res) => {
  try {
    const { comment } = req.body; // 댓글
    const { commentId } = req.params; // 댓글 번호 *url은 스트링이라 디비값이랑 비교할 때 Number로 해줘야 함.
    const userId = res.locals.users.userId; // 로그인 정보에 담아놓은 userId

    const [findComment] = await Comment.find({ commentId: commentId }); // 댓글번호로 현재 댓글 찾기
    const commentUserId = findComment.userId; // 현재 댓글의 userId

    if (userId === commentUserId) {
      await Comment.updateOne(
        { commentId: Number(commentId) },
        { $set: { comment } }
      );
      res.json({ ok: true, message: "수정 성공" });
    } else {
      res.json({ ok: false, message: "수정 실패" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 댓글삭제
router.delete("/comment/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const userId = res.locals.users.userId; // 로그인 정보에 담아놓은 userId

  try {
    const [findComment] = await Comment.find({ commentId: [commentId] });
    const commentUserId = findComment.userId; // db에 저장해놓은 userId
    const comment = await Comment.find({ commentId: [commentId] });

    if (userId === commentUserId && comment.length) {
      await Comment.deleteOne({ commentId: commentId });
      res.json({ ok: true, message: "삭제 성공" });
    } else {
      res.json({ ok: false, message: "삭제 실패" });
    }
  } catch (error) {
    res.status(400).json({ ok: false, message: "삭제 실패" });
    console.log(`${error} 해당 에러로 인해 comment 삭제가 실패하였습니다.`);
  }
});

module.exports = router;
