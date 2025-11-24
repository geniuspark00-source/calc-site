// lib/gtag.ts

// GA4 측정 ID — 환경변수에서 자동으로 불러옴
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// 기본 전역 타입 선언 (window.gtag)
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * 🔵 기본 이벤트 전송 함수
 * action = 이벤트 이름
 * category = 분류
 * label = 설명
 * value = 수치
 */
export const gtagEvent = ({
  action,
  category,
  label,
  value,
  ...rest
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
};

/**
 * 🔵 페이지뷰 전송 함수 (선택)
 * Next.js router 이벤트와 함께 사용 가능
 */
export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
