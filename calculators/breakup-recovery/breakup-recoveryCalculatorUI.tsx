"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function BreakupRecoveryCalculatorUI() {
  const [contact, setContact] = useState(3); // 최근 2주 연락 횟수
  const [tone, setTone] = useState("neutral"); // 마지막 대화 분위기
  const [reason, setReason] = useState("light"); // 이별 사유

  const toneScoreMap: Record<string, number> = {
    positive: 25,
    neutral: 15,
    negative: 5,
  };

  const reasonScoreMap: Record<string, number> = {
    light: 35,   // 사소한 다툼
    mid: 20,     // 가치관/라이프스타일 차이
    heavy: 5,    // 바람, 폭언 등 심각한 사유
  };

  const contactScore = Math.min(contact * 3, 30); // 연락횟수 점수 Max 30
  const toneScore = toneScoreMap[tone] || 10;
  const reasonScore = reasonScoreMap[reason] || 10;

  let total = contactScore + toneScore + reasonScore;
  if (total > 100) total = 100;

  const resultMessage =
    total >= 75
      ? "🔥 재회 가능성이 매우 높아요! 감정의 끈이 아직 많이 남아 있어요."
      : total >= 50
      ? "🙂 가능성 있어요. 천천히 대화를 이어가 보는 게 좋아요."
      : total >= 30
      ? "😕 낮은 편이지만 완전히 불가능한 건 아니에요. 개선 포인트를 찾는 게 중요해요."
      : "💔 지금은 가능성이 낮아요. 시간을 두고 서로 감정의 회복을 기다려보세요.";

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-pink-600">
        이별 복구 가능성 계산기
      </h1>

      <p className="text-gray-600 mb-6 leading-relaxed">
        최근 연락 빈도, 대화 분위기, 이별 사유 등을 기반으로
        <strong> 재회 가능성 점수(0~100)</strong>를 분석합니다.
      </p>

      {/* 입력 */}
      <div className="space-y-4 bg-white p-4 rounded-lg border shadow-sm">
        <Input
          label="최근 2주 연락 횟수"
          value={contact}
          onChange={setContact}
        />

        <div>
          <label className="block text-sm font-medium">마지막 대화 분위기</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="positive">긍정적 (웃음, 좋은 분위기)</option>
            <option value="neutral">무난함 (건조한 톤)</option>
            <option value="negative">부정적 (차가움, 날카로움)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">이별 사유</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="light">사소한 다툼 / 오해</option>
            <option value="mid">성향 차이 / 거리 문제</option>
            <option value="heavy">바람 / 폭언 / 큰 갈등</option>
          </select>
        </div>
      </div>

      {/* 결과 */}
      <ResultBox
        title="재회 가능성 분석 결과"
        results={[
          { label: "재회 확률", value: `${total}%` },
          { label: "해석", value: resultMessage },
        ]}
      />
    </div>
  );
}
