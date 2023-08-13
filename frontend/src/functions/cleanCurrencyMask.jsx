export function cleanCurrencyMask(str) {
  if (typeof str === "string") {

    const valorSemR = str.trim().replace("R$", "");
    
    const valorSemPontos = valorSemR.replace(/\./g, "");
    
    const valorNumerico = +valorSemPontos.replace(/,/g, '.');

    if (isNaN(valorNumerico)) {
      return "";
    }

    return valorNumerico;
  }
  return str;
}
