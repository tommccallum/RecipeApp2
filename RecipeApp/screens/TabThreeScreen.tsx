import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { ThemedText, ThemedView } from '../components/Themed';
import * as IntentLauncher from 'expo-intent-launcher';
import Notes from "../components/Notes";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Tab Three</ThemedText>
      <ThemedView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Notes></Notes>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
