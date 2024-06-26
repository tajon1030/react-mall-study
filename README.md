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

#### `<Link>`를 통한 이동
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
~~~
npm install axios
~~~
통신하는 부분은 따로 만드는게 편하기때문에 api라는 디렉토리를 따로 지정하도록 한다.  
todo / todoApi.js  

#### 개발 순서
처음에 api서버랑 호출하는 부분 먼저 만들고  
컴포넌트 만들고  
페이지에다 붙이고  
화면처리하는 순서대로 개발  
(pages 폴더는 라우팅 처리랑 나중에 컴포넌트를 조합하기위해 만들어놓은 공원같은것
실제로 객체지향 설계하듯이 정말 일을 하는부분은 컴포넌트)

### useEffect
컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있으며,  
또는 특정 state나 props 값이 변경될 때에만 작업을 수행하도록 설정할 수도 있다.  

컴포넌트 상태 변경 시 렌더링과 함께 axios 함수를 재호출하여 무한루프가 생기지않도록 조심해야한다.  
~~~js
// 사용예시
useEffect(()=>{
    ...
},[]) // 두번째 인자로 준 값이 변경될때에만 작업이 수행되도록 할 수 있다. 빈 배열을 줄 경우 처음 렌더링할때에만 수행


useEffect(()=>{
    ...
})  // 두번째 인자를 아예 주지 않으면 렌더링할때마다 수행
~~~

### 커스텀 훅
컴포넌트를 만들 때 반복되는 로직이 생길 경우  
훅을 안쓰는 로직(컴포넌트)는 그냥 임포트 해서 쓰면 되지만,  
useState, useNavigate와 같이 훅을 쓰는 로직일 경우에는 커스텀 훅을 만들어서 재사용 할 수 있다.  
(jsp의 include와 비슷하다고 생각하면 됨)  

hooks / useCustomMove.js (페이지 이동을 위한 useNavigate를 사용하는 훅)


### 목록 데이터 처리 - 동일 페이지 클릭 시 문제
동일 페이지 클릭시에 ajax통신이 이루어지지않아 새로고침을 해야하는 상황이 발생하게되는데  
react에서 새로고침은 매우 주의해야할 행위이므로  
동일페이지를 클릭하더라도 데이터를 새로 가지고올 수 있도록 해야한다.  
hooks / useCustomMove.js (refresh이용하여 토글방식으로 구성)  

### 모달 처리
입력처리의 경우 과거의 SSR방식에서는 post방식으로 전송 -> redirect -> get으로 확인하는 PRG패턴을 사용하였다.  
클라이언트에서 서버에 post방식으로 호출하고, 서버에서 처리뒤 httpHeader로 Location을 주면 그 주소를 get으로 이동을 했는데, SPA에서는 이렇게 처리가 되지않는다.  
또한 기본적으로 js는 싱글스레드여서 alert의 경우는 js엔진의 모든것을 멈추겟다는 뜻이되어 아무것도 못하기때문에 가능하면 경고창은 안쓰는게 좋다.  
이제부터는 모달창으로 처리를 하도록 하자!  

#### 모달 처리 흐름
입력내용 작성 후 Add버튼을 클릭하면 서버로부터 결과값을 받고 결과데이터를 모달로 보여준다  
-> 모달을 닫으면 후처리를 해준다.(주로 이동)  


#### 참고
원래 get방식은 preflight 일어나지않는데 json데이터를 get방식으로 가지고올때(application/json) 프리플라이트가 일어남  

## 리덕스 툴킷  
### 리덕스 Redux
리액트는 App.js를 루트로해서 컴포넌트를 중심으로 뭔가가 만들어지며,  
이때 어떻게 데이터를 주고받을까가 문제가 됨.  
=> 한 컴포넌트에서 상태를 변경했을때 다른컴포넌트까지 영향을 주는 문제가 발생  
~~(이러한경우 컨텍스트를 사용하기도하지만)~~  
=> 리덕스는 여러컴포넌트들이 같이사용하는 데이터에대해 처리해줄수있는 상태기능을 제공하여 문제를 해결한다.   
(ex-로그인같이 어플리케이션이 유지해야하는 상태데이터)  
~~~
 npm install @reduxjs/toolkit react-redux
 ~~~

#### 스토어
리덕스툴킷을 사용할때 제일먼저 설정해줘야하는것은 **스토어**(데이터를 보관해주는 공간, 금고)  
상위코드인 index.js에서 Provider를 이용하여 적용한다.  
configureStore을 이용  
src / store.js  

#### 리듀서
금고지기.  
기존의 상태를(예시에서는 initState의 이메일이 비어있는 상태) 어떻게 바꿀것인지 다음 결과값을 리턴해주는 함수  
createSlice를 이용  
slice안에는 reducer가 있고, 유지해야하는 값이 있음  
src / slices / loginSlice.js (리액트에서는 컴포넌트가 아닌이상 소문자로 시작)  

#### useDispatch
발행  
뿌리는것.  
로그인을 했을때(버튼을 눌렀을때) 로그인 내역을 컴포넌트 전체의 상태데이터로 바꿔줄때 사용  
src / components / member / LoginComponent.js, LogoutComponent.js  

