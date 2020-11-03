import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { Image } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideBar from "../components/SideBar";
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import HeaderBar from '../components/HeaderBar'

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}


function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/images/icon.png')}
    />
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Recipes">
        <Drawer.Screen name="New Recipe" component={TabOneScreen} />
        <Drawer.Screen name="Recipes" component={TabTwoScreen} />
        <Drawer.Screen name="Shopping Lists" component={TabThreeScreen} />
      </Drawer.Navigator>
  )
}
function RootNavigator() {
  // headerShown: false shows the name of the page
  // headerShown: true  shows the header bar at top of the screen
  return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Root" 
          component={BottomTabNavigator} 
          options={({ navigation, route }) => ({
            headerTitle: props => <HeaderBar/>
          })}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
  );
}



// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="New Recipe" component={TabOneScreen} />
//       <Drawer.Screen name="Recipes" component={TabTwoScreen} />
//       <Drawer.Screen name="Shopping Lists" component={TabThreeScreen} />
//     </Drawer.Navigator>
//   )
// }