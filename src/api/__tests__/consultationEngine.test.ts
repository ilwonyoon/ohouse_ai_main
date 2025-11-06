/**
 * Integration tests for Consultation Engine
 * Tests intent detection, conversion signals, and phase transitions
 *
 * These are manual test cases - run with: npm run typecheck
 * Or execute as part of Node.js testing framework if configured
 */

import {
  detectIntentSignals,
  detectConversionSignals,
  getPhaseRequirements,
  calculateVisionClarity,
} from "../consultationEngine";
import { ConsultationPhase, ImageMetadata } from "@/types/consultation";

// Test runner utilities
const testResults: { passed: number; failed: number; tests: string[] } = {
  passed: 0,
  failed: 0,
  tests: [],
};

function assertTrue(condition: boolean, message: string): void {
  if (condition) {
    testResults.passed++;
    testResults.tests.push(`✓ ${message}`);
  } else {
    testResults.failed++;
    testResults.tests.push(`✗ ${message}`);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual === expected) {
    testResults.passed++;
    testResults.tests.push(`✓ ${message}`);
  } else {
    testResults.failed++;
    testResults.tests.push(
      `✗ ${message} (expected: ${expected}, actual: ${actual})`
    );
  }
}

function assertGreaterThan(
  actual: number,
  expected: number,
  message: string
): void {
  if (actual > expected) {
    testResults.passed++;
    testResults.tests.push(`✓ ${message}`);
  } else {
    testResults.failed++;
    testResults.tests.push(
      `✗ ${message} (expected > ${expected}, actual: ${actual})`
    );
  }
}

function assertLessThan(actual: number, expected: number, message: string): void {
  if (actual < expected) {
    testResults.passed++;
    testResults.tests.push(`✓ ${message}`);
  } else {
    testResults.failed++;
    testResults.tests.push(
      `✗ ${message} (expected < ${expected}, actual: ${actual})`
    );
  }
}

// ===== TEST SUITES =====

function testIntentDetection(): void {
  console.log("\n### Intent Detection Tests ###\n");

  // Type A: Exploratory
  console.log("Type A (Exploratory) Tests:");
  const exploratoryMessages = [
    "Just curious, what can your app do?",
    "I'm just looking for ideas right now",
    "Saw your ad and wanted to check it out",
    "Let's see what you suggest",
    "Don't know, maybe later",
  ];

  exploratoryMessages.forEach((msg) => {
    const result = detectIntentSignals(msg);
    console.log(`  "${msg}" → Type: ${result.type}`);
    assertEqual(
      result.type,
      "exploratory",
      `Detect exploratory: "${msg}"`
    );
  });

  // Type B: Vague Interest
  console.log("\nType B (Vague Interest) Tests:");
  const vagueMessages = [
    "My bedroom feels outdated",
    "I need some ideas for my space",
    "I'm thinking about refreshing one room",
  ];

  vagueMessages.forEach((msg) => {
    const result = detectIntentSignals(msg);
    console.log(`  "${msg}" → Type: ${result.type}`);
    assertEqual(result.type, "vague_interest", `Detect vague interest: "${msg}"`);
  });

  // Type C: Small Project
  console.log("\nType C (Small Project) Tests:");
  const smallMessages = [
    "I want to do a quick refresh of my bedroom",
    "Just need some new decor for the living room",
  ];

  smallMessages.forEach((msg) => {
    const result = detectIntentSignals(msg);
    console.log(`  "${msg}" → Type: ${result.type}`);
    assertEqual(result.type, "small_project", `Detect small project: "${msg}"`);
  });

  // Type D: Large Project
  console.log("\nType D (Large Project) Tests:");
  const largeMessages = [
    "We just moved to a new house and need to renovate everything",
    "Planning a full renovation of my apartment",
    "I want to redesign multiple rooms - living room, bedroom, and kitchen",
  ];

  largeMessages.forEach((msg) => {
    const result = detectIntentSignals(msg);
    console.log(`  "${msg}" → Type: ${result.type}`);
    assertEqual(result.type, "large_project", `Detect large project: "${msg}"`);
  });
}

function testConversionSignals(): void {
  console.log("\n### Conversion Signal Detection Tests ###\n");

  console.log("Should detect conversion signals:");
  const conversionMessages = [
    "Actually, I do need help with my living room",
    "How much would something like this cost?",
    "My bedroom is really outdated and I want to fix it",
    "Could you do this for my space?",
    "What's the process for getting started?",
  ];

  conversionMessages.forEach((msg) => {
    const result = detectConversionSignals(msg);
    console.log(`  "${msg}" → Has Signal: ${result.hasSignal}`);
    assertTrue(result.hasSignal, `Detect conversion signal: "${msg}"`);
  });

  console.log("\nShould NOT detect conversion in exploratory messages:");
  const nonConversionMessages = [
    "Just browsing for ideas",
    "This looks fun",
    "What kind of projects do you do?",
  ];

  nonConversionMessages.forEach((msg) => {
    const result = detectConversionSignals(msg);
    console.log(`  "${msg}" → Has Signal: ${result.hasSignal}`);
    assertTrue(!result.hasSignal, `No conversion in exploratory: "${msg}"`);
  });
}

