const randomNumber = (maxNumber) => {
  return Math.floor((Math.random() * maxNumber) + 1);
}
const randomNumberRange = (minNumber, maxNumber) => {
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

module.exports = { randomNumber, randomNumberRange }