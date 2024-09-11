function pad0(number: number): string {
  return `0${number}`.slice(-2);
}

export function format(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${pad0(day)}/${pad0(month)}/${year}`;
}
