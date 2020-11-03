import { createMultiStyleIconSet } from 'expo-vector-icons';
import React, { Component } from 'react';
import { View, TextInput, TextInputProps, TextPropTypes } from 'react-native';

const UselessTextInput = ( props : TextInputProps ) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      autoCompleteType={"off"}
      autoCorrect={true}
      autoFocus={true}
    />
  );
};

export default function Notes() {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: value,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}>
      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    </View>
  );
}
