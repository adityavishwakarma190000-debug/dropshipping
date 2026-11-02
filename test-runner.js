// Ponytail automated test runner for core logic
import assert from 'node:assert';

// 1. Currency & Discount calculations
function formatINR(amount) {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function calculateSavings(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return originalPrice - price;
}

console.log('--- RUNNING PONYTAIL QUALITY SUITE ---');

// Test 1: Indian Rupee formatting
assert.strictEqual(formatINR(0), '₹0');
assert.strictEqual(formatINR(1499).replace(/\u00a0/g, ' '), '₹1,499');
assert.strictEqual(formatINR(24999).replace(/\u00a0/g, ' '), '₹24,999');
console.log('✓ Test 1: Currency formatter formats INR accurately');

// Test 2: Discount calculations
assert.strictEqual(calculateDiscount(2499, 4999), 50);
assert.strictEqual(calculateDiscount(1899, 3799), 50);
assert.strictEqual(calculateDiscount(5000, 4000), 0); // No negative discount
assert.strictEqual(calculateDiscount(1000, 0), 0);
console.log('✓ Test 2: Discount calculations handle normal and edge cases');

// Test 3: Savings calculations
assert.strictEqual(calculateSavings(2499, 4999), 2500);
assert.strictEqual(calculateSavings(5000, 4000), 0);
console.log('✓ Test 3: Savings calculations return correct monetary differences');

// Test 4: Indian Mobile validation
const validPhones = ['9876543210', '8123456789', '7001234567', '6298765432'];
const invalidPhones = ['1234567890', '987654321', '98765432100', 'abcdefghij'];
const phoneRegex = /^[6-9]\d{9}$/;

for (const p of validPhones) {
  assert.ok(phoneRegex.test(p), `Phone ${p} should be valid`);
}
for (const p of invalidPhones) {
  assert.ok(!phoneRegex.test(p), `Phone ${p} should be invalid`);
}
console.log('✓ Test 4: Indian mobile number validation strictly matches TRAI +91 rules');

// Test 5: Indian PIN code regex
const validPins = ['560001', '110001', '400050', '700091'];
const invalidPins = ['56000', '5600011', 'ABCDEF', '000000'];
const pinRegex = /^[1-9]\d{5}$/; // Indian PIN codes never start with 0
for (const pin of validPins) {
  assert.ok(pinRegex.test(pin), `PIN ${pin} should be valid`);
}
for (const pin of invalidPins) {
  assert.ok(!pinRegex.test(pin), `PIN ${pin} should be invalid`);
}
console.log('✓ Test 5: Indian PIN code validation accurately rejects invalid formats');

console.log('--- ALL PONYTAIL TEST CASES PASSED (5/5) ---');
