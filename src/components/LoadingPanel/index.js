import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from './../../styles/theme';

const LoadingPanel = () => {

  return (
    <View style={styles.loadingPanel}>
      <ActivityIndicator color={theme.bitcoinColor} size={64} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default LoadingPanel;