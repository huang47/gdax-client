import React from 'react';
import HomeContainer from '../components/HomeContainer';
import { Button, Icon } from 'react-native-elements'

const FB_COLOR_BLUE = '#5890ff';
const TITLE = 'Home';
const HOME_TAB_TITLE = TITLE;

export default class HomeScreen extends React.Component {
  _onNavigateToDetailPage = (params) => {
    this.props.navigation.navigate('Detail', params);
  }
  render() {
    return (
      <HomeContainer
        onNavigateToDetailPage={this._onNavigateToDetailPage}
      />
    );
  }
}
