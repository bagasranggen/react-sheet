const getRange = (start: number, length: number) => Array.from({ length: length }, (v, k) => k + start);

export default getRange;