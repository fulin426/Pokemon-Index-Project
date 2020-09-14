// Take id from url and pad zeroes to display 3 digits
const padZeroes = (string) => {
  let splitString = string.split('/');
  return splitString[splitString.length - 2].padStart(3, '0')
}

export default padZeroes;