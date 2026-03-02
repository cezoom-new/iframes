"use client";

import { set, unset } from "sanity";
import { Box, Card, Flex, Select, Stack, Text } from "@sanity/ui";
import React from "react";

type ListOption = { title: string; value: string };

export function CtaButtonColorInput(props: any) {
  const { value, onChange, schemaType } = props;
  const list: ListOption[] = (schemaType?.options?.list as ListOption[]) || [];
  const selected = list.find((item) => item.value === value);

  return (
    <Card padding={2} radius={2} shadow={1} border>
      <Stack space={2}>
        <Flex align="center" gap={2}>
          {value && (
            <Box
              style={{
                width: 28,
                height: 28,
                minWidth: 28,
                borderRadius: 4,
                background: value,
                border: "1px solid var(--card-border-color)",
                flexShrink: 0,
              }}
              title={value}
            />
          )}
          <Select
            value={value ?? ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const next = e.target.value;
              onChange(next ? set(next) : unset());
            }}
            style={{ flex: 1 }}
          >
            <option value="">No color</option>
            {list.map((item) => (
              <option key={item.value} value={item.value} style={{ background: item.value }}>
                {item.title}
              </option>
            ))}
          </Select>
        </Flex>
        {selected && (
          <Text size={0} muted>
            {selected.title} — {selected.value}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
