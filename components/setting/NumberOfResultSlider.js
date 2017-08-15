import React from 'react';
import { AsyncStorage, View, Text, Slider, StyleSheet } from 'react-native';

const DEFAULT_NUMBER_OF_RESULTS = 30;
const MIN_NUMBER_OF_RESULTS = 10;
const MAX_NUMBER_OF_RESULTS = 110;
const STEP = 10;

export default class NumberOfResultSlider extends React.PureComponent {
  static defaultProps = {
    defaultMaxResults: DEFAULT_NUMBER_OF_RESULTS,
    onMaxResultsChange: () => {},
    onValueChange: () => {},
  };
  render() {
    return (
      <Slider
        maximumValue={MAX_NUMBER_OF_RESULTS}
        minimumValue={MIN_NUMBER_OF_RESULTS}
        onSlidingComplete={this.props.onMaxResultsChange}
        onValueChange={this.props.onValueChange}
        step={STEP}
        value={this.props.defaultMaxResults}
      />
    );
  }
}
