const express = require("express");
const User = require("../schemas/user");
const Joi = require("joi");
const authMiddleware = require("../middlewares/auth-middleware");
const jwt = require("jsonwebtoken");
const user = require("../schemas/user");
const { NativeError } = require("mongoose");
const router = express.Router();

const emailUsersSchema = Joi.object({
  email: Joi.string().required(),
});

//이메일 중복확인
router.post("/join/emailCheck", async (req, res) => {
  try {
    const {email} = await emailUsersSchema.validateAsync(req.body);
    const existEmail = await User.find({ email });
    if (existEmail.length) {
      res.status(401).send({
        ok: false,
        errorMessage: "이미 사용된 이메일입니다. 😯",
      });
      return;
    }

    if (!existEmail.length) {
      res.status(200).send({
        ok:true,
        message: "사용하실 수 있는 이메일입니다. 😃",
      })
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      ok: false,
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
  })
}
});

const nicknameUsersSchema = Joi.object({
  nickname: Joi.string().required(),
});

//닉네임 중복확인
router.post("/join/nicknameCheck", async (req, res) => {
  try {
    const {nickname} = await nicknameUsersSchema.validateAsync(req.body);
    const existNickname = await User.find({ nickname });
    if (existNickname.length) {
      res.status(401).send({
        ok: false,
        errorMessage: "이미 사용된 닉네임입니다. 😯",
      });
      return;
    }

    if (!existNickname.length) {
      res.status(200).send({
        ok:true,
        message: "사용하실 수 있는 닉네임입니다. 😃",
      })
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      ok: false,
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
  })
}
});

const postUsersSchema = Joi.object({
  email: Joi.string().required(),
  nickname: Joi.string().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string().required(),
  git: Joi.string().required(),
  blog: Joi.string().required(),
  userIcon: Joi.string().required(),
});

// 회원가입
router.post("/join", async (req, res) => {
  try {
    const { email, nickname, git, blog, password, confirmpassword, userIcon } =
      await postUsersSchema.validateAsync(req.body);
    // if (!(email || nickname || git || blog || password || confirmpassword || userIcon)) {
    //   res.status(401).send({
    //     ok: false,
    //     errorMessage: "모든 항목을 입력해 주세요 🙄",
    //   });
    //   return;
    // }
    
    if (password !== confirmpassword) {
      res.status(401).send({
        ok: false,
        errorMessage: "패스워드가  패스워드 확인란과 일치하지 않습니다. 😯",
      });
      return;
    }

    // 이메일, 닉네임 중복확인
    // try {
    // const email = await emailUsersSchema.validateAsync(req.body);
    // const nickname = await nicknameUsersSchema.validateAsync(req.body);

    const existEmail = await User.find({ email });
    const existNickname = await User.find({ nickname });
    if (existEmail.length) {
      res.status(401).send({
        ok: false,
        errorMessage: "이미 사용된 이메일입니다. 😯",
      });
      return;
    } else {
      res.status(201).send({
        ok:true,
        message: "사용하실 수 있는 이메일입니다 😏",
      });
    }

    if (existNickname.length) {
      res.status(401).send({
        ok:false,
        errorMessage: "이미 사용된 닉네임입니다. 😯",
      })
      return;
    } else {
      res.status(201).send({
        ok:true,
        message: "사용하실 수 있는 닉네임입니다 😏",
      });
    }
    
//   } catch (err) {
//     console.log(err);
//     res.status(401).send({
//       ok: false,
//       errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
//   })
// }

// const blogRegExp =
//   /(blog\.naver\.com\/)|(tistory\.com)|(github\.blog)|(velog\.io\/)/g;
// const gitRegExp = /(github.com\/)/g;

// if (!blogRegExp.test(blog)) {
//   console.log(blog)
//   res.status(401).send({
//     ok: false,
//     errorMessage:
//       "블로그는 네이버/티스토리/깃허브블로그/벨로그만 사용하실 수 있습니다. 😯",
//   });
//   return;
// }

// if (!gitRegExp.test(git)) {
//   res.status(401).send({
//     ok: false,
//     errorMessage:
//       "올바른 깃허브 프로필 주소를 입력해 주세요. ex) github.com/example ",
//   });
//   return;
// }
    await User.create({ email, nickname, password, git, blog, userIcon });
    res.status(200).send({
      ok: true,
      message: "회원가입이 성공적으로 완료되었습니다! 😉",
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      ok: false,
      errorMessage: "모든 항목을 입력해 주세요 🙄",
    });
  }
});

// 썬더 회원가입 바디
// {
//   "email": "email1@email.com",
//   "password": "asdfasdf",
//   "confirmpassword": "asdfasdf",
//   "nickname": "user1",
//   "git": "github.com/git",
//   "blog": "blog.tistory.com",
//   "userIcon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmRlC2TYQZSkEqSX1a5TyCjr6pDQi4Iaig1A&usqp=CAU"
// }

const postAuthSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = await postAuthSchema.validateAsync(req.body);
    const user = await User.findOne({ email, password }).exec();
    if (!user) {
      res.status(401).send({
        ok: false,
        errorMessage: "이메일 또는 패스워드가 잘못되었습니다.",
      });
      return;
    }

    const token = jwt.sign({ userId: user.userId }, "secret-key");
    res.send({
      token,
      nickname: user.nickname,
      userId: user.userId, 
      userIcon: user.userIcon,
      ok: true,
    });
    console.log(user.userIcon)
  } catch (err) {
    console.log(err);
    res.status(401).send({
      ok: false,
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
    });
  }
});
//썬더 로그인 바디 (master)
// {
//   "email": "email@email.com",
//   "password": "asdfasdf"
// }

//내 로그인 정보 불러오기
router.get("/auth", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    email: user.email,
    nickname: user.nickname,
    userId: user.userId, 
    userIcon: user.userIcon,
    result: "ok",
  });
});

//일부 유저 정보 불러오기
router.get("/user", authMiddleware, async (req, res) => {
  const user = await User.aggregate([
    { $sample: { size: 6 } },
    { $project: { email: 1, git: 1, blog: 1, nickname: 1, userIcon: 1 } },
  ]);
  res.json({
    user,
  });
});

//모든 유저 정보 불러오기
router.get("/users", authMiddleware, async (req, res) => {
  const user = await User.aggregate([
    { $project: { email: 1, git: 1, blog: 1, nickname: 1, userIcon: 1 } },
  ]);
  res.json({
    user,
  });
});

module.exports = router;
