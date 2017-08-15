import Rx from 'rxjs/Rx';
import querystring from 'querystring';

const { Observable } = Rx;

const DEFAULT_CURRENCY = "USD";
const VALID_CURRENCIES = [
  "AUD", "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "IDR", "INR", "JPY", "KRW", "MXN", "RUB", DEFAULT_CURRENCY
];

class CoinMarketCap {
  constructor() {
    this._limit = 0;
    this._convert = DEFAULT_CURRENCY;
  }
  limit(limit) {
    this._limit = limit;
    return this;
  }
  convert(convert) {
    this._convert = VALID_CURRENCIES.includes(convert)
      ? convert
      : DEFAULT_CURRENCY;
    return this;
  }
  getTicker$(ticker) {
    const query = querystring.stringify({
      limit: this._limit,
      convert: this._convert,
    });
    const url = `https://api.coinmarketcap.com/v1/ticker/${ticker}/?${query}`;
    return Observable.defer(() => Observable.fromPromise(fetch(url)))
      .flatMap(response => Observable.fromPromise(response.json()));
  }
  getTickerList$() {
    const query = querystring.stringify({
      limit: this._limit,
      convert: this._convert,
    });
    const url = `https://api.coinmarketcap.com/v1/ticker/?${query}`;
    return Observable.defer(() => Observable.fromPromise(fetch(url)))
      .flatMap(response => Observable.fromPromise(response.json()));
  }
  getGlobal$() {
    const query = querystring.stringify({convert: this._convert});
    const url = `https://api.coinmarketcap.com/v1/global/?${query}`;
    return Observable.defer(() => Observable.fromPromise(fetch(url)))
      .flatMap(response => Observable.fromPromise(response.json()));
  }
}

export default client = new CoinMarketCap();
