๐ Devel-rope 
=============
์ฝ๋์ ๋งค์ผ ๊ฐ์ด ์ธ์ํ๋ ๊ฐ๋ฐ์๋ค(Developers)์ ์ํ ํ๋์์ ๋ด๋ ค์จ ๋์์ค(rope) ๊ฐ์ ์ฑ! ๊ฐ๋ฐ์๋ค๋ผ๋ฆฌ ๋ค์ํ ์ง๋ฌธ์ ์ฌ๋ฆฌ๊ณ , ํธ๋ฌ๋ธ์ํ๋ ํ๊ณ , ๊ฐ์ข ์ง์์ ๊ณต์ ํ  ์ ์๋ ์ปค๋ฎค๋ํฐ ์๋๋ค. ๐<br><br>

![ํ์คํธ](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzTQqs%2Fbtrtwr4yP6U%2FCAmDLG3G9Nk9pe78oQA7nk%2Fimg.png "Devel-rope")<br><br><br><br>

## ![ํ์คํธ](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdyJwn8%2FbtrtAPpuDdu%2FKtweKbXYo9gHezNhVy33p1%2Fimg.png "Devel-rope_Logo")  <br>
- ๊ฐ๋ฐ์ ํ๋ค๊ฐ ๋ถ๋ชํ ๋ฌธ์ ๋ฅผ ๊ณต์ ํ๊ณ  ํด๋ต์ ๋น ๋ฅด๊ฒ ์ฐพ์ ์ ์์ต๋๋ค.
- ์๋ก์ ์ผ์์ ์์ ๋กญ๊ฒ ๊ณต์ ํ  ์ ์์ต๋๋ค.

## ๐์ ์ ๊ธฐ๊ฐ ๋ฐ ํ์ ์๊ฐ๐จโ๐ป๐ฉโ๐ป
2021-02-11 ~ 2021-02-17
- ๊น๋ฏผ์  minkimhere : ๋๊ธ ๋ฐ ์๋ฒ ๊ด๋ จ ๊ธฐ๋ฅ ๋ด๋น
- ์ฉ์ฃผ์ฑ tacocat3 : ๋ก๊ทธ์ธ/ํ์๊ฐ์ ๊ด๋ จ ๊ธฐ๋ฅ ๋ด๋น
- ๋ฐ์์ง suzyp0223 : ๊ฒ์๊ธ ๊ด๋ จ ๊ธฐ๋ฅ ๋ด๋น

