export const getDateInterval = (initialDate = new Date(), finalDate = new Date()) => {
  const dates = [];

  while (initialDate <= finalDate) {
    dates.push(new Date(initialDate));
    initialDate.setDate(initialDate.getDate() + 1);
  }

  return dates;
}

/**
 * Converte a instância de Date para a string `DD-MM-YYYY`
 */
export const toCoinGeckoDateFormat = (date = new Date()) => {
  const day = date.getDate();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

/**
 * Converte a instância de Date para a string `DD/MM`
 */
export const toSimpleDateFormat = (date = new Date()) => {
  const day = date.getDate();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);

  return `${day}/${month}`;
}