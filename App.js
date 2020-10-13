import React from 'react';
import "react-native-gesture-handler";

import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { View, StatusBar, Platform } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';


const Tabs = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator();


export default class App extends React.Component {
  render(){
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: 20}} />
          <History />
        </View>
      </Provider>
    )
  }
}

