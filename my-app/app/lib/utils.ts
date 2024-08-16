export const generateRangeArray = (min: number, max: number, interval: number) => {
  let i = min;
  let ranges = [];
  while (i < max) {
    let range = [];
    range.push(i);
    i += interval;
    range.push(i - 1);
    ranges.push(range);
  }
  
  return ranges;
};


export const generateRange = (min: number, max: number, interval: number) => {
    let i = min;
    let ranges = [];
    while (i < max) {
      let rangString = `${i}-`;
      i += interval;
      rangString += `${i - 1}`;
      ranges.push(rangString);
    }
    ranges.push("over 300");
    return ranges;
  };

export const rangesNumber = generateRangeArray(0, 300, 50);

export const checkIfInRange = (price: number) => {
  let range = "";

  rangesNumber.forEach((ranges) => {
    if (price >= 300) {
      range = "over 300";
    } else if (price >= ranges[0] && price < ranges[1]) {
      range = ranges.join("-");
    }
  });
  return range;
};

 export const sortdata = (data: Product[],dropdownSelected:string) => {
    let sorteddata;
    if (dropdownSelected === "priceMin-Max") {
      sorteddata = data.sort(
        (a: any, b: any) => Number(a.price) - Number(b.price)
      );
    }
    if (dropdownSelected === "priceMax-Min") {
      sorteddata = data.sort(
        (a: any, b: any) => Number(b.price) - Number(a.price)
      );
    }
    return sorteddata;
  };

