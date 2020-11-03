
import React from 'react';
import { StyleSheet, View, SafeAreaView, SectionList } from 'react-native';
import Constants from 'expo-constants';
import { Button, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function onHamburgerClick() {
    console.log("click!")
}

export default function BurgerButton({drawer}:{drawer:JSX.Element}) {
    return (
        <View>
        <TouchableOpacity onPress={onHamburgerClick}>
            <Image 
            style = {styles.burger}
            source={require("../assets/images/burger.png")}
            />
        </TouchableOpacity>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      burger: {
        marginRight:15,
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        width: 50,
        height: 50
      },
    });
    