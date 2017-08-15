import React from 'react';
import { TouchableOpacity, TouchableHighlight, StyleSheet, Image, View, Text } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Swipeable from 'react-native-swipeable';
import { Button, Icon } from 'react-native-elements'
import { Color, TICKER_BOOKMARKS_KEY, IconName } from '../constants';
import TickerValue from './TickerValue';
import { numberFormatter } from '../api';

export default class TickerCell extends React.PureComponent {
  _onPress = () => {
    const {id, name, symbol} = this.props;
    this.props.onNavigateToDetailPage({
      id,
      name,
      symbol,
    });
  };
  _onAddToFavorite = () => {
    this.props.onAddToFavorite({
      id: this.props.id,
    });
  };
  render() {
    const iconName = this.props.isSelected ? IconName.HEART : IconName.SOLID_HEART;
    const rightButtons = [
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.favoriteItem]}
        onPress={this._onAddToFavorite}>
        <Icon name={iconName} type='font-awesome' style={[styles.rightSwipeIcon]} size={25} iconStyle={{color:'#fff'}}/>
      </TouchableOpacity>,
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.infoItem]}
        onPress={this._onPress}>
        <Icon name='file-text-o' type='font-awesome' style={[styles.rightSwipeIcon]} size={25} iconStyle={{color:'#fff', paddingLeft:2}}/>
      </TouchableOpacity>,
    ];
    const useReverseColor = this.props.selectedTickerValueColor !== 0;
    return (
      <Swipeable
        rightButtons={rightButtons}
        onRef={ref => this.swipeable = ref}
        onSwipeStart={this.props.onSwipeStart}
        onSwipeRelease={this.props.onSwipeRelease}
        onRightButtonsOpenComplete={this.props.onRightButtonsOpenComplete}
        onRightButtonsCloseComplete={this.props.onRightButtonsCloseComplete}>
        <TouchableHighlight
          underlayColor="white"
          onPress={this._onPress}>
    			<View style={styles.container}>
            <View style={styles.left}>
              <Image source={{ uri: this.props.iconUrl}} style={styles.icon} />
              <View style={styles.content}>
                <View>
                  <Text style={styles.title}>
                    <Text style={styles.symbol}>
                      {this.props.symbol}
                    </Text>
                    <Text style={styles.price}>
                      {` \$${numberFormatter.format(this.props.price)}`}
                    </Text>
                  </Text>
                </View>
                <Text style={styles.subtitle}>
                  {`#${this.props.rank} ${this.props.name}`}
                </Text>
              </View>
            </View>
            <TickerValue
              value={this.props.percentChangeOneDay}
              useReverseColor={useReverseColor}
            />
    			</View>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  symbol: {
    color: '#888',
  },
  price: {
    color: '#333',
    left: 12,
  },
  subtitle: {
    fontSize: 12,
  },
  content: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginLeft: 12,
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 8,
  },
  swipeable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
  },
  favoriteItem: {
    backgroundColor: Color.FB_RED,
  },
  infoItem: {
    backgroundColor: Color.FB_BLUE,
  },
  rightSwipeIcon: {
    alignSelf: 'flex-start',
  },
});
