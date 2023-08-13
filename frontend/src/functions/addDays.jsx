export const addDays = (initialDate, interval) => {
    const date = new Date(
      new Date(initialDate).setDate(
        new Date(initialDate.slice(0, 10)).getDate() + +interval
      )
    )
      .toISOString()
      .slice(0, 10);

    return date;
};
