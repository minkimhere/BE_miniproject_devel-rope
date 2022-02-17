const express = require('express');
const router = express.Router();
const Like = require('../schemas/like');
const Post = require('../schemas/post');
const authMiddleware = require('../middlewares/auth-middleware');

// 해당 게시물 좋아요 추가 기능
// router.post('/like', authMiddleware, async (req, res) => {
router.post('/', authMiddleware, async (req, res) => {
  const { postId, userId } = req.body;     //body값으로 받기
  try {
    const post = await Post.findOne({ postId }, { _id: false }); // 게시물 카운터
    if (post.like_cnt === 0) {
      await Like.create({ postId, userId });

      const like_cnt = post.like_cnt + 1;
console.log("좋아요post의like_cnt: " + like_cnt);
      await Post.updateOne({ postId:post.postId }, { $set: { like_cnt } });
      return res
        .status(200)
        .json({ ok: true, like_cnt, message: '좋아요 추가 완료!' });
    } else {
      return res
        .status(400)
        .json({ ok: false, like_cnt, errorMessage: "'좋아요'는 한번만 가능합니다" });
    }
  } catch (err) {
    console.log('좋아요 추가 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ ok: false, message: '좋아요 추가에서 예상치 못한 에러가 발생했습니다.' });
  }
});
// {
//   "postId": 1,
//   "userId": "email@email.com"
// }



//좋아요 취소 기능
// router.delete('/like', authMiddleware, async (req, res) => {
router.delete('/', authMiddleware, async (req, res) => {
  const { postId, userId } = req.body;    
  try {
    await Like.deleteOne({ postId, userId });
    const post = await Post.findOne({ postId }, { _id: false });
    // like_cnt가 0인 경우, 내보내기
    if (post.like_cnt === 0 ) {
      return res
        .status(200)
        .json({ ok: false, like_cnt, msg: '잘못된 접근!' });
    }
    const like_cnt = post.like_cnt - 1;

    await Post.updateOne({ postId }, { $set: { like_cnt } });
    return res
      .status(200)
      .json({ ok: true, like_cnt, message: '좋아요 취소 완료!' });
  } catch (err) {
    console.log('좋아요 취소 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ ok: false, errorMessage: '좋아요 취소에서 예상치 못한 에러가 발생했습니다.' });
  }
});

module.exports = router;