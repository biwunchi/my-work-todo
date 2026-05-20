# My Work To Do 📅

**개인 일정 관리 웹앱** — 캘린더, 주간, 일일 뷰로 task를 관리합니다.

## 기능
- 📅 **달력 뷰**: 월별 캘린더에서 task 미리보기
- 📊 **주간 뷰**: 월~일 그리드로 요일별 task 개수 표시
- 📝 **일일 뷰**: 선택 날짜의 모든 task 상세 조회
- ✅ **Task 관리**: 제목, 설명, 날짜, 우선순위 설정
- 🌙 **Dark/Light 모드**: localStorage에 저장
- 🔔 **자동 알림**: 3일전/2일전/1일전 (1일전은 매시간)
- 💬 **Discord 연동**: #개인비서역할 채널에 mention 알림

## 기술 스택
- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Real-time)
- **호스팅**: Vercel (자동 배포)
- **인증**: Supabase Auth (Google OAuth)

## 배포
자동 배포: GitHub main branch push → Vercel 감지 → 자동 빌드 및 배포

## 사용 방법
1. 웹앱 접속
2. 좌측 사이드바에서 "Add New Task" 입력
3. 달력/주간/일일 뷰에서 task 확인 및 수정
4. Discord #개인비서역할 채널에서 자동 알림 수신
