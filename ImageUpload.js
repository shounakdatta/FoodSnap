import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location'
import { storage } from './firebase'

const API_HOST = 'https://shounakdatta.api.stdlib.com/food-snap@dev/PostToSlack/'

export default class ImageUploadScreen extends Component {
    state = {
        image: null,
        name: null,
        location: {}
    };

    componentDidMount() {
        this.getLocation().then(
            ({ latitude, longitude }) => this.setState(
                { location: { latitude, longitude } }
            )
        )
    }

    getLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
            throw new Error('Location permission not granted');
        }
    }

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA)
        const { uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        const name = uri.split('/').slice(-1)[0]
        const { uri: compressedUri } = await ImageManipulator.manipulateAsync(
            uri, [],
            {
                compress: 0.4,
                format: ImageManipulator.SaveFormat.JPEG
            }
        );
        this.setState({ image: compressedUri, name });
    };

    handleUpload = async () => {
        const { image: uri, name, location } = this.state
        const response = await fetch(uri);
        const blob = await response.blob();
        const task = storage.ref(`images/${name}`).put(blob)
        task.on(
            'state_changed',
            (snapshot) => {
                // Progress function
            },
            (error) => {
                // Error function
                console.log(error);
            },
            async (complete) => {
                // Complete function
                console.log('Upload Success!');
                const imageUrl = await storage.ref('images').child(name).getDownloadURL()
                const response = await fetch(
                    API_HOST, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            imageUrl,
                            location
                        }),
                    }
                ).then(res => res.json())
                console.log(response);

            }
        )
    }

    removeImage = () => {
        const { image } = this.state
        this.setState({
            image: null,
        })
    }

    download = () => {
        const { name } = this.state
        storage.ref('images').child(name).getDownloadURL().then(
            uri => console.log(uri)
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.state.image }} />
                <View style={styles.row}>
                    <Button onPress={this.takePicture}>Camera</Button>
                    <Button onPress={this.handleUpload}>Upload</Button>
                </View>
                <View style={styles.row}>
                    <Button onPress={this.removeImage}>Remove</Button>
                    <Button onPress={this.download}>Download</Button>
                </View>
            </View>
        );
    }
}

const Button = ({ onPress, children }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
    },
    row: { flexDirection: 'row' },
    image: { width: 300, height: 300, backgroundColor: 'gray' },
    button: {
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
