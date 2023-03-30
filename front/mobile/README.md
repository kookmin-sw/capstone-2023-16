# POSTONA

## 기술 구성

### 주요 기술 스택 : React Native, React Relay, Redux Toolkit

## 아키텍처 구성

### 루트

1. 루트 : 설정파일
2. android : 안드로이드 네이티브 구동 관련 파일
3. ios : ios 네이티브 구동 관련 파일
4. src : 앱 개발을 위한 typescript 파일
5. package.json : 프로젝트 기본 정보, 모듈
6. schema.graphql : grahql 스키마 정의 파일
7. babel.config.js : metro dev server가 바벨 통해 앱 코드 빌드
8. metro.config.js : 메트로 설정 파일
9. tsconfig.json : 타입스크립트 설정 파일
10. index.js : 앱 스타팅 포인트

### src

1. assets : 앱 개발을 위한 정적 자원(이미지, 폰트 등)
2. components : 컴포넌트 파일
3. constants : 상수 관련 파일
4. navigation : 페이지 navigation 관련 파일
5. screens : 앱 화면 파일
6. utils : 공통 함수 파일
7. App.tsx : 메인 화면 코드
8. RelayEnvironment.tsx : relay fetch 파일

### github flow

1. base branch : app-develop
