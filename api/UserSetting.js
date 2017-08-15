import Rx from 'rxjs/Rx';
import { AsyncStorage } from 'react-native';
import { SETTING_STORAGE_KEY } from '../constants';

const settingSubject = new Rx.BehaviorSubject();
const setting$ = settingSubject.asObservable()
  .flatMap(payload => {
    return Rx.Observable.fromPromise(AsyncStorage.getItem(SETTING_STORAGE_KEY))
      .map(JSON.parse)
      .map(setting => Object.assign({}, setting, payload));
  });

export default {
  settingSubject,
  setting$,
};

setting$
  .flatMap(setting => Rx.Observable.fromPromise(AsyncStorage.setItem(SETTING_STORAGE_KEY, JSON.stringify(setting))))
  .do(
    null,
    ex => console.error('update setting failed', ex.message),
  )
  .subscribe();