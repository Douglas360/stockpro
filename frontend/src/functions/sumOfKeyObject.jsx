export const sumKeyOfObject = (arr, key) => {
  const sumWithInitial = arr.reduce(function (
    acumulador,
    valorAtual
  ) {
    return acumulador + +valorAtual[key];
  },
  0);

  return sumWithInitial
};