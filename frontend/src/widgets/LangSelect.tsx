import type { i18n } from "i18next";

import { Select, SelectItem } from "@heroui/select";

import { changeLang, getLang } from "@/entities/utils/changeLang";

type Languages = {
  en: Properties;
  ru: Properties;
};
type Properties = {
  nativeName: string;
};

export default function LangSelect({ i18n }: { i18n: i18n }) {
  const languages: Languages = {
    en: { nativeName: "English" },
    ru: { nativeName: "Russian" },
  };

  return (
    <Select
      aria-labelledby="Language selection"
      className="w-40"
      defaultSelectedKeys={[getLang()]}
      placeholder="Language"
      value={getLang()}
      onSelectionChange={(value) => {
        i18n.changeLanguage(value as string);
        changeLang(value as { currentKey: string });
      }}
    >
      {Object.keys(languages).map((lang) => {
        const typedLang = lang as keyof typeof languages;

        return (
          <SelectItem key={typedLang}>
            {languages[typedLang].nativeName}
          </SelectItem>
        );
      })}
    </Select>
  );
}