## ๐Website
[์ฌ์ดํธ ๋ฐ๋ก๊ฐ๊ธฐ](http://devel-rope.site/)

## ๐ฌ๋ฐ๋ชจ ์์ ๋งํฌ
[๋ฐ๋ชจ์์ ๋ฐ๋ก๊ฐ๊ธฐ](https://youtu.be/LiMiTonWZqk)

## ๐๋ธ์ ์ค๊ณ ํ์ด์ง
[๋ธ์ ๋ฐ๋ก๊ฐ๊ธฐ](https://lofty-palladium-0d5.notion.site/2-SA-57c267cb80e8418791bd8e42a15d68d7)

## ๐์์ด์ด ํ๋ ์ 
![ํ์คํธ](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOclKv%2FbtrtACX4X7Z%2Fy8DQBJMYKMPLKQ9hVgww6k%2Fimg.png "์์ด์ดํ๋ ์")


## ๐ Back-end ๊ธฐ์  ์คํ ๋ฐ ๊ฐ๋ฐ ํ๊ฒฝ ๐จ
- JavaScript
- Node.js
- Express.js
- mongoose
- mongoose-sequence
- jsonwebtoken
- joi
- pbkdf2-password
- dotenv
- cors
- prettier

`DBMS`
 - mongoDB

`Deploy`
 - AWS EC2 (Ubuntu 18.04LTS)
 - AWS S3

 <br><br><br>
 ## ๐API ์์ธ

|                | Method | URL                                    | REQ                                           | RES    
|----------------|--------|----------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------|
|ํ์๊ฐ์ | POST | /api/join | { email: password: nickname: git: blog: blogtype: } | { โokโ: true, message: โํ์๊ฐ์ ์ฑ๊ณตโ } OR { โokโ: false, errorMessage:โํ์๊ฐ์ ์คํจโ }
|์ด๋ฉ์ผ ์ค๋ณต๊ฒ์ฌ | POST | /api/join/check | { email: } | { โokโ: true, message: โ์ฌ์ฉ๊ฐ๋ฅํ ์ด๋ฉ์ผ์๋๋ค.โ } OR { โokโ: false, errorMessage:โ์ด๋ฏธ ์ฌ์ฉ์ค์ธ ์ด๋ฉ์ผ์๋๋ค.โ }
|๋๋ค์ ์ค๋ณต๊ฒ์ฌ | POST | /api/join/check | { nickname: } |  { โokโ: true, message: โ์ฌ์ฉ๊ฐ๋ฅํ ๋๋ค์์๋๋ค.โ } OR { โokโ: false, errorMessage:โ์ด๋ฏธ ์ฌ์ฉ์ค์ธ ๋๋ค์์๋๋ค.โ }
|๋ก๊ทธ์ธ | POST | /api/login | { email: password: } | token: nickname: userId: userIcon: { 'ok':true, message:โ๋ก๊ทธ์ธ ์ฑ๊ณตโ } OR { โokโ: false, errorMessage:โ๋ก๊ทธ์ธ ์คํจโ }
|์ ์ฒด ํฌ์คํธ ๋ถ๋ฌ์ค๊ธฐ |  GET  | /api/post | | { 'ok': true, result: [{ //imgUrl: userId: userIcon: postId: nickname: content: //replyNumber: //like_cnt: date: }] }
|๋ค๋ฅธ ์ผ๋ถ ์ ์  ๊ด๋ จ ์ ๋ณด ๋ถ๋ฌ์ค๊ธฐ | GET | /api/user | { headers:{ authorization:token } headers: { "Authorization": Bearer ${localStorage.getItem("token")}, } | { 'ok': true, result: [{ userIcon: nickname: email: git: blog: }] }
|๋ค๋ฅธ ๋ชจ๋  ์ ์  ๊ด๋ จ ์ ๋ณด ๋ถ๋ฌ์ค๊ธฐ | GET | /api/users | { headers:{ authorization:token } headers: { "Authorization": Bearer ${localStorage.getItem("token")}, } | { 'ok': true, result: [{ userIcon: nickname: email: git: blog: }] }
|๋ด ๋ก๊ทธ์ธ ์ ๋ณด ๋ถ๋ฌ์ค๊ธฐ | GET | /api/auth |  { headers:{ authorization:token } headers: { "Authorization": Bearer ${localStorage.getItem("token")}, } | { 'ok': true, result: [{ email: userId: userIcon: nickname: }] }
|post ์์ฑ | POST | /api/post | { userId: nickname: content: userIcon: imgUrl: date: //comment_cnt: } | { โokโ: true, message: โ์์ฑ ์ฑ๊ณตโ } OR { โokโ: false, message:โ์์ฑ ์คํจโ }
|post ๋ถ๋ฌ์ค๊ธฐ | GET | /api/detail:/:postId | { postId: } | { โokโ: true, result: [{ content: nickname: userId: userIcon: imgUrl: date: postId: //comment_cnt: }] }
|post ์์ ํ๊ธฐ | PUT | /api/item/:postId | { content: userId: imgUrl: postId } | { โokโ: true, message: โ์์  ์ฑ๊ณตโ, } OR { โokโ: false, message:โ์์  ์คํจโ }
|post ์ญ์ ํ๊ธฐ | DELETE | api/item/:postId | { postId: } | { โokโ: true, message: โ์ญ์  ์ฑ๊ณตโ } OR { โokโ: false, message:โ์ญ์  ์คํจโ }
|comment ๋ถ๋ฌ์ค๊ธฐ | GET | /api/comment/:postId | { postId: } | { โokโ: true, result: [{ comment: userId: nickname: postId: commentId: userIcon: date: }] }
|comment ์์ ํ๊ธฐ | PUT | /api/comment/:commentId | { comment: } | { โokโ: true, message: โ์์  ์ฑ๊ณตโ } OR { โokโ: false, message:โ์์  ์คํจโ } 



<br><br><br>
## ๐ฌ Back-end
- ์ด๋ฒ ํ๋ก์ ํธ๋ ์ฃผํน๊ธฐ ์ฃผ์ฐจ๋ฅผ ๋ง์น๊ณ  ์ฒ์์ผ๋ก ํ๋ก ํธ์๋์ ๋ฐฑ์๋๋ก ๋๋ ์ ์งํํ ํ๋ก์ ํธ ์๋๋ค.
- ์ฐ์ ์ ์ผ๋ก ์ฃผํน๊ธฐ ์ฃผ์ฐจ์ ๋ฐฐ์ด ๊ธฐ๋ณธ์ ์ธ CRUD๊ธฐ๋ฅ์ ๊ตฌํ์ ์ง์คํ์๊ณ , ์ธ๋ถ์ ์ผ๋ก ๋ด์ค์ ๋ค์ง๋๋ฐ ์ง์คํ์์ต๋๋ค. 


**โ Why? JWT + Bearer ์ธ์ฆ ์ ํ **

๋ฐ๊ธํ JWT ํ ํฐ์ OAuth 2.0 ์ธ์ฆ์ผ๋ก ๋ฐ๊ธํ ์ก์ธ์ค ํ ํฐ์ด ์๋๊ธฐ ๋๋ฌธ์ ๊ณต์์ ์ผ๋ก ์ด ๋ฐฉ๋ฒ์ "๋นํ์ค" ๋ฐฉ์์ผ๋ก ๋ณผ ์ ์์ต๋๋ค. ๊ทธ๋ ์ง๋ง ํ ํฐ์ ํค๋๋ก ๊ตํ ํ  ๋ชฉ์ ์ผ๋ก ์ฌ์ฉํ  ์ธ์ฆ ์ ํ์ด Bearer๊ฐ ์ ์ผ ์ ์ ํ๋ค ์๊ฐํ์ฌ HTTP ์ธ์ฆ ์ ํ์ค, Bearer ํ์์ ์ฌ์ฉํ์ฌ ํ ํฐ์ ์ ๋ฌ ํ๋ ๋ฐฉ๋ฒ์ ์ฌ์ฉํ์์ต๋๋ค.

**โ Why? mongoDB**

1์ฐจ ๋ชฉํ๋ฅผ ๊ธฐ๋ณธ CRUD ๊ธฐ๋ฅ ๊ตฌํ๊ณผ ํ๋ก ํธ์๋์ ๋ฐฑ์๋์ ์๋ฆ๋ค์ด ํ์์ผ๋ก ํ์๊ณ  ์ถํ์ ๊ธฐ๋ฅ์ ์ถ๊ฐํ  ๊ณํ์ ์ธ์ ๋ ์ ํฌ ํ๋ก์ ํธ์์ RDBMS์ ๋ค๋ฅด๊ฒ ์์ ๋ก์ด ๋ฐ์ดํฐ ๊ตฌ์กฐ๋ฅผ ์ก์ ์ ์๋ค๋ ํน์ง์ด ์๋ Document ๊ธฐ๋ฐ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ธ mongoDB๊ฐ ๊ฐ์ฅ ์ ํฉํ๋ค ํ๋จํ์์ต๋๋ค.

**โ Why? dotenv**

๋ธ์ถ๋๋ฉด ๋ณด์์ ์ํ์ ์ธ ํ๊ฒฝ๋ณ์๋ค์ ํ๊ณณ์ ๋ชจ์ ๊ด๋ฆฌํ์ต๋๋ค.
