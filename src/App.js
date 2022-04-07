import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import ToDo from './screens/ToDo';
import Done from './screens/Done';
import Camera from './screens/Camera';
import Task from './screens/Task';
import TasksExercice from './screens/TasksExercice';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import { Provider } from 'react-redux';
import { Store } from './redux/store';

const Tab = createBottomTabNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'To-Do') {
              iconName = 'clipboard-list';
              size = focused ? 25 : 20;
            } else if (route.name === 'Done') {
              iconName = 'clipboard-check';
              size = focused ? 25 : 20;
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })
      }
    >
      <Tab.Screen name={'To-Do'} component={ToDo} options={{
              headerShown: false,
            }}/>
      <Tab.Screen name={'Done'} component={Done} options={{
              headerShown: false,
            }}/>
    </Tab.Navigator>
  );
}


const RootStack = createStackNavigator();

function App() {
  return (
    <Provider store = {Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTintColor: '#2F2F2F',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold'
            }
          }}
        >
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          
          <RootStack.Screen
            name="TasksExercice"
            component={TasksExercice}
          />
          <RootStack.Screen
            name="My Tasks"
            component={HomeTabs}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
          />
          <RootStack.Screen
            name="Camera"
            component={Camera}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;