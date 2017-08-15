import React from 'react';
import CoinDetailPage from '../components/CoinDetailPage';

export default class CoinDetailScreen extends React.PureComponent {
  render() {
    const {params} = this.props.navigation.state;
    return (
      <CoinDetailPage {...params} />
    );
  }
}
