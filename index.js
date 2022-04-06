const input = 3;
// output = 1 + 2 + 3, 6

function specialFunc(input) {
  if (input < 0 || input === 0) return;
  let sumResult = 0;
  for (let i = 0; i <= input; i++) {
    sumResult += i;
  }
  return sumResult;
}

let t1 = performance.now();
specialFunc(100000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);

function specialFunc(n) {
  return (n * (n + 1)) / 2;
}
