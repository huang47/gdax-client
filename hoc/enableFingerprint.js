import React from 'react';
import Rx from 'rxjs/Rx';
import Expo from 'expo';

const { Fingerprint } = Expo;
const AUTH_MESSAGE = 'Unlock with your fingerprint';

export default function enableFingerprint(BaseComponent) {
  class Decorator extends React.PureComponent {
    state = {
      isAuthenticated: false,
      isWaiting: false,
    };
    componentDidMount() {
      this._subscription = Rx.Observable
        .zip(
          Fingerprint.hasHardwareAsync(),
          Fingerprint.isEnrolledAsync(),
        )
        .do(() => this.setState({isWaiting: true}))
        .map(([hasHardware, isEnrolled]) => {
          return hasHardware && isEnrolled;
        })
        .flatMap(isEligible => {
          return isEligible
            ? Fingerprint.authenticateAsync(AUTH_MESSAGE)
            : Rx.Observable.of({success: true});
        })
        .do(
          ({success}) => {
            this.setState({
              isWaiting:false,
              isAuthenticated: true,
            })
          },
          error => {
            this.setState({
              isWaiting:false,
              isAuthenticated: false,
            });
          },
        )
        .subscribe();
    }
    render() {
      if (this.state.isWaiting) {
        return null;
      }
      if (!this.state.isAuthenticated) {
        return null;
      }
      return (
        <BaseComponent {...this.props} />
      )
    }
  }
  return Decorator;
}
