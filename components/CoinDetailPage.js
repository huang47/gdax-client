import React from 'react';
import { WebView } from 'react-native';
import { setting$ } from '../api'

export default class CoinDetailScreen extends React.PureComponent {
  state = {
    isLoading: false,
    selectedIndex: 0,
  }
  componentDidMount() {
    this.setState({isLoading: true});
    setting$
      .take(1)
      .map(setting => setting.selectedDetailPageSourceIndex)
      .do(selectedIndex => this.setState({selectedIndex, isLoading: true}))
      .subscribe();
  }
  render() {
    if (!this.state.isLoading) {
      return null;
    }
    const source = this.state.selectedIndex === 0
      ? {uri: `https://coinmarketcap.com/currencies/${this.props.id}/`}
      : {uri: `https://coinranking.com/c/${this.props.symbol.toLowerCase()}/24h`};
    return (
      <WebView
        source={source}
      />
    );
  }
}
