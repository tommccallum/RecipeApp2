import React from 'react';
import { View, TextInput, TextInputProps, TextPropTypes } from 'react-native';
import { StyleSheet } from 'react-native';

export default function SearchBox() 
{
    return (
        <View>
            <TextInput style={styles.searchBox}
            placeholder={"Recipe Search"}
            ></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        padding: 10,
        borderColor: "#eeeeee",
        borderWidth: 1,
        borderRadius:15,
    }
});