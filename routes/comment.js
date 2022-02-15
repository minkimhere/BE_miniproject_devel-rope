const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");

// 댓글쓰기
router.post("/comment/:postId", authMiddleware, async (req, res) => {
  const { comment } = req.body; // 댓글, 댓글 번호
  const { postId } = req.params; // 게시글 번호
  const userId = res.locals.users.userId; //닉네임 //로그인에서 받아오는 user값 없는 동안 임시로 가져옴.
  const nickname = res.locals.users.nickname; //닉네임 //로그인에서 받아오는 user값 없는 동안 임시로 가져옴.
  const userIcon = res.locals.users.userIcon; //닉네임 //로그인에서 받아오는 user값 없는 동안 임시로 가져옴.
  try {
    if (!comment) {
      return res.status(400).send({ ok: false, message: "등록 실패" });
    }
    await Comment.create({ userId, comment, nickname, postId, userIcon });
    res.json({ ok: true, message: "등록 성공"});
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
    }
  } catch (error) {
    res.status(400).json({ ok: false, message: "삭제 실패" });
    console.log(`${error} 해당 에러로 인해 comment 삭제가 실패하였습니다.`);
  }
});

module.exports = router;
