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


## React Router
### Code Splitting
SPA 리액트 애플리케이션의 단점 -> 초기 실행 시간이 오래 걸림  
해결 방법 : 분할 로딩  
-> `<Suspense>`와 `<Lazy>`를 이용한 **코드 분할(Code Splitting)** 적용  
router > root.js

### 페이지 컴포넌트들의 레이아웃
React-Router를 이용하여 웹 페이지 간 이동처럼 컴포넌트 처리를 할 수 있다.  
`<Link>` 등으로 브라우저 새로 고침 최소화, 페이지 컴포넌트 간 이동 가능  
공통 레이아웃 템플릿을 구성하고, 메뉴 구조를 통해 재사용 가능한 링크 처리를 하도록 하자  
참고로 대부분의 경우 컴포넌트 파일의 경우에는 대문자로 파일명을 시작하며, 라우터 설정 파일 등과 같은 일반적인 js파일은 소문자로 시작한다.

#### <Link>를 통한 이동
리액트는 SPA로, 브라우저 주소창을 통해 컴포넌트 출력이 가능하다.  
주소창 변경은 애플리케이션 전체 로딩과 처리를 의미하며,  
SPA에서는 새 창 열거나 '새로고침' 주의해야 하기때문에 React-Router에서 **`<a>` 태그 사용을 피해야** 한다.  
components > menus > BasicMenu.js  

### 레이아웃 컴포넌트와 children
layouts > BasicLayout.js 컴포넌트 : 상단에 공통 메뉴와 링크, 아래로 페이지 컴포넌트 출력함  
-> 'children' 속성으로 컴포넌트 내부에 다른 컴포넌트 적용 가능하다.  

### 새로운 단위 기능과 라우팅
애플리케이션 컴포넌트가 증가하면 React-Router 설정과 메뉴 구조 복잡해진다.  
따라서 기능들을 묶어 '모듈'로 구성해야한다. (예: 게시판, 회원, 상품)  
각 모듈은 내부적으로 자체 메뉴를 가지며,  
React-Router의 `<Outlet>`을 활용하여 모듈의 경로 구성이 가능하다.  
pages > todo > IndexPage.js  


### 중첩 라우팅의 분리와 리다이렉션(Redirection)
하나의 라우팅 설정에서 children 속성으로 중첩 라우팅 설정이 가능하다.  
페이지가 많아지면 root.js 파일 복잡해지기때문에 별도의 함수로 뽑아내어 해당 속성값을 반환하는 방식을 사용하면 가독성을 향상시킬 수 있다.
router > todoRouter.js

### URL Params
pathVariable이 있는 경로의 경우 router에서의 선언은 ':'을 활용하도록 한다. (path: "read/:tno")  
router > todoRouter.js  

### 경로 처리를 위한 useParams()
React-Router의 useParams()을 활용하여 url에 있는 pathvariable값을 뽑아낼 수 있다.  
~~~js
const {tno} = useParams()
~~~
pages > todo > ReadPage.js  

### 쿼리스트링 처리를 위한 useSearchParams()
~~~js
const [queryParams] = useSearchParams()
const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
~~~
pages > todo > ListPage.js  


### useNavigate()
링크로 이동하는 경우가 아닌, 동적 데이터 처리로 경로를 이동하는 경우 useNavigate()를 활용  
pages > todo > IndexPage.js

### 동적 페이지 이동
수정/삭제 작업은 매번 다른 번호(tno)를 사용하는데 이러한 번호는 useParams()를 통해 동적으로 처리할 수 있다.  
pages > todo > ReadPage.js  

#### 참고 - React Code Snippet
rsf : 함수를 만들어줌  
[참고](https://www.hanl.tech/blog/vs-code-react-time-awesome-snippets/)


## 리액트와 API서버 통신  
json을 이용한 통신의 경우 axios를 활용하는게 편리하다.  
통신하는 부분은 따로 만드는게 편하기때문에 api라는 디렉토리를 따로 지정하도록 한다.  

### useEffect
컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있습니다. 또는 특정 state나 props 값이 변경될 때에만 작업을 수행하도록 설정할 수도 있다.  
함수형 컴포넌트가 하나 있고 이것을 호출할때 서버를 호출해서 결과를 가져올때까지 암것도 안하는데  
그러면 결과를 받아다가 상태처리를 하고 state처리 갱신이 됐으니까 다시한번 렌더링이 일어나면 되는것  

useEffect 비동기 통신을 할때 어떤 조건에서만 호출을 하는것으로
문제는 비동기일경우인데 서버호출해서 결과를 가져올동안 모든처리가 끝났는데 호출결과가 돌아와서 서버에서 받은 결과를 렌더링하기위해서 상태를 바꿔버리면  
컴포넌트는 다시 렌더링을 해야하니까 다시 처음부터 뿌려주게 되고  
그러면 다시 비동기 서버호출을 하게되면서 무한반복이 일어나는 문제  
이를 막기위해서 useState와 useEffect를 사용한다.  


pages 폴더는 라우팅 처리랑 나중에 컴포넌트를 조합하기위해 만들어놓은 공원같은것
실제로 객체지향 설계하듯이 정말 일을 하는부분은 컴포넌트..
그래서 components하위에 todo폴더를 만들어준다.

훅을 안쓰는 로직(컴포넌트)는 그냥 임포트 해서 쓰면 되는데
useState, useNavigate와 같이 훅을 쓰는 로직일 경우에 그 로직들을 갖다가 재사용하는 단위를 커스텀 훅이라고 한다. jsp의 include와 비슷하다고 생각하면 됨  


페이지 이동같은것을 하는 useNavigate를 사용하는 훅이라 useCustomMove


처음에 api서버랑 호출하는 부분 먼저 만들고
컴포넌트 만들고
페이지에다 붙이고
화면처리하는 순서대로 개발


동일 페이지 클릭시에 ajax통신이 이루어지지않아 새로고침을 해야하는 상황이 발생하게되는데
react에서 새로고침은 매우 주의해야할 행위이므로
동일페이지를 클릭하더라도 데이터를 새로 가지고올 수 있도록 해야함 -> useCustomMove.js refresh이용하여 토글방식으로 구성 가능

과거의 SSR방식에서는
post방식으로 전송하고 redirect시켜서 get으로 확인하는 PRG패턴을 사용하였다.
클라이언트에서 서버에 post방식으로 호출하고 서버에서 처리하면 httpHeader로 Location을 주면
그 주소를 get으로 이동을 했는데
SPA에서는 이렇게 처리가 되지않음.
경고창은 위험한게 기본적으로 js는 싱글스레드여서 js엔진의 모든것을 멈추겟다는 뜻이되어 아무것도 못하니까 가능하면 경고창은 안쓰는게 좋음
그래서 소위 모달창을 쓰는데 Add버튼을 클릭하면 결과값을 받고 결과데이터를 모달로 보여준다.
모달을 닫으면 후처리를 해준다.(주로 이동)


원래 get방식은 preflight 일어나지않는데 json데이터를 get방식으로 가지고올때 프리플라이트가 일어남