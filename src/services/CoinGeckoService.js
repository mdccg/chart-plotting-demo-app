import axios from 'axios';
import { getDateInterval, toCoinGeckoDateFormat } from './../utils/date_utils';

class CoinGeckoService {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3'
    });
  }

  async getQuotationADay(initialDate, finalDate) {
    const id = 'bitcoin';
    const dateInterval = getDateInterval(initialDate, finalDate);

    const promises = dateInterval.map((currentDate) => {
      const date = toCoinGeckoDateFormat(currentDate);
      return this.http.get(`/coins/${id}/history`, { params: { id, date } });
    });

    const responses = await Promise.all(promises);
    const quotation = responses.map((response) => response.data.market_data.current_price.brl);
    return quotation;
  }
}

export default CoinGeckoService;