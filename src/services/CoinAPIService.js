import axios from 'axios';

class CoinService {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://rest.coinapi.io'
    });

    this.apiKey = 'AC3D2317-3991-44D9-AFF2-7B913AC67D3A';
  }

  async getQuotationADay(initialDate, finalDate) {
    try {
      const response = await this.http.get('/v1/exchangerate/BTC/BRL/history', {
        params: {
          period_id: '1DAY',
          time_start: initialDate.toISOString(),
          time_end: finalDate.toISOString(),
        },
        headers: {
          'X-CoinAPI-Key': this.apiKey,
        },
      });

      return response.data.map(({ rate_close }) => rate_close);
    
    } catch(error) {
      console.error(error);
      return [];
    }
  }
}

export default CoinService;