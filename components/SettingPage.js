import React from 'react';
import { AsyncStorage, View, Text, Slider, StyleSheet } from 'react-native';
import NumberOfResultSlider from './setting/NumberOfResultSlider';
import { ButtonGroup, Button } from 'react-native-elements';
import TickerValue from './TickerValue';
import {Color} from '../constants';

const DEFAULT_NUMBER_OF_RESULTS = 30;
const MIN_NUMBER_OF_RESULTS = 10;
const MAX_NUMBER_OF_RESULTS = 110;
const MAX_LABEL = 'All';

const DetailPageSourceButtons = [
  'CoinMarketCap',
  'Coinranking'
];
const TickerValueColorButtons = [
  {
    element: () => {
      return (
        <View style={styles.tickers}>
          <TickerValue value={1.2} />
          <TickerValue value={-0.3} />
        </View>
      );
    },
  },
  {
    element: () => {
      return (
        <View style={styles.tickers}>
          <TickerValue value={1.2} useReverseColor={true} />
          <TickerValue value={-0.3} useReverseColor={true} />
        </View>
      );
    },
  }
];
export default class SettingPage extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.item]}>
          <View>
            <Text>Max Results: {this.props.maxResultsForDisplay === MAX_NUMBER_OF_RESULTS ? MAX_LABEL : this.props.maxResultsForDisplay}</Text>
          </View>
          <View>
            <NumberOfResultSlider
              defaultMaxResults={this.props.maxResults}
              onMaxResultsChange={this.props.onMaxResultsChange}
              onValueChange={this.props.onMaxResultsChangeForDisplay}
            />
          </View>
        </View>
        <View style={[styles.item]}>
          <View>
            <Text>Source of Detail Page</Text>
          </View>
          <View>
            <ButtonGroup
              onPress={this.props.onSelectDetailPageSourceIndex}
              selectedIndex={this.props.selectedDetailPageSourceIndex}
              buttons={DetailPageSourceButtons}
              containerStyle={styles.buttonGroup}
              selectedBackgroundColor={Color.FB_BLUE}
            />
          </View>
        </View>
        <View style={[styles.item]}>
          <View>
            <Text>Ticker Color Preference</Text>
          </View>
          <View>
            <ButtonGroup
              onPress={this.props.onSelectTickerValueColor}
              selectedIndex={this.props.selectedTickerValueColor}
              buttons={TickerValueColorButtons}
              containerStyle={styles.buttonGroup}
              selectedBackgroundColor={Color.FB_BLUE}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  buttonGroup: {
    height: 44,
    // hack to make button group look fine
    left: -12,
    width: '100%',
  },
  tickers: {
    flexDirection: 'row',
  },
});
