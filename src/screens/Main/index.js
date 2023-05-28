import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { toSimpleDateFormat } from './../../utils/date_utils';
import LoadingPanel from './../../components/LoadingPanel';
import CoinAPIService from './../../services/CoinAPIService';
import CoinGeckoService from './../../services/CoinGeckoService';
import theme from './../../styles/theme';

const Main = () => {
  const initialDate = new Date(new Date().setDate(new Date().getDate() - 10));
  const finalDate = new Date();
  
  const [didLoaded, setDidLoaded] = useState(false);
  const [quotation, setQuotation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setDidLoaded(false);

      // Aqui é possível trocar o serviço
      const coinService = new CoinGeckoService();

      let quotation = await coinService.getQuotationADay(initialDate, finalDate);
      
      // E se nada der certo, pelo menos dá para ver como o gráfico fica bonitinho
      // let quotation = fakeQuotation;

      setQuotation(quotation);
      setDidLoaded(true);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {didLoaded ? (
        <>
          <View />

          <View>
            {initialDate && finalDate && (
              <Text style={[styles.texto, styles.titulo]}>
                Cotação do Bitcoin do
                dia {toSimpleDateFormat(initialDate)} ao
                dia {toSimpleDateFormat(finalDate)}
              </Text>
            )}
            <Text style={[styles.texto, styles.subtitulo]}>Intervalo de dez dias</Text>
          </View>

          <BarChart style={{ height: 256 }} svg={{ fill: theme.bitcoinColor }} data={quotation} >
            <Grid />
          </BarChart>
        </>
      ) : <LoadingPanel />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },

  texto: {
    marginLeft:  32,
    marginRight: 32,
    
    textAlign: 'left',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',

    textTransform: 'uppercase',
  },

  subtitulo: {
    marginTop: 16,

    fontSize: 20,
    fontStyle: 'italic',
  },
});

export default Main;