# 기술 요구사항 정의서 (TRD) - GDrive Linker

## 1. 기술 스택
- **프레임워크**: React (v18+) 및 TypeScript.
- **빌드 도구**: Vite.
- **스타일링**: 유틸리티 우선 디자인 및 반응형 레이아웃을 위한 Tailwind CSS.
- **아이콘**: FontAwesome (CDN 또는 라이브러리 활용).
- **배포**: GitHub Pages (GitHub Actions 사용).

## 2. 아키텍처 및 컴포넌트
애플리케이션은 모듈형 컴포넌트 기반 아키텍처를 따릅니다:
- `App.tsx`: 전체 레이아웃을 관리하는 루트 컴포넌트.
- `Header.tsx`: 내비게이션 바 및 "사용 방법" 모달 상태 포함.
- `Converter.tsx`: 핵심 로직 컴포넌트.
    - 입력 상태 관리 및 정규 표현식 기반의 파일 ID 추출.
    - 다양한 변환 결과물 생성.
    - 이미지 미리보기 상태 및 에러 핸들링 관리.
- `ResultBox.tsx`: 변환된 링크와 복사 버튼을 표시하는 재사용 가능한 UI 컴포넌트.
- `WarningSection.tsx`: 주의 사항 및 팁을 제공하는 정적 정보 컴포넌트.
- `Footer.tsx`: 저작권 및 외부 링크를 포함한 푸터.

## 3. 핵심 로직: 링크 변환
### 파일 ID 추출
정규 표현식을 사용하여 입력된 URL에서 파일 ID를 캡처합니다:
```typescript
const regex = /(?:\/file\/d\/|\/d\/|id=)([\w-]{25,})/;
```

### URL 생성 패턴
1. **Direct URL**: `https://drive.google.com/uc?id=${fileId}`
2. **Recommended (Bypass)**: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    - *참고*: 마크다운 및 노션에서 더 나은 안정성을 위해 Thumbnail API를 사용합니다.

## 4. 주요 기술적 요구사항
- **클립보드 관리**: 브라우저 기본 복사 기능을 지원하기 위해 `navigator.clipboard.writeText`를 사용합니다.
- **이미지 참조 정책**: 구글 드라이브 자산과의 교차 출처 문제를 최소화하기 위해 미리보기 이미지는 `referrerPolicy="no-referrer"`를 설정합니다.
- **애니메이션**: Tailwind 클래스 또는 `tailwindcss-animate`를 사용하여 미묘한 전환 효과(예: "fade-in", "zoom-in")를 구현합니다.
- **상태 관리**: React의 `useState` 및 `useEffect`로 충분하며, 이 프로젝트 규모에서는 Redux나 Zustand 같은 무거운 전역 상태 관리는 필요하지 않습니다.

## 5. 보안 및 성능
- **클라이언트 사이드 전용**: 별도의 서버 처리가 필요 없어 개인정보 보호와 속도가 보장됩니다.
- **지연 로딩 (Lazy Loading)**: 에셋과 폰트를 효율적으로 로드합니다.
- **SEO**: 제목과 설명을 위한 기본적인 메타 태그를 적용합니다.

## 6. 배포 워크플로우
- `.github/workflows/deploy.yml`을 통한 CI/CD 파이프라인 구축.
- `main` 브랜치에 푸시될 때마다 `dist` 폴더를 `gh-pages` 브랜치로 자동 빌드 및 배포합니다.
