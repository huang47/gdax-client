import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { tickerValueFormatter,  tickerLargeValueFormatter } from '../api';

const LARGE_VALUE = 100;

export default class TickerValue extends React.PureComponent {
  static defaultProps = {
    useReverseColor: false,
  };
  render() {
    const {value, useReverseColor} = this.props;
    const isPositive = value >= 0;
    let style;
    if (isPositive) {
      style = useReverseColor ? styles.negative : styles.positive;
    } else {
      style = useReverseColor ? styles.positive : styles.negative;
    }
    const formatter = Math.abs(value) >= LARGE_VALUE ? tickerLargeValueFormatter : tickerValueFormatter;
    const formattedValue = formatter.format(value);
    const valueString = isPositive ? `+${formattedValue}` : formattedValue;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.text}>{valueString}%</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    minWidth: 72,
  },
  positive: {
    backgroundColor: '#093',
  },
  negative: {
    backgroundColor: '#ff333a',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