function testPhaseRequirements(): void {
  console.log("\n### Phase Requirements Tests ###\n");

  console.log("Light Consultation Requirements:");
  const lightReqs = getPhaseRequirements(
    "phase_1c_light_consultation" as ConsultationPhase
  );
  console.log(`  Essential: ${lightReqs.essential.join(", ")}`);
  console.log(`  Max Questions: ${lightReqs.maxQuestions}`);
  assertEqual(lightReqs.maxQuestions, 8, "Light consultation max questions = 8");
  assertTrue(
    lightReqs.essential.includes("room"),
    "Light consultation has room as essential"
  );

  console.log("\nStandard Consultation Requirements:");
  const standardReqs = getPhaseRequirements(
    "phase_1d_standard_consultation" as ConsultationPhase
  );
  console.log(`  Essential: ${standardReqs.essential.join(", ")}`);
  console.log(`  Max Questions: ${standardReqs.maxQuestions}`);
  assertEqual(
    standardReqs.maxQuestions,
    25,
    "Standard consultation max questions = 25"
  );
  assertTrue(
    standardReqs.essential.includes("lifestyle"),
    "Standard consultation has lifestyle as essential"
  );
}

function testConfidenceScoring(): void {
  console.log("\n### Confidence Scoring Tests ###\n");

  console.log("Confidence should be high for clear intents:");
  const clearMsg =
    "We just moved to our new house and want to renovate the entire place";
  const clearResult = detectIntentSignals(clearMsg);
  console.log(`  Confidence: ${clearResult.confidence}`);
  assertGreaterThan(clearResult.confidence, 0.6, "Clear intent has high confidence");

  console.log("\nConfidence should be low for ambiguous intents:");
  const ambiguousMsg = "Not sure, maybe something";
  const ambiguousResult = detectIntentSignals(ambiguousMsg);
  console.log(`  Confidence: ${ambiguousResult.confidence}`);
  assertLessThan(ambiguousResult.confidence, 0.5, "Ambiguous intent has low confidence");
}

function testEndToEndScenarios(): void {
  console.log("\n### End-to-End Scenarios ###\n");

  // Scenario 1: Exploratory → Conversion → Small Project
  console.log("Scenario 1: Exploratory user converts to small project");
  let result = detectIntentSignals("Just curious what you can do");
  console.log(`  Message 1: "${result.type}"`);
  assertEqual(result.type, "exploratory", "Initial message is exploratory");

  const msg2 =
    "Actually, my bedroom really needs work. How much would a refresh cost?";
  result = detectIntentSignals(msg2);
  const conversionResult = detectConversionSignals(msg2);
  console.log(`  Message 2 Type: "${result.type}"`);
  console.log(`  Message 2 Conversion: ${conversionResult.hasSignal}`);
  assertEqual(result.type, "small_project", "After conversion becomes small project");
  assertTrue(conversionResult.hasSignal, "Conversion signal detected");

  // Scenario 2: Committed Large Project
  console.log("\nScenario 2: Committed user with large project");
  const largeMsg =
    "We just bought a house and need to redesign the entire first floor";
  result = detectIntentSignals(largeMsg);
  console.log(`  Type: "${result.type}"`);
  console.log(`  Confidence: ${result.confidence}`);
  assertEqual(result.type, "large_project", "Large project detected");
  assertGreaterThan(result.confidence, 0.6, "High confidence for large project");

  // Scenario 3: Vague → Clarification → Small Project
  console.log("\nScenario 3: Vague user who clarifies scope");
  result = detectIntentSignals("My living room feels outdated");
  console.log(`  Message 1: "${result.type}"`);
  assertEqual(result.type, "vague_interest", "Initial message is vague");

  result = detectIntentSignals(
    "Just my living room, small refresh with new furniture and paint"
  );
  console.log(`  Message 2: "${result.type}"`);
  assertEqual(result.type, "small_project", "After clarification becomes small project");
}

// ===== S1.1 IMAGE METADATA TESTS (NEW) =====

