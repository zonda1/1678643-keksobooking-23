
const priceTransformer=(price)=> {
  if (price<10000) {
    return `до 10000₽`;}
  else if (price>=10000 && price<=50000) {
    return `10000 - 50000₽`;}
  else if (price>50000) {
    return `10000 - 50000₽`;}
};
