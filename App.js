import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import AddEntry from './components/AddEntry';
import History from './components/History';
import EntryDetail from './components/EntryDetail'
import { purple, white, orange } from './utils/colors';

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Constants from 'expo-constants'


function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator();

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName='Add Entry'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;

        // try switch
        if (route.name === 'Add Entry') {
          icon = <FontAwesome 
            name='plus-square' 
            size={size} 
            color={color} 
          />

        } else if (route.name === 'History') {
          icon = <Ionicons name='ios-bookmarks' size={size} color={color} />
        }

        return icon;
      },
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      showIcon: true,
      style: {
        height: 80,
        backgroundColor: Platform.OS === 'ios' ? white : orange,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    }}
  >
    <Tabs.Screen name='Add Entry' component={AddEntry} />
    <Tabs.Screen name='History' component={History} />
  </Tabs.Navigator>
);

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name='Entry Detail'
      component={EntryDetail}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
      }}
    />
  </Stack.Navigator>
)

export default class App extends React.Component {
  render(){
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <NavigationContainer >
            <AppStatusBar />
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