function testImageMetadataIntegration(): void {
  console.log("\n--- S1.1: Image Metadata Integration Tests ---");

  // Test 1: Text-only detection (baseline)
  console.log("\nTest 1: Text-only intent detection");
  const textOnlyResult = detectIntentSignals(
    "I'm thinking about refreshing my bedroom"
  );
  assertEqual(textOnlyResult.type, "small_project", "Text-only detects small_project");
  assertEqual(textOnlyResult.visionClarity, "vague", "Text-only has vague clarity");

  // Test 2: Image with poor lighting + issues
  console.log("\nTest 2: Image with poor lighting and visible issues");
  const poorImageMetadata: ImageMetadata = {
    room_type: "bedroom",
    lighting_level: "poor",
    clutter_level: "high",
    visible_issues: ["dated", "cluttered", "dark"],
  };
  const poorImageResult = detectIntentSignals(
    "just looking around",
    poorImageMetadata
  );
  assertTrue(
    poorImageResult.confidence > 0.5,
    "Image metadata boosts confidence from exploratory"
  );
  assertEqual(
    poorImageResult.type,
    "small_project",
    "Poor image overrides exploratory to small_project"
  );

  // Test 3: High quality image with clear room type
  console.log("\nTest 3: Image with clear metadata");
  const clearImageMetadata: ImageMetadata = {
    room_type: "living_room",
    lighting_level: "excellent",
    clutter_level: "low",
    visible_issues: [],
    estimated_size: "large",
    style_indicators: ["modern"],
  };
  const clearImageResult = detectIntentSignals(
    "this is nice, but needs some updates",
    clearImageMetadata
  );
  assertEqual(
    clearImageResult.visionClarity,
    "emerging",
    "Clear image with signals gives emerging clarity"
  );

  // Test 4: Image clarity scoring - clear
  console.log("\nTest 4: Vision clarity scoring - clear");
  const clearClarity = calculateVisionClarity(0.8, 3, clearImageMetadata);
  assertEqual(clearClarity, "clear", "High confidence + 3 signals = clear");

  // Test 5: Image clarity scoring - emerging
  console.log("\nTest 5: Vision clarity scoring - emerging");
  const emergingClarity = calculateVisionClarity(0.6, 2, clearImageMetadata);
  assertEqual(emergingClarity, "emerging", "Medium confidence + image metadata = emerging");

  // Test 6: Image clarity scoring - vague
  console.log("\nTest 6: Vision clarity scoring - vague");
  const vagueClarity = calculateVisionClarity(0.3, 0, undefined);
  assertEqual(vagueClarity, "vague", "Low confidence + no signals = vague");

  // Test 7: Combination text + image signals
  console.log("\nTest 7: Text + image signal combination");
  const combinedResult = detectIntentSignals(
    "I want to renovate my entire home",
    {
      room_type: "living_room",
      visible_issues: ["outdated", "dark"],
      lighting_level: "poor",
    }
  );
  assertEqual(combinedResult.type, "large_project", "Text intent dominates");
  assertTrue(
    combinedResult.signals.length >= 2,
    "Both text and image signals recorded"
  );

  // Test 8: Image metadata room type logged
  console.log("\nTest 8: Image metadata room type tracking");
  const roomMetaResult = detectIntentSignals("just exploring", {
    room_type: "kitchen",
    lighting_level: "moderate",
  });
  assertTrue(
    roomMetaResult.signals.some((s) => s.includes("kitchen")),
    "Room type is included in signals"
  );

  // Test 9: Multiple visible issues boost intent
  console.log("\nTest 9: Multiple visible issues increase confidence");
  const multiIssueResult = detectIntentSignals("maybe refresh", {
    visible_issues: ["dated", "cluttered", "dark", "small"],
    clutter_level: "high",
    lighting_level: "poor",
  });
  assertTrue(
    multiIssueResult.confidence >= 0.4,
    "Multiple issues boost confidence significantly"
  );

  // Test 10: Image with minimal metadata
  console.log("\nTest 10: Image with minimal metadata");
  const minimalImageResult = detectIntentSignals("testing", {
    room_type: "bedroom",
  });
  assertEqual(
    minimalImageResult.visionClarity,
    "vague",
    "Minimal image metadata gives vague clarity"
  );

  // Test 11: No image metadata (existing behavior preserved)
  console.log("\nTest 11: No image metadata preserves existing behavior");
  const noImageResult = detectIntentSignals(
    "renovating multiple rooms and doing major work"
  );
  assertEqual(noImageResult.type, "large_project", "Text-only detection works");
  assertTrue(
    noImageResult.signals.length > 0,
    "Text signals still detected"
  );

  console.log("\n✓ S1.1 Image Metadata Integration Tests Complete");
}

// ===== EXPORT TEST RUNNER =====

export function runAllTests(): void {
  console.log("====================================");
  console.log("  CONSULTATION ENGINE TEST SUITE");
  console.log("====================================");

  testIntentDetection();
  testConversionSignals();
  testPhaseRequirements();
  testConfidenceScoring();
  testEndToEndScenarios();
  testImageMetadataIntegration();

  // Summary
  console.log("\n====================================");
  console.log("  TEST SUMMARY");
  console.log("====================================");
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Total:  ${testResults.passed + testResults.failed}`);
  console.log("====================================\n");

  if (testResults.failed === 0) {
    console.log("✓ All tests passed!");
  } else {
    console.log(`✗ ${testResults.failed} tests failed\n`);
    testResults.tests
      .filter((t) => t.startsWith("✗"))
      .forEach((t) => console.log(t));
  }
}

// Run tests if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runAllTests();
}
