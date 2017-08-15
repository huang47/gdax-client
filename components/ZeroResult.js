import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class ZeroResult extends React.PureComponent {
  static defaultProps = {
    title: 'No Result',
  };
  render() {
    if (this.props.isRefreshing) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
  title: {
  },
})
