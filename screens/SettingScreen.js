import React from 'react';
import { AsyncStorage } from 'react-native';
import SettingPage from '../components/SettingPage';
import { settingSubject, setting$, } from '../api';

export default class SettingScreen extends React.PureComponent {
  state = {
    isLoading: false,
    maxResultsForDisplay: 0,
    selectedDetailPageSourceIndex: 0,
    selectedTickerValueColor: 0,
  };
  componentDidMount() {
    this.setState({isLoading: true});
    this._subscription = setting$
      .do(setting => this.setState({
        ...setting,
        isLoading: false,
        maxResultsForDisplay: setting.maxResults,
      }))
      .subscribe();
  }
  _onMaxResultsChangeForDisplay = maxResultsForDisplay => {
    this.setState({maxResultsForDisplay});
  };
  _onMaxResultsChange = maxResults => {
    this.setState({maxResults});
    settingSubject.next({maxResults});
  };
  _onSelectDetailPageSourceIndex = selectedDetailPageSourceIndex => {
    this.setState({selectedDetailPageSourceIndex});
    settingSubject.next({selectedDetailPageSourceIndex});
  };
  _onSelectTickerValueColor = selectedTickerValueColor => {
    this.setState({selectedTickerValueColor});
    settingSubject.next({selectedTickerValueColor});
  };
  componentWillUnmount() {
    this._subscription.unsubscribe();
  }
  render() {
    const {isLoading, ...settingProps} = this.state;
    if (isLoading) {
      return null;
    }
    return (
      <SettingPage
        {...settingProps}
        maxResultsForDisplay={this.state.maxResultsForDisplay}
        onMaxResultsChange={this._onMaxResultsChange}
        onMaxResultsChangeForDisplay={this._onMaxResultsChangeForDisplay}
        onSelectDetailPageSourceIndex={this._onSelectDetailPageSourceIndex}
        onSelectTickerValueColor={this._onSelectTickerValueColor}
      />
    );
  }
}
