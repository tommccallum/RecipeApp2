import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import NotFoundScreen from '../screens/NotFoundScreen';
// import { RootStackParamList } from '../types';
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

export type RootStackParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

function SettingsScreen() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const NewRecipeBottomTabs = createBottomTabNavigator();

interface UserData {
  localUri: string
}
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { ThemedText, ThemedView } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { basename } from 'path'
import * as FileSystem from 'expo-file-system';
function onRecipeFromCamera() {
  const [selectedImage, setSelectedImage] = React.useState<UserData|null>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult)
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }
  
  let openCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult)
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    if ( selectedImage != null ) {
      await Sharing.shareAsync(selectedImage.localUri);
    }
  }; 

  if (selectedImage !== null) {
    const image_filename = basename(selectedImage.localUri)
    const dest = FileSystem.documentDirectory + image_filename
    console.log("DocumentDirectory: "+FileSystem.documentDirectory)
    console.log("SOURCE: "+selectedImage.localUri)
    console.log("BASENAME: "+image_filename)
    console.log("DESTINATION: "+dest)
    FileSystem.getInfoAsync(dest)
    .then((fileInfo) => {
      if ( !fileInfo.exists ) {
        console.log("Copying file to local area")
        FileSystem.copyAsync({ from: selectedImage.localUri, to: dest})
      }
    });
    

    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <ThemedText
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </ThemedText>

        
        <ThemedText
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </ThemedText>

        <TouchableOpacity
        onPress={openCameraAsync}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>
        </TouchableOpacity>

        
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <ThemedText style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

function onRecipeFromGallery() {

}

function onRecipeFromWebpage() {

}

function onRecipeFromManual() {

}

// The new recipe screen needs to capture:
//    a name of the recipe
//    some tags about the recipe
//    one or more images of the recipe
//    
// 3 buttons 
//    - from webpage (receive from share), // this is not possible with expo.
//    - from camera,
//    - from files,
//    - manual entry
//    - from voice?
function SelectRecipeSourceScreen({navigation}:{navigation:any}) {
  return (<View>
      <Button onPress={() => navigation.navigate("RecipeFromCamera")} title="Use camera" accessibilityLabel="Use the camera to take a picture of a recipe" />
      <Button onPress={onRecipeFromGallery} title="Gallery" accessibilityLabel="Find a picture in the gallery" />
      <Button onPress={onRecipeFromWebpage} title="Webpage" accessibilityLabel="Add a url" />
      <Button onPress={onRecipeFromManual} title="Manual" accessibilityLabel="Manually enter a recipe" />
    </View>)
}


function NewRecipeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SelectRecipeSource" component={SelectRecipeSourceScreen}/>
      <Stack.Screen name="RecipeFromCamera" component={onRecipeFromCamera}/>
    </Stack.Navigator>
  )
}

function ShoppingListScreen() {
  return (
    <View>
      <Text>Shopping List Screen</Text>
    </View>
  )
}

const Stack = createStackNavigator();
const SideDrawerNavigator = createDrawerNavigator();

function ThreeScreenContainer() {
  return (<Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="TabOne" component={TabOneScreen}/>
            <Stack.Screen name="TabTwo" component={TabTwoScreen}/>
            <Stack.Screen name="TabThree" component={TabThreeScreen}/>
          </Stack.Navigator>);
}

function DrawerNavigator() {
  return (
    <SideDrawerNavigator.Navigator initialRouteName="Settings" drawerPosition="right">
      <SideDrawerNavigator.Screen name="Settings" component={SettingsScreen} />        
      <SideDrawerNavigator.Screen name="New Recipe" component={NewRecipeStack} />        
      <SideDrawerNavigator.Screen name="Recipes" component={BottomTabNavigator} />
      <SideDrawerNavigator.Screen name="Shopping Lists" component={ShoppingListScreen} />
    </SideDrawerNavigator.Navigator>
  )
}

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
// NavigationContainer connects our app state to the app environment, takes care of platform specific integration, handles back button
// Linking handles
export default function TopLevelNavigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Root"
          component={DrawerNavigator}
          options={
            ({ navigation }) => {
              console.log(navigation)
              return {
                headerTitle: props => <HeaderBar navigation={navigation}/>
              }
            }
        }
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

/**
 * <Stack.Screen name="Root" 
          component={BottomTabNavigator} 
          options={({ navigation, route }) => ({
            headerTitle: props => <HeaderBar navigation={navigation}/>
          })}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
 */

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/images/icon.png')}
    />
  );
}

// TODO show drawer navigator when burger pressed, but still keep the stack navigator in place.


function RootNavigator() {
  // headerShown: false shows the name of the page
  // headerShown: true  shows the header bar at top of the screen
  return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Root" 
          component={DrawerNavigator} //{BottomTabNavigator} 
          options={({ navigation, route }) => ({
            headerTitle: props => <HeaderBar navigation={navigation}/>
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