import React from 'react';
import HomeContainer from '../components/HomeContainer';
import { Icon } from 'react-native-elements';

const FB_COLOR_RED = '#f25268';
const TITLE = 'Favorite';
const TAB_TITLE = TITLE;

export default class FavoriteScreen extends React.PureComponent {
  _onNavigateToDetailPage = (params) => {
    this.props.navigation.navigate('Detail', params);
  }
  render() {
    return (
      <HomeContainer
        onNavigateToDetailPage={this._onNavigateToDetailPage}
        showFavoriteOnly={true}
      />
    );
  }
}
