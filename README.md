# typescript_typeORM_study
typescript와 typeORM을 공부하고 활용하기 위해 만든 간단한 게시판 프로젝트
### github-flow를 사용
dev브런치를 만들어 기능을 구현하고 구현 완료기 main branch에 merge
깃액션을 사용해 cd,cl를 구축하고 cl 통과시 Docker 사용해 배포 

### 게시판 주제 
책이나 웹 서핑을 하다보면 공감이 가는 글귀가 있습니다 
저는 이러한 글귀들을 분류하고 각 글귀에 댓글을 달아 이 글귀를 보았을때의 기분을 기록하는 서버를 만들려고 합니다 

### 사용스택
typescript, node.js, express, typeORM, redis, passport, PostgreSQL,
aws RDS, awsEC2, git action, docker
1차 완성 후 
docker-compose, nGrinder, grafana
2차 완성 후 
kubernetes

### 사용 tool 
postman, Visual studio code

### 세부계획
passport.js를 사용한 소셜로그인 및 로컬로그인
jwt를 사용해 로그인(리프래시토큰 및 CSRF 보호와 정책 기반 접근 제어를 구현)
회원가입시 pass 사용 본인인증

트랜잭션을 사용해보기 위해 댓글 작성시 게시글의 댓글 수를 업데이트 하고 댓글테이블에 새로운 컬럼을 추가합니다 

### 추후 계획
서버 완성 후 swift를 배우고 활용하기 위해 swift로 ios앱을 만들어 적용할 계획입니다
추후 nest.js를 적용할 계획입니다