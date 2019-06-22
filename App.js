import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
// create our app's navigation stack
export default createAppContainer(createSwitchNavigator(
  {
  Main,
  Loading,
  Login,
  SignUp
  },
  {
    initialRouteName: 'Loading',
  }
));