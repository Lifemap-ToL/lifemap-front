export const round = (toRound: number, numberOfDecimals = 2): number => {
  const powerOfTen = Math.pow(10, numberOfDecimals);
  return Math.round(toRound * powerOfTen) / powerOfTen;
};
