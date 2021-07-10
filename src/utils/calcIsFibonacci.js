const isSquare = (n) => {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};

const calcIsFibonacci = (n) => {
  if (isSquare(5 * (n * n) - 4) || isSquare(5 * (n * n) + 4)) {
    return true;
  } else {
    return false;
  }
};

export default calcIsFibonacci;
