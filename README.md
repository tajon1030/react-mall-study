# 코드로 배우는 React with 스프링부트 api 서버
인프런의 코드로 배우는 React with 스프링부트 api 서버 강의를 듣고 학습한 내용입니다.

## 초기셋팅
### react 설치
[공식문서](https://react.dev/learn/start-a-new-react-project#nextjs-pages-router)  
~~~
npx create-react-app mall
~~~

### tailwind 설치
[공식문서](https://tailwindcss.com/docs/guides/create-react-app)  
~~~
npm install -D tailwindcss
npx tailwindcss init
~~~
tailwind.config.js 수정  
src/index.css를 수정  

### 실행
~~~
npm start 
~~~
default 3000포트로 실행


## React Router 설정
### Code Splitting
SPA 리액트 애플리케이션의 단점 -> 초기 실행 시간이 오래 걸림  
해결 방법 : 분할 로딩  
-> <Suspense>와 <Lazy>를 이용한 **코드 분할(Code Splitting)** 적용  
router > root.js

### 페이지 컴포넌트들의 레이아웃
React-Router를 이용하여 웹 페이지 간 이동처럼 컴포넌트 처리  
<Link> 등으로 브라우저 새로 고침 최소화, 페이지 컴포넌트 간 이동 용이  
공통 레이아웃 템플릿 구성, 메뉴 구조로 재사용 가능한 링크 처리  

#### <Link>를 통한 이동
리액트는 SPA로, 브라우저 주소창을 통해 컴포넌트 출력이 가능하다.  
주소창 변경은 애플리케이션 전체 로딩과 처리를 의미  
SPA에서는 새 창 열거나 '새로고침' 주의해야 하기때문에 React-Router에서 <a> 태그 사용을 피해야 함  
components > menus > BasicMenu.js  

### 레이아웃 컴포넌트와 children
layouts > BasicLayout.js 컴포넌트 : 상단에 공통 메뉴와 링크, 아래로 페이지 컴포넌트 출력함  
-> 'children' 속성으로 컴포넌트 내부에 다른 컴포넌트 적용 가능하다.  

### 새로운 단위 기능과 라우팅
→ 애플리케이션 컴포넌트가 증가하면 React-Router 설정과 메뉴 구조 복잡해짐.
→ 기능들을 묶어 '모듈'로 구성(예: 게시판, 회원, 상품).
→ 각 모듈은 내부적으로 자체 메뉴를 가짐.
→ React-Router의 <Outlet>을 활용하여 모듈의 경로 구성.

#### 참고 - React Code Snippet
rsf : 함수를 만들어줌
[참고](https://www.hanl.tech/blog/vs-code-react-time-awesome-snippets/)