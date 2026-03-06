import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { customId } from "@/entities/utils/createCustomId";
import { useParams } from "react-router-dom";

import useCustomID from "@/entities/hooks/useCustomID";

export default function CustomID() {
  const { t } = useTranslation();
  const { inventoryId } = useParams();
  const { customId } = useCustomID(inventoryId as string);

  const elements: { key: TRandomID; label: string }[] = [
    { key: "20-bit", label: t("twentyBitRandom") },
    { key: "32-bit", label: t("thirtyTwoBitRandom") },
    { key: "6-digit", label: t("sixDigitRandom") },
    { key: "9-digit", label: t("nineDigitRandom") },
    { key: "guid", label: t("guid") },
    { key: "sequence", label: t("sequence") },
    { key: "date", label: t("date") },
  ];

  const [selects, setSelects] =
    useState<{ key: TRandomID; value: string }[]>(customId);
  const preview = selects.map((selected) => {
    return selected.value;
  });

  return (
    <section>
      <div className="flex flex-col items-start gap-2 container">
        {selects.map((select, idx) => (
          <label key={idx} className="flex items-center gap-4 w-1/2">
            <Select
              aria-label="select-box"
              className="max-w-xs"
              selectedKeys={[select.key]}
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0] as TRandomID;

                setSelects((prev) => {
                  if (key) {
                    const copy = [...prev];

                    copy[idx] = {
                      key,
                      value: String(customId[key]()),
                    };

                    return copy;
                  }

                  return prev;
                });
              }}
            >
              {elements.map((element) => {
                return (
                  <SelectItem key={element.key} aria-label="select-item">
                    {element.label}
                  </SelectItem>
                );
              })}
            </Select>

            <Input
              type="text"
              value={select.value}
              onChange={(e) => {
                const value = e.target.value;

                setSelects((prev) => {
                  const copy = [...prev];

                  copy[idx].value = value;

                  return copy;
                });
              }}
            />
          </label>
        ))}
        <div className="flex gap-2 py-4">
          <Button
            onClick={() =>
              setSelects((prev) => [
                ...prev,
                {
                  key: "20-bit",
                  value: String(customId["20-bit"]()),
                },
              ])
            }
          >
            {t("add")}
          </Button>
          <Button
            className="bg-primary"
            hidden={!selects.length}
            onClick={() => {}}
          >
            {t("save")}
          </Button>
        </div>
        <p className="text-lg!">
          {selects.length ? "ITEM" + preview.join("-") : false}
        </p>
      </div>
    </section>
  );
}
