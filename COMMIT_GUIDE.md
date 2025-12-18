# 웹페이지 수정 및 배포 가이드

SugarMacro 웹사이트를 수정하고 GitHub Pages에 배포하는 방법입니다.

---

## 📁 파일 구조

```
web_landing/
├── index.html      # 메인 페이지
├── usage.html      # 매뉴얼 페이지
├── download.html   # 다운로드 페이지
├── community.html  # 커뮤니티 페이지
├── css/
│   └── style.css   # 스타일시트
└── js/
    └── main.js     # JavaScript
```

---

## 🚀 수정 후 배포 방법

### 1. 변경 사항 확인
```bash
cd web_landing
git status
```

### 2. 변경 파일 스테이징
```bash
# 모든 변경 파일 추가
git add .

# 또는 특정 파일만 추가
git add download.html
git add css/style.css
```

### 3. 커밋 메시지 작성
```bash
git commit -m "버전 설명"
```

**커밋 메시지 예시:**
- `fix: 다운로드 링크 수정`
- `feat: 새 기능 페이지 추가`
- `style: CSS 스타일 개선`
- `docs: 매뉴얼 내용 업데이트`

### 4. GitHub에 푸시
```bash
git push origin main
```

### 5. 배포 확인
- GitHub Pages는 푸시 후 약 1-2분 내에 자동 배포됩니다.
- 배포 상태 확인: GitHub 리포지토리 → **Settings** → **Pages**
- 웹사이트: https://solipkk.github.io/sugarm-web/

---

## ⚡ 빠른 배포 (한 줄 명령어)

```bash
git add . && git commit -m "update: 웹페이지 업데이트" && git push origin main
```

---

## 🔄 배포 안될 때 체크리스트

1. **GitHub 리포지토리 확인**
   - Settings → Pages → Source가 `main` 브랜치로 설정되어 있는지 확인

2. **빌드 상태 확인**
   - Actions 탭에서 빌드 실패 여부 확인

3. **캐시 문제**
   - 브라우저 캐시 삭제 후 새로고침 (`Ctrl+Shift+R`)

4. **파일명 확인**
   - GitHub Pages는 `index.html`을 기본 페이지로 인식

---

## 📝 자주 수정하는 항목

| 수정 내용 | 파일 | 위치 |
|-----------|------|------|
| 다운로드 링크 | `download.html` | 42번째 줄 `href` 속성 |
| 버전 정보 | `download.html` | 38번째 줄 |
| 릴리즈 노트 | `download.html` | 80~88번째 줄 |
| 네비게이션 | 모든 `.html` | `<nav>` 섹션 |
