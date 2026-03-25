# 개발 태스크 리스트 (TaskList) - 단계별 가이드

이 가이드는 GDrive Linker를 처음부터 밑바닥부터 만드는 과정을 단계별로 설명합니다.

## 1단계: 프로젝트 설정
- [ ] 프로젝트 초기화: `npm create vite@latest gdrive-linker -- --template react-ts`
- [ ] 의존성 설치: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Tailwind 초기화: `npx tailwindcss init -p`
- [ ] `tailwind.config.js` 파일에 `./src/**/*.{js,ts,jsx,tsx}` 경로 포함 설정.
- [ ] `index.html`에 FontAwesome CSS 링크 추가.

## 2단계: 핵심 컴포넌트 및 레이아웃
- [ ] `App.tsx` 작성: 기본 플렉스 컨테이너 설정 (min-h-screen, flex-col).
- [ ] **Header**: 로고 및 "사용 방법" / "주의 사항" 내이게이션 구현.
- [ ] **Footer**: 기본 저작권 정보 추가.
- [ ] **WarningSection**: 사용 팁 및 공개 액세스 권한에 대한 안내 섹션 생성.

## 3단계: 변환 로직 구현
- [ ] **정규식(Regex) 연구**: 다양한 구글 드라이브 URL 형식을 처리할 수 있는 추출 함수 작성.
- [ ] **링크 생성**: 추출된 파일 ID를 기반으로 `directLink`, `recommendedLink`, `htmlTag`, `markdownTag` 변수를 생성하는 로직 작성.

## 4단계: 인터랙티브 UI 개발
- [ ] **Converter 컴포넌트**:
    - [ ] 아이콘이 포함된 스타일링된 입력 필드 생성.
    - [ ] 실시간으로 ID를 추출하고 상태를 업데이트하는 `onChange` 핸들러 구현.
    - [ ] 유효하지 않은 링크 입력 시 에러 메시지 표시 로직 추가.
- [ ] **ResultBox 컴포넌트**:
    - [ ] 제목, 링크 내용, "복사" 버튼을 표시하는 재사용 가능한 컴포넌트 작성.
    - [ ] "복사됨(Copied!)" 상태 피드백 구현.
- [ ] **안내 모달 (Instructional Modal)**: 
    - [ ] 구글 드라이브 권한 변경 방법을 설명하는 모달을 Header에 구현.
    - [ ] 부드러운 애니메이션 효과 추가 (백드롭 블러, 줌 인).

## 5단계: 이미지 미리보기 및 다듬기
- [ ] **미리보기 섹션**:
    - [ ] 변환된 결과를 보여주는 `<img>` 태그 추가.
    - [ ] 링크가 유효하지 않거나 비공개일 경우 플레이스홀더("이미지를 찾을 수 없음")를 보여주는 `onError` 핸들러 구현.
    - [ ] `referrerPolicy="no-referrer"` 적용.
- [ ] **스타일링 최적화**: 
    - [ ] Tailwind의 `space-y` 및 `p-6` 등을 사용하여 일관된 간격 유지.
    - [ ] "프리미엄" 느낌을 위해 그림자 효과와 둥근 모서리 적용.

## 6단계: 배포
- [ ] `vite.config.ts`에서 레포지토리 이름에 맞춰 `base` 경로 설정.
- [ ] GitHub Pages로 자동 배포하기 위한 GitHub Action 워크플로우(`.github/workflows/deploy.yml`) 생성.
- [ ] GitHub에 푸시하고 실시간 사이트 작동 확인.
