import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import TopLevelNavigation from './navigation';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // temporary files that will be removed
  console.log("Cache Directory: "+FileSystem.cacheDirectory)
  // permanent files until explicitly removed
  console.log("Document Directory: "+FileSystem.documentDirectory)

  // create a new database if it does not exist
  //const db = SQLite.openDatabase("recipes.sqlite")

  // db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
  //   console.log('Foreign keys turned on')
  // );


  // the <StatusBar/> styles the very top bar of the phone with OS icons etc.
  // SafeAreaProvider ensures the graphics stays within the phone bounds. (basically a view with padding appropriate for phone)
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>        
        <TopLevelNavigation colorScheme={colorScheme} />
        <StatusBar/>
      </SafeAreaProvider>
    );
  }
}
