import assert from "node:assert/strict";
import test from "node:test";
import { decideCardSurfaceActivation, type CardSurfaceClickFacts } from "./card-surface";

const ordinary: CardSurfaceClickFacts = {
  button: 0,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
  targetIsInteractive: false,
  targetInsideDisclosure: false,
  selectionText: "",
  hasProfileLink: true,
};

test("ordinary primary click activates a published profile card", () => {
  assert.equal(decideCardSurfaceActivation(ordinary), "activate");
});

test("keyboard modifiers, text selection, controls, and open trace do not navigate", () => {
  assert.equal(decideCardSurfaceActivation({ ...ordinary, metaKey: true }), "modified");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, ctrlKey: true }), "modified");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, shiftKey: true }), "modified");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, selectionText: "recorded headquarters" }), "selection");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, selectionText: "   " }), "activate");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, targetIsInteractive: true }), "interactive");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, targetInsideDisclosure: true }), "disclosure");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, button: 1 }), "secondary-button");
  assert.equal(decideCardSurfaceActivation({ ...ordinary, defaultPrevented: true }), "prevented");
});

test("a row without a published profile stays inert", () => {
  assert.equal(decideCardSurfaceActivation({ ...ordinary, hasProfileLink: false }), "no-profile");
});
