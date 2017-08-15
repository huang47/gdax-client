import React from 'react';
import Rx from 'rxjs/Rx';
import { TouchableHighlight, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import TickerListContainer from './TickerListContainer';
import { Order } from '../constants';

const FilterButtons = [
  'Cap', 'Price', 'Volume', '% 24h',
];

export default class HomeContainer extends React.PureComponent {
  static defaultProps = {
    noSearch: false,
    showFavoriteOnly: false,
  };
  state = {
    isAuthenticated: false,
    shouldAuth: true,
    query: null,
    selectedButtonIndex: 0,
    selectedButtonOrder: Order.UP,
  };
  _onChangeText = (query) => {
    this.setState({query});
  };
  _onPressButtonGroup = (selectedButtonIndex) => {
    const selectedButtonOrder = selectedButtonIndex === this.state.selectedButtonIndex
      ? !this.state.selectedButtonOrder
      : Order.UP;
    this.setState({
      selectedButtonIndex,
      selectedButtonOrder,
    });
  };
  render() {
    const searchBar = this.props.noSearch
      ? null
      : (
        <SearchBar
          lightTheme={true}
          ref={searchBar => this.searchBar = searchBar}
          style={styles.searchBar}
          onChangeText={this._onChangeText}
        />
      );
    return (
      <View style={styles.container}>
        {searchBar}
        <ButtonGroup
          buttons={FilterButtons}
          onPress={this._onPressButtonGroup}
          selectedIndex={this.state.selectedButtonIndex}
          containerStyle={styles.buttonGroup}
        />
        <TickerListContainer
          showFavoriteOnly={this.props.showFavoriteOnly}
          onNavigateToDetailPage={this.props.onNavigateToDetailPage}
          {...this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  auth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 44,
    paddingLeft: 44,
  },
  buttonGroup: {
    height: 44,
  },
});
