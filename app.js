const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000; // process.env.port||3000의 뜻은 process.env라른 객체에 port라는 설정이 있다면 그 속성을 사용하고 없다면 3000을 사용한다는 뜻이다.

//cors모듈 사용
// app.use(cors());
// origin: Front End ip or url
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use("*", cors());

const corsOption = {
  origin: "http://devel-rope.site/",
  // origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOption));

//스키마 연결
const connect = require("./schemas"); 
//db 연결
connect(); 

//Request 로그 남기는 미들웨어
const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

//바디로 들어온 제이슨 형태를 파싱
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestMiddleware);


//router 가져오기
const postRouter = require("./routes/post"); 
const commentRouter = require("./routes/comment"); 
const userRouter = require("./routes/user"); 

//Router 미들웨어 사용
app.use("/api", [postRouter]); 
app.use("/api", [commentRouter]); 
app.use("/api", [userRouter]);    // "/"라는 경로로 들어왔을때 userRouter실행

//uploads폴더안 파일을 url로 접근
//사용자가 upload파일 접근  url에 /uploads/123.png (사용자파일이름)
app.use('/uploads', express.static("uploads")); 
// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/upload.html");
});

app.listen(port, () => {
  console.log(port, ': 포트로 서버가 열렸어요!');
});