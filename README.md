유튜브 클론코딩 인프런 강의
cd C:/Users/yu/Desktop/study/react\/inflearn/youtube



To use this application, 

1. make dev.js file inside config folder 
2. put mongoDB info into dev.js file 
3. Type  " npm install " inside the root directory  ( Download Server Dependencies ) 
4. Type " npm install " inside the client directory ( Download Front-end Dependencies )



# RDBMS - MongoDB 용어 비교
|Database  |  Database   |
|----------|-------------|
|Tables    |  Collections|
|Rows      |  Documents  |
|Columns   |  Fields     |


## Model 생성
### Video Collections
- writer
- title
- description
- privacy
- filePath
- category
- views
- duration
- thumnbnail

### Like Collections
- Like
  - userId
  - commentId
  - videoId
- Dislike
  - userId
  - commentId
  - videoId

### 주의 사항
- `const bcrypt = require("bcrypt") 이부분을    require("bcryptjs") `
- `const a = () => { return ... }  || => (...)`

## 추가 사항
- 댓글, 비디오 삭제/수정 기능 추가
- 날짜 정보 추가
- 최상위 댓글 빼고 더보기나 숨김 기능을 없애고 보이기엔 같은 depth로 변경
- 구독 페이지에 구독한 동영상 모두 보기 -> 구독한 사용자들을 list 하고 상세 페이지 만들기


<br><br><Br>

- https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0/lecture/29590?tab=curriculum