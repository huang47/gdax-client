import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SettingScreen from './screens/SettingScreen';
import NotificationScreen from './screens/NotificationScreen';
import CoinDetailScreen from './screens/CoinDetailScreen';
import enableFingerprint from './hoc/enableFingerprint';

const DetailConfig = {
  screen: CoinDetailScreen,
  path: '/ticker/:id',
  navigationOptions: ({navigation}) => ({
    title: `${navigation.state.params.symbol}(${navigation.state.params.name})`,
  }),
};

const Main = StackNavigator({
  Home: {
    screen: HomeScreen,
    path: '/',
    navigationOptions: {
      title: 'Home',
    },
  },
  Detail: DetailConfig,
}, {
});

const Favorite = StackNavigator({
  Favorite: {
    screen: FavoriteScreen,
    path: '/favorite',
    navigationOptions: {
      title: 'Favorite',
    },
  },
  Detail: DetailConfig,
});

const Notification = StackNavigator({
  Notification: {
    screen: NotificationScreen,
    path: '/notification',
    navigationOptions: {
      title: 'Notification',
    },
  },
});

const Setting = StackNavigator({
  Setting: {
    screen: SettingScreen,
    path: '/setting',
    navigationOptions: {
      title: 'Setting',
    },
  },
});

const App = TabNavigator({
  Main: {
    screen: Main,
    path: '/',
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name='home' type='font-awesome' size={25} iconStyle={{color:tintColor}}/>
      ),
    },
  },
  Favorite: {
    screen: Favorite,
    path: '/favorite',
    navigationOptions: {
      tabBarLabel: 'Favorite',
      tabBarIcon: ({tintColor}) => (
        <Icon name='heart' type='font-awesome' size={25} iconStyle={{color:tintColor}}/>
      ),
    },
  },
  Notification: {
    screen: Notification,
    path: '/notification',
    navigationOptions: {
      tabBarLabel: 'Notification',
      tabBarIcon: ({tintColor}) => (
        <Icon name='bell-o' type='font-awesome' size={25} iconStyle={{color:tintColor}}/>
      ),
    },
  },
  Setting: {
    screen: Setting,
    path: '/setting',
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({tintColor}) => (
        <Icon name='gear' type='font-awesome' size={25} iconStyle={{color:tintColor}}/>
      ),
    },
  },
}, {
  // initialRouteName: 'Setting',
  // tabBarPosition: 'bottom',
  animationEnabled: true,
  // this has conflict with swipe-to-delete
  swipeEnabled: false,
  tabBarOptions: {
    style: Platform.OS === 'android'
      ? { marginTop: 24, }
      : { },
  },
})

export default enableFingerprint(App);
