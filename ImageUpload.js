import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { storage } from './firebase'

export default class ImageUploadScreen extends Component {
    state = {
        image: null,
        name: null
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        const name = uri.split('/').slice(-1)[0]
        this.setState({ image: uri, name });
    };

    handleUpload = async () => {
        const { image: uri, name } = this.state
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(name);
        // const blob = new Blob([image], { type: "image/jpg" }, name);
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
            (complete) => {
                // Complete function
                console.log('Upload Success!');
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
