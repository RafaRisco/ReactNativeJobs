import { Notifications } from 'expo';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';

const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingScreen },
            }),
            navigationOptions: {
              title: 'Review',
              tabBarLabel: 'Review',
              tabBarIcon: ({ tintColor }) => (
                <Icon name="favorite" size={25} color={tintColor} />
              )
            }
          }
        }, {
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          },
        }),
      }
    }, {
      navigationOptions: {
        tabBarVisible: false,
      },
      lazy: true,
    });

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
