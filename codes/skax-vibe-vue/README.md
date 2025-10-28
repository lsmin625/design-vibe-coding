# Vue 프로젝트 구현하기

- Vue 3와 Bootstrap 5를 사용하는 SPA(Single Page Application)
- Vite를 빌드 도구로 사용하고 있으며, 라우팅을 위해 Vue Router를 활용

## 프로젝트 폴더 구조

| 경로                | 설명                                      |
|---------------------|-------------------------------------------|
| `/.vscode/`         | VS Code 설정 디렉토리                    |
| `/public/`          | 정적 리소스 파일 디렉토리                |
| `/src/`             | 소스코드 디렉토리                        |
| `/src/main.js`      | Vue 앱 엔트리포인트 (부트스트랩/라우터 설정) |
| `/src/App.vue`      | 루트 Vue 컴포넌트                        |
| `/src/router.js`    | Vue Router 설정                          |
| `/src/pages/`       | 페이지 컴포넌트 디렉토리                 |
| `/src/sample-pages/`| 샘플 페이지 컴포넌트 디렉토리            |
| `index.html`        | 메인 HTML 템플릿 파일                    |
| `package-lock.json` |  `package.json`과 함께 작동하며, 의존성 관리의 일관성을 보장 |
| `package.json`      | 프로젝트 메타데이터 및 의존성 정의        |
| `.gitignore`        | Git 무시 파일 목록                       |
| `README.md`         | 프로젝트 문서                            |
| `vite.config.js`    | Vite 빌드 설정 파일                      |
