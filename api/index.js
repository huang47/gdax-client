import 'intl';
import 'intl/locale-data/jsonp/en';
import Rx from 'rxjs/Rx';
import { AsyncStorage } from 'react-native';
import { TICKER_BOOKMARKS_KEY, SETTING_STORAGE_KEY } from '../constants';
import UserSetting from './UserSetting';
import client from './CoinMarketCap';

const tickerSubject = new Rx.BehaviorSubject();
export const ticker$ = tickerSubject.asObservable();
const bookmarkSubject = new Rx.BehaviorSubject();
export const bookmark$ = bookmarkSubject.asObservable();
export const settingSubject = UserSetting.settingSubject;
export const setting$ = UserSetting.setting$;

export const getLatestDataSubject = new Rx.Subject();
const getLatestData$ = getLatestDataSubject.asObservable();

Rx.Observable
  .merge(
    setting$
      .distinctUntilChanged((a, b) => {
        return a.maxResults === b.maxResults;
      }),
    getLatestData$
      .startWith('bootstrap'),
  )
  .flatMap(() => {
    return Rx.Observable
      .zip(
        setting$
          .map(setting => client.limit(setting.maxResults))
          .flatMap(client => client.getTickerList$()),
        Rx.Observable.fromPromise(AsyncStorage.getItem(TICKER_BOOKMARKS_KEY))
          .filter(Boolean)
          .map(JSON.parse)
      )
      .take(1);
  })
  .startWith([[], {}])
  .do(([tickers, bookmarks]) => {
    tickerSubject.next(tickers);
    bookmarkSubject.next(bookmarks);
  })
  .subscribe();

export function setBookmark$({id}) {
  return bookmark$
    .map(bookmarks => {
      return {
        ...bookmarks,
        [id]: !bookmarks[id],
      }
    })
    .take(1)
    .do(bookmarks => {
      AsyncStorage.setItem(TICKER_BOOKMARKS_KEY, JSON.stringify(bookmarks)).done();
      bookmarkSubject.next(bookmarks);
    });
}

export const numberFormatter = Intl.NumberFormat(navigator.language, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});

export const tickerValueFormatter = Intl.NumberFormat(navigator.language, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const tickerLargeValueFormatter = Intl.NumberFormat(navigator.language, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
