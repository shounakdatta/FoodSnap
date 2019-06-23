// Login.js
import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import firebase from './firebase';


export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    static navigationOptions = () => {
        return {
            headerLeft: null,
            headerTitle: 'FoodSnap',
            headerTitleContainerStyle: {
                justifyContent: 'center'
            }
        }
    }
 
    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('ImageUpload'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (

            <View style={styles.container}>         

                <Text style={{ fontSize: 30 }}>Log In</Text>
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
                    title="Login"
                    style={styles.button}
                    mode='contained'
                    onPress={this.handleLogin}>
                    Login
                </Button>

                <TouchableWithoutFeedback
                    onPress={() =>
                        this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.touchable}>
                    Sign Up!
                    </Text>

                </TouchableWithoutFeedback>




            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        marginTop: '5%',
        height: '8%',
        width: '80%'
    },

    container: {
        padding:'10%',
        flex: 1,
        elevation: 5,
        alignItems: 'center'
    },

    touchable: {
        color: '#6200ea',
        marginTop: '5%',
        height: '8%',
        width: '80%',
        textAlign: 'center'
    },
    
    textInput: {
        height: '10%',
        width: '90%',
        borderWidth: 1,
        marginTop: '2%',
    }
})