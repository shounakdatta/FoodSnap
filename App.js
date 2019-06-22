import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';



export default class MyComponent extends Component {
  
  constructor() {
  
    super();

    this.state = {
      email: null,
      password: null,
      severError: false
    }
  
  }

  render() {

    return (
      <View style={styles.container }>

        <Text style={{ fontSize: 30 }}>FoodSnap</Text>

        < TextInput style={styles.text}
          label='Email'
          value={this.state.email}
          autoFocus

          onChangeText={text => this.setState({ email : text})}
        />
        < TextInput style={styles.text}
          label='Password'
          value={this.state.password}
          onChangeText={text => this.setState({ password : text })}
        />
        {
          this.state.severError ?
          <Text style={{color: 'red',textAlign: 'center'}}>
            Error Login
          </Text> :
          null  
        }


        <Button style={{ marginTop: 20, height: '5%', width: '100%'}} icon="add-a-photo" mode="contained" onPress={() => console.log('Pressed')}>
          Log in!
        </Button>       

      </View>

    )
  }

userTyping = (whichInput, event) => {
  switch(whichInput){
    case 'email':
      this.setState({email: event.target.value});
      break;
  case 'password':
    this.setState({ password: event.target.value });
    break;    
  default:
    break;

  }
}





}

 

const styles = StyleSheet.create({
  container: {
    padding: 50,
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
