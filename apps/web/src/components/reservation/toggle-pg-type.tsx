"use client"
import { Clock, LucideIcon, Map } from "lucide-react";
import { Flex, RadioCards } from "@radix-ui/themes";

type QuoteKeyValueType = {
  label: string;
  value: string;
  icon: LucideIcon;
};
const QUOTE_TYPE: QuoteKeyValueType[] = [
  {
    label: "Transfer",
    value: "transfer",
    icon: Map,
  },
  {
    label: "Hourly",
    value: "hourly",
    icon: Clock,
  },
];

export function TogglePQType() {
  return (
    <div>
        <RadioCards.Root defaultValue="transfer" size="1">
          <Flex align="center" gap="3">
          {QUOTE_TYPE.map((item, i) => {
            const Icon = item.icon;
            return (
              <RadioCards.Item key={i} value={item.value.toString()}>
                <Icon size={18} />
                <span>{item.label}</span>
              </RadioCards.Item>
            );
          })}
          </Flex>
        </RadioCards.Root>
    </div>
  );
}
