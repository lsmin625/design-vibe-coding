# 서비스 기획자를 위한 바이브 코딩

## 프로젝트 디렉토리 구조

| 경로 | 설명 | 주요 파일/폴더 예시 |
|---|---:|---|
| / (루트) | 프로젝트 최상위, 설정과 문서 보관 | README.md, package.json, .gitignore |
| /src | 애플리케이션 소스 코드 | index.js, app/, components/, hooks/ |
| /public | 정적 자원(웹 프로젝트) | index.html, favicon.ico, assets/ |
| /design | 디자인 자산 및 가이드 | Figma 링크, 디자인-시스템.md, 아이콘/ |
| /docs | 기획 문서 및 기술 문서 | requirements.md, api.md, 릴리스노트/ |
| /tests | 단위/통합 테스트 코드 | unit/, integration/, jest.config.js |
| /scripts | 빌드·배포·유틸 스크립트 | build.sh, deploy.sh, migrate/ |
| /build 또는 /dist | 빌드 결과물(배포용) | 번들 파일들 |
| /configs | 설정 파일 모음 | webpack.config.js, eslint/, prettier/ |

간단 설명:
- src는 실제 개발자가 수정하는 주요 코드 공간입니다.
- design 폴더는 서비스 기획자와 디자이너가 함께 참고하는 자산을 둡니다.
- docs에 기획서와 API 명세를 유지하면 협업과 온보딩이 쉬워집니다.
- scripts와 configs는 자동화와 코드 품질을 위한 도구를 정리합니다.
- 필요에 따라 경로와 세부 항목은 프로젝트 특성에 맞게 조정하세요.