const unreadInt = (num : number) : Array<number> => {
  const data = [];
  for (let i = 0; i < 4; i++) {
    data.push(num % 256);
    num = (num - data[i]) / 256;
  }
  return data;
}

export = unreadInt;