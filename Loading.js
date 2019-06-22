// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import SignUp from './SignUp';

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
            this.props.navigation.naviate(user ? 'Main' : 'SignUp')
        })
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

