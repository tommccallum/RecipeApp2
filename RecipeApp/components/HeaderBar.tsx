import React from 'react';
import { StyleSheet, View, SafeAreaView, SectionList } from 'react-native';
import BurgerButton from '../components/BurgerButton'
import SearchBox from './SearchBox'

export default function HeaderBar() {
    return (
        <View style={styles.container}>
            <View style={styles.searcharea}>
                <SearchBox></SearchBox>
            </View>
            <View>
                <BurgerButton></BurgerButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    searcharea: {
        flexGrow: 1,
        marginRight: 10,
        height: 50,
        marginTop: 10
    }
});
  