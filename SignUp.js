// SignUp.js
import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import firebase from './firebase';


export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('ImageUpload'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (

            <View style={styles.container}>
            
                <Text style={{fontSize: 30}}>Sign Up</Text>
                {this.state.errorMessage &&

                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
            
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
            
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
            
                <Button 
                    title="Sign Up" 
                    style={styles.button}
                    mode='contained'
                    onPress={this.handleSignUp}
                >
                    Sign Up
                </Button>
            
                <TouchableWithoutFeedback
                    onPress={() =>
                    this.props.navigation.navigate('Login')}>
                    <Text style = {styles.touchable}>
                        Already have an account? Login
                    </Text>                        
                
                </TouchableWithoutFeedback>
            
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        marginTop: '5%',
        height: '8%',
        width: '80%'
    },

    touchable: {
        color: '#6200ea',
        marginTop: '5%',
        height: '8%',
        width: '80%',
        textAlign: 'center'
    },

    container: {
        padding: '10%',
        flex: 1,
        elevation: 5,
        alignItems: 'center'
    },

    textInput: {
        height: '10%',
        width: '90%',
        borderWidth: 1,
        marginTop: '2%',
    }
})