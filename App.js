import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';


export default class MyComponent extends Component {
  
  constructor() {
  
    super();

    this.state = {
      text: ''
    }
  
  }

  render() {

    return (
      <View style={styles.container }>

        
        <Text>
          test post pls ignore
        </Text>
        < TextInput style={styles.text}
          label='Email'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
      </View>

    );

  };
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    width: '100%'
  }
});
