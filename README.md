# 🖼️ 구글 드라이브 이미지 직링크 변환기 (Google Drive Image Direct Link Converter)

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

구글 드라이브의 이미지 공유 링크를 웹사이트, 블로그, 마크다운 등에서 바로 사용할 수 있는 **직접 링크(Direct Link)**로 변환해주는 웹 어플리케이션입니다.

## ✨ 주요 기능

- **즉시 변환**: 다양한 형식의 구글 드라이브 공유 링크에서 파일 ID를 자동으로 추출하여 변환합니다.
- **다양한 출력**: 
  - 직접 URL (Direct URL)
  - HTML `<img>` 태그
  - 마크다운 (Markdown) 이미지 코드
- **이미지 미리보기**: 변환된 링크가 정상적으로 작동하는지 즉석에서 확인할 수 있습니다.
- **유연한 디자인**: 테일윈드 CSS를 사용한 깔끔하고 반응형인 UI를 제공합니다.

## 🛠️ 기술 스택

- **Core**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)

## 🚀 시작하기

### 로컬 실행 방법

이 프로젝트를 로컬 환경에서 실행하려면 Node.js가 설치되어 있어야 합니다.

1. **저장소 클론 및 패키지 설치**:
   ```bash
   npm install
   ```

2. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

3. **브라우저 확인**:
   기본적으로 `http://localhost:5173`에서 실행됩니다.

## 🔗 관련 링크

- **AI Studio에서 보기**: [Drive Image Converter](https://ai.studio/apps/drive/1KqMDmt9hpzdinu6qfxxuYKD_Ptk3q74t)

## ⚠️ 주의사항

- 구글 드라이브 파일의 공유 설정이 **"링크가 있는 모든 사용자에게 공개"**로 되어 있어야 이미지가 정상적으로 표시됩니다.
- 이미지 파일이 아닌 경우에는 미리보기가 표시되지 않을 수 있습니다.
