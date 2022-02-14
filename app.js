const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

//cors모듈 사용
// app.use(cors());
// origin: Front End ip or url
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use("*", cors());

const corsOption = {
  origin: "http://localhost:3000",
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


//정적파일 사용
app.use(express.static("static"));

//root 페이지 렌더링. URL에서 '/' Path로 요청이 오면 index.html연결
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(port, ': 포트로 서버가 열렸어요!');
});