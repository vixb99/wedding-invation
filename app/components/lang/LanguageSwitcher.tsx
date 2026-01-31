"use client";

import { useLanguage } from "../lang/LanguageContext";


export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-white/80 backdrop-blur-md rounded-full px-2 py-1 shadow-md">
      <LangBtn active={lang === "vi"} onClick={() => setLang("vi")}>
        VN
      </LangBtn>
      <LangBtn active={lang === "en"} onClick={() => setLang("en")}>
        EN
      </LangBtn>
      <LangBtn active={lang === "zh"} onClick={() => setLang("zh")}>
        繁體
      </LangBtn>
    </div>
  );
}

function LangBtn({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full transition
        ${
          active
            ? "bg-[#b8926c] text-white"
            : "text-[#b8926c] hover:bg-[#f3ebe3]"
        }`}
    >
      {children}
    </button>
  );
}
