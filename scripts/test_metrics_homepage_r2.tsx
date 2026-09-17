import React from "react";
import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { MoveEvidenceShowcase } from "../components/intelligence/MoveEvidenceShowcase";
import m from "../data/home/move-network-metrics-v1.json";
Object.assign(globalThis, { React });
test("Rendered homepage preserves generated values and search-only unknowns", () => {
  const html = renderToStaticMarkup(<MoveEvidenceShowcase />);
  for (const row of m.metrics)
    if (row.value !== null)
      assert.ok(html.includes(row.value.toLocaleString("en-US")), row.key);
  assert.ok(html.includes("UNKNOWN"));
  assert.ok(html.includes("closure pending"));
  assert.ok(html.includes("12 specialist state surfaces"));
  assert.ok(html.includes("Directory profiles with an MC number"));
});
