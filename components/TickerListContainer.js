import React from 'react';
import Rx from 'rxjs/Rx';
import TickerList from './TickerList';
import { getLatestDataSubject, setBookmark$, ticker$, bookmark$, setting$ } from '../api';
import { Order, SortKey, API_LIMIT } from '../constants';

export default class TickerListContainer extends React.PureComponent {
  static defaultProps = {
    showFavoriteOnly: false,
  };
  state = {
    tickers: [],
    bookmarks: {},
    settings: {},
    isRefreshing: false,
    scrollEnabled: true,
  };
  componentDidMount() {
    this.setState({isRefreshing: true});
    this._subscription = Rx.Observable
      .combineLatest(ticker$, bookmark$, setting$)
      .map(([tickers, bookmarks, settings]) => {
        if (this.props.showFavoriteOnly) {
          tickers = tickers.filter(ticker => bookmarks[ticker.id]);
        }
        return {tickers, bookmarks, settings};
      })
      .do(
        ({tickers, bookmarks, settings}) => {
          this.setState({
            bookmarks,
            tickers,
            settings,
            isRefreshing: false,
          });
        },
        ex => {
          this.setState({isRefreshing: false});
        },
      )
      .subscribe();
  }
  _onPullToRefresh = () => {
    this.setState({isRefreshing: true});
    getLatestDataSubject.next();
  };
  _onSwipeStart = (event, gestureState, currentlyOpenSwipeable) => {
    this.setState({scrollEnabled:false});
    if (this._currentlyOpenSwipeable === currentlyOpenSwipeable) {
      return;
    }
    if (this._currentlyOpenSwipeable) {
      this._currentlyOpenSwipeable.recenter();
    }
  };
  _onSwipeRelease = (event, gestureState, currentlyOpenSwipeable) => {
    this.setState({scrollEnabled:true});
  };
  _onScroll = (event) => {
    this.setState({scrollEnabled:true});
    if (this._currentlyOpenSwipeable) {
      this._currentlyOpenSwipeable.recenter();
    }
    this._currentlyOpenSwipeable = null;
  };
  _onRightButtonsOpenComplete = (event, gestureState, currentlyOpenSwipeable) => {
    this._currentlyOpenSwipeable = currentlyOpenSwipeable;
  };
  _onRightButtonsCloseComplete = (event, gestureState, currentlyOpenSwipeable) => {
    this._currentlyOpenSwipeable = null;
  };
  _onAddToFavorite = ({id}) => {
    this.setState({scrollEnabled:true});
    setBookmark$({id})
      .do(bookmarks => getLatestDataSubject.next())
      .subscribe();
    if (this._currentlyOpenSwipeable) {
      this._currentlyOpenSwipeable.recenter();
    }
    this._currentlyOpenSwipeable = null;
  };
  componentWillUnmount() {
    this._subscription.unsubscribe();
  }
  render() {
    let {query} = this.props;
    const tickers = this.state.tickers
      .filter(ticker => {
        if (!query) {
          return true;
        }
        query = query.toLowerCase();
        return (
          ticker.name.toLowerCase().includes(query) ||
          ticker.symbol.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        const key = SortKey[this.props.selectedButtonIndex];
        return this.props.selectedButtonOrder === Order.DOWN
          ? a[key] - b[key]
          : b[key] - a[key];
      });
    return (
      <TickerList
        bookmarks={this.state.bookmarks}
        tickers={tickers}
        settings={this.state.settings}
        onNavigateToDetailPage={this.props.onNavigateToDetailPage}
        onPullToRefresh={this._onPullToRefresh}
        isRefreshing={this.state.isRefreshing}
        flatListExtraData={{
          selectedButtonIndex: this.props.selectedButtonIndex,
          selectedButtonOrder: this.props.selectedButtonOrder,
        }}
        scrollEnabled={this.state.scrollEnabled}
        onSwipeStart={this._onSwipeStart}
        onSwipeRelease={this._onSwipeRelease}
        onScroll={this._onScroll}
        onRightButtonsOpenComplete={this._onRightButtonsOpenComplete}
        onRightButtonsCloseComplete={this._onRightButtonsCloseComplete}
        onAddToFavorite={this._onAddToFavorite}
      />
    );
  }
}
