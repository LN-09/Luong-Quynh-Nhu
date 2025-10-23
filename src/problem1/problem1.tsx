// Problem 1: Sum of Numbers from 1 to n
const sum_to_n_a = function (n: number): number {
  return (n * (n + 1)) / 2;
};
// Method B: Using a loop
const sum_to_n_b = function (n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
// Method C: Using recursion
const sum_to_n_c = function (n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};

console.log("sum_to_n(5) results:");
console.log("Method A (Formula):", sum_to_n_a(5));
console.log("Method C (Recursive):", sum_to_n_c(5));

console.log("\nsum_to_n(10) results:");
console.log("Method A (Formula):", sum_to_n_a(10));
console.log("Method B (Loop):", sum_to_n_b(10));
console.log("Method C (Recursive):", sum_to_n_c(10));

console.log("\nsum_to_n(100) results:");
console.log("Method A (Formula):", sum_to_n_a(100));
console.log("Method B (Loop):", sum_to_n_b(100));
console.log("Method C (Recursive):", sum_to_n_c(100));

export default function Problem1() {
  return (
    <div className="text-center">
      <h1>Problem 1: Sum of Numbers from 1 to n</h1>
      <p>Open the console to see the results of different methods.</p>
    </div>
  );
}
