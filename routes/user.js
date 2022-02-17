const express = require("express");
const User = require("../schemas/user");
const Joi = require("joi");

const pbkdf2Password = require("pbkdf2-password"); //비밀번호를  pbkdf2방식으로 암호화하는 모듈
const hasher = pbkdf2Password(); //비밀번호 해셔

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
    const { email } = await emailUsersSchema.validateAsync(req.body);
    const existEmail = await User.find({ email });
    if (existEmail.length) {
      res.status(200).send({
        ok: false,
        errorMessage: "이미 사용된 이메일입니다. 😯",
      });
      return;
    }

    if (!existEmail.length) {
      res.status(200).send({
        ok: true,
        message: "사용하실 수 있는 이메일입니다. 😃",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({
      ok: false,
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
    });
  }
});

const nicknameUsersSchema = Joi.object({
  nickname: Joi.string().required(),
});

//닉네임 중복확인
router.post("/join/nicknameCheck", async (req, res) => {
  try {
    const { nickname } = await nicknameUsersSchema.validateAsync(req.body);
    const existNickname = await User.find({ nickname });
    if (existNickname.length) {
      res.status(200).send({
        ok: false,
        errorMessage: "이미 사용된 닉네임입니다. 😯",
      });
      return;
    }

    if (!existNickname.length) {
      res.status(200).send({
        ok: true,
        message: "사용하실 수 있는 닉네임입니다. 😃",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({
      ok: false,
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
    });
  }
});

const postUsersSchema = Joi.object({
  email: Joi.string().required(),
  nickname: Joi.string().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string().required(),
  git: Joi.string().required(),
  blog: Joi.string().required(),
  blogtype: Joi.string().required(),
});

// 회원가입
router.post("/join", async (req, res) => {
  try {
    const { email, nickname, git, blog, password, confirmpassword, blogtype } =
      await postUsersSchema.validateAsync(req.body);
    // if (!(email || nickname || git || blog || password || confirmpassword || userIcon)) {
    //   res.status(401).send({
    //     ok: false,
    //     errorMessage: "모든 항목을 입력해 주세요 🙄",
    //   });
    //   return;
    // }
    if (password !== confirmpassword) {
      res.status(200).send({
        ok: false,
        errorMessage: "패스워드가  패스워드 확인란과 일치하지 않습니다. 😯",
      });
      return;
    }

    const gitRegExp = /(github\.com\/)/g;
    if (!gitRegExp.test(git)) {
      res.status(200).send({
        ok: false,
        errorMessage: "github.com/를 포함한 형식으로 입력해 주세요 😅",
      });
      return;
    }

    const blogRegExpVelog = /(velog\.io\/)/g
    const blogRegExpTistory = /(tistory\.com)/g
    const blogRegExpGithubblog = /(github\.blog)/g;
    const blogRegExpNaver = /(blog\.naver\.com)/g;

    switch (blogtype) {
      case "velog":
        if (!blogRegExpVelog.test(blog)) {
          res.status(200).send({
            ok: false,
            errorMessage: "velog.io/를 포함한 형식으로 입력해 주세요 😅",
          });
          return;
        }
        break;

      case "tistory":
        if (!blogRegExpTistory.test(blog)) {
          res.status(200).send({
            ok: false,
            errorMessage: "tistory.com를 포함한 형식으로 입력해 주세요 😅",
          });
          return;
        }
        break;

      case "githubblog":
        if (!blogRegExpGithubblog.test(blog)) {
          res.status(200).send({
            ok: false,
            errorMessage: "github.blog를 포함한 형식으로 입력해 주세요 😅",
          });
          return;
        }
        break;

      case "naver":
        if (!blogRegExpNaver.test(blog)) {
          res.status(200).send({
            ok: false,
            errorMessage: "blog.naver.com/를 포함한 형식으로 입력해 주세요 😅",
          });
          return;
        }
        break;

        default:
          res.status(200).send({
            ok: false,
            errorMessage: "올바른 형식이 아닙니다. 😥",
          });
          return;
    }

    const rndInt = Math.floor(Math.random() * 5) + 1; // 랜덤한 유저아이콘
    hasher({ password }, async (error, pw, salt, hash) => {
      if (error) {
        console.log(err);
        return;
      }
      await User.create({
        email,
        nickname,
        password: hash,
        salt,
        git,
        blog,
        userIcon: rndInt,
      });
    });

    res.status(201).send({
      ok: true,
      message: "회원가입이 성공적으로 완료되었습니다! 😉",
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
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
    const user = await User.findOne({ email }).exec();
    const salt = user.salt;
    const userpassword = user.password;
    if (!user) {
      res.status(200).send({
        ok: false,
        errorMessage: "이메일 또는 패스워드가 잘못되었습니다.",
      });
      return;
    } else {
      hasher({ password, salt }, async (error2, pw2, salt2, hash2) => {
        if (error2) {
          console.log(error2);
          return;
        }
        if (userpassword === hash2) {
          const token = jwt.sign({ userId: user.userId }, process.env.TOKENKEY);
          res.status(200).send({
            token,
            email: user.email,
            nickname: user.nickname,
            userId: user.userId,
            userIcon: user.userIcon,
            ok: true,
          });
        }

        if (userpassword !== hash2) {
          res.status(200).send({
            ok: false,
            errorMessage: "이메일 또는 패스워드가 잘못되었습니다.",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({
      ok: false,
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.😥",
    });
  }
});
//썬더 로그인 바디 (master)
// {
//   "email": "email@email.com",
//   "password": "1234"
// }
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTAxNzA3OH0.6ll9sveFNVlVxPO1Uf-nng_36LoUEMwT60IFpbr6gMg",
//   "email": "email@email.com",
//   "nickname": "master",
//   "userId": 1,
//   "userIcon": "5",
//   "ok": true
// }

//내 로그인 정보 불러오기
router.get("/auth", authMiddleware, async (req, res) => {
  const user = res.locals.users;
  console.log(user);
  res.send({
    email: user.email,
    nickname: user.nickname,
    userId: user.userId,
    userIcon: user.userIcon,
    ok: true,
  });
});

//일부 유저 정보 불러오기
router.get("/user", authMiddleware, async (req, res) => {
  const user = await User.aggregate([
    { $sample: { size: 6 } },
    {
      $project: {
        email: 1,
        git: 1,
        blog: 1,
        nickname: 1,
        userIcon: 1,
        userId: 1,
      },
    },
  ]);
  res.json({
    user,
  });
});

//모든 유저 정보 불러오기
router.get("/users", authMiddleware, async (req, res) => {
  const user = await User.aggregate([
    {
      $project: {
        email: 1,
        git: 1,
        blog: 1,
        nickname: 1,
        userIcon: 1,
        userId: 1,
      },
    },
  ]);
  res.json({
    user,
  });
});

module.exports = router;
