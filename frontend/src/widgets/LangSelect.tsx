import type { i18n } from "i18next";

import { Select, SelectItem } from "@heroui/select";
import { useTranslation } from "react-i18next";

import { changeLang, getLang } from "@/entities/utils/changeLang";

type Languages = {
  en: Properties;
  ru: Properties;
};
type Properties = {
  nativeName: string;
};

export default function LangSelect({ i18n }: { i18n: i18n }) {
  const { t } = useTranslation();
  const languages: Languages = {
    en: { nativeName: t("english") },
    ru: { nativeName: t("russian") },
  };

  return (
    <Select
      aria-labelledby="Language selection"
      className="w-40"
      defaultSelectedKeys={[getLang()]}
      placeholder={t("language")}
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
