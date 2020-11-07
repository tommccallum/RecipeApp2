import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { ThemedText, ThemedView } from './Themed';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { basename } from 'path'
import * as FileSystem from 'expo-file-system';

interface UserData {
  localUri: string
}

export default function EditScreenInfo({ path }: { path: string }) {
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
      <ThemedView style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <ThemedText style={styles.buttonText}>Share this photo</ThemedText>
        </TouchableOpacity>
        
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ThemedView style={styles.getStartedContainer}>
        <ThemedText
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </ThemedText>

        <ThemedView
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </ThemedView>

        <ThemedText
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </ThemedText>

        <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: 'blue' }}>
        <ThemedText style={{ fontSize: 20, color: '#fff' }}>Pick a photo</ThemedText>
        </TouchableOpacity>

        
      </ThemedView>

      <ThemedView style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <ThemedText style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
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
