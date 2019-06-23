// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'ImageUpload' : 'Login')
        })
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