#### useSelector
구독  
src / components / menu / BasicMenu.js

#### createAsyncThunk
loginSlice에서 memberApi에 있는 loginPost를 호출할때 createAsyncThunk를 이용하여 데이터를 가지고옴  
추가적으로 extraReducer를 이용하여 상태를바꿔줄수있도록함  
src / slices / loginSlice.js  

#### 로그인 커스텀훅
src / hooks / useCustomLogin.js  

### 쿠키를 활용한 로그인
새로고침하면 상태가 날아가기때문에 쿠키를 활용  
~~~
npm install react-cookie
~~~
쿠키는 문자열이기때문에 json.stringify를 사용해야한다는점을 주의  
util / cookieUtil.js  
src / slices / loginSlice.js  

### axios interceptors를 활용
request나 response를 보내기 전이나 실패했을경우에 인터셉트하는 기능  
product나 todo의 경우(액세스토큰을 써야하는 경우=로그인데이터가 필요한경우)에는 jwtAxios를 사용하고,  
그렇지않은경우는 단순 axios를 사용하면 됨  
util / jwtUtils.js

## 리액트 소셜 로그인
### 카카오 애플리케이션 설정  
1. 인가코드(카카오에 접근을 위한 코드) 얻어오는 단계  
화면에 카카오로그인이 떠서 로그인을 하면 리다이렉트URI로 인가코드 전달해줌  
(백으로 리다이렉트uri를 받을수도있고 프론트앱에서 받을수도 있음)  
2. Access토큰을 얻어오게됨  
3. Access토큰을 이용해서 사용자 정보를 얻어옴  

123을 리액트에서할까 api서버에서할까의 고민...  
쇼핑몰구현시 배송지라던가 이런저런 추가정보들이 필요하기때문에 백에서도 사용자에 대한 정보가 필요함  
여기서는 1.2는 리액트에서 구현하고 3을 백에서 구현할 예정...  

react : 로그인화면 -> 카카오화면 -> redirectURI -> 카카오로 액세스토큰 얻어오는 호출  
spring : -> 액세스토큰으로 사용자 정보를 얻어오기  
react : -> 얻어온 새로운 회원데이터(refreshToken, accessToken) 쿠키에 담기

## React Query와 Recoil
### 리액트쿼리
비동기화된 상태관리  
https://tanstack.com/query/v5/docs/framework/react/installation  
~~~
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
~~~
리액트쿼리도 전체 어플리케이션의 상태를 관리하기때문에 전체어플리케이션에 해당하는 설정에 추가를 해줘야함  
index.js or App.js에 추가  
리액트가 동작할때 queryClient도 초기화가 된다.  
디버깅을위해 DevTools를 이용한다.  
~~~js
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={root}/>
      <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
~~~
src / App.js  


그동안의 비동기 데이터를 관리한 방식 :  
1. 데이터의 선언  
2. useEffect에서 처리한 비동기 데이터를 셋팅함  
ex) ReadComponent.js  
~~~
// 1. 선언
const [product, setProduct] = useState(initState);

// 2. 데이터 셋팅
useEffect(()=>{
  getOne(pno).then(data => {
    setProduct(data);
  })
}, [pno]);
~~~  

리액트 쿼리를 사용하는 방식 :
useQuery를 사용  
리액트쿼리는 어플리케이션 전체에서 사용하는 상태관리로서 어떻게 키(queryKey)를 관리하느냐가 큰 이슈로 일반적으로 api설계하듯 함  

상품 목록조회는 동일한 페이지 처리때문에 단건조회랑 약간의 차이점이 있음  
-> 동일한 페이지를 다시조회했을때 쿼리키가같기때문에 다시조회를 하지않는 것때문에  
이를 해결하기위해서 invalidate Query를 사용하곤하는데, 여기서는 refresh를 queryKey에 추가하여 사용하도록 함  
~~~js
    const queryClient = useQueryClient();
    const handleClickPage = (pageParam) => {
        if(pageParam.page === parseInt(page)){
            queryClient.invalidateQueries("products/list");
        }
        
        moveToList(pageParam);
    }
~~~

- useMutation : insert, update, delete 같이 데이터를 변경하고싶을경우 사용  
- **useQuery** : select 조회할때 사용  

useMutation은 값을 보관하지않기때문에 queryKey가 없음  
ex) product / AddComponent.js  

### Recoil
컴포넌트에서 어떤 상태를 만들고 사용하기위해 지금까지 useState를 사용했다면,  
그걸 atom으로 만든다고 생각하면 됨  
state를 만들어놓고 get,set하는것  

설치  
~~~
npm install recoil
~~~

index.js에서 `<RecoilRoot>`로 `<App>`을 감싸준다.  
리코일에서는 atom이라는것을 만드는데 key와 default값만 주면됨  
src / atoms / signinState.js  
cartState.js  

사용할 때에는 `useRecoilValue()`, `useSetRecoilState()` 을 사용하면 된다.  
예제에서는 리덕스 툴킷을 걷어내고 리코일을 사용하는 방식으로 전환할것임  
src / hooks / useCustomLogin.js  
BasicMenu.js  
KakaoRedirectPage.js  
useCustomCart.js, CartComponent.js  
