
import React from 'react';
import { StyleSheet, View, SafeAreaView, SectionList } from 'react-native';
import Constants from 'expo-constants';
import { Button, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

export default function BurgerButton({navigation}:{navigation:any}) {
    return (
        <View>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
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
    