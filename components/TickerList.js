import React from 'react';
import { RefreshControl, StyleSheet, View, FlatList, Text } from 'react-native';
import TickerCell from './TickerCell';
import ZeroResult from './ZeroResult';

const ICON_SIZE = 32;

function SeparatorRenderer(sectionID, rowID, adjacentRowHighlighted) {
  return <View style={styles.separator} />;
}

export default class TickerList extends React.PureComponent {
  _tickerCellRenderer = ({item}) => {
  	const iconUrl = `https://files.coinmarketcap.com/static/img/coins/${ICON_SIZE}x${ICON_SIZE}/${item.id}.png`;
    return (
  		<TickerCell
        iconUrl={iconUrl}
        id={item.id}
        name={item.name}
        symbol={item.symbol}
        rank={item.rank}
        price={item.price_usd}
        percentChangeOneDay={item.percent_change_24h}
        onNavigateToDetailPage={this.props.onNavigateToDetailPage}
        onSwipeStart={this.props.onSwipeStart}
        onSwipeRelease={this.props.onSwipeRelease}
        onRightButtonsOpenComplete={this.props.onRightButtonsOpenComplete}
        onRightButtonsCloseComplete={this.props.onRightButtonsCloseComplete}
        onAddToFavorite={this.props.onAddToFavorite}
        isSelected={this.props.bookmarks[item.id]}
        selectedTickerValueColor={this.props.settings.selectedTickerValueColor}
  		/>
  	);
  };
  render() {
    return (
			<View style={styles.container}>
				<FlatList
          data={this.props.tickers}
          ListEmptyComponent={() => (
            <ZeroResult
              isRefreshing={this.props.isRefreshing}
              title="No Favorite Items"
            />
          )}
          extraData={this.props.flatListExtraData}
          keyExtractor={(item) => item.id}
          renderItem={this._tickerCellRenderer}
          renderSeparator={SeparatorRenderer}
          scrollEnabled={this.props.scrollEnabled}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.props.onPullToRefresh}
            />
          }
          onScroll={this.props.onScroll}
				/>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
  },
});
