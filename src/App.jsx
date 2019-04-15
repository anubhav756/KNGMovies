import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Header from './components/Header';
import AlbumArt from './components/AlbumArt';
import TrackDetails from './components/TrackDetails';
import SeekBar from './components/SeekBar';
import Controls from './components/Controls';
import { Player } from 'react-native-audio-toolkit';

export default class App extends Component {
    componentDidMount() {
        this.player = new Player(
            'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', {
                continuesToPlayInBackground: true,
            }
        );

        this.player.play();
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    message="Playing from library"
                />
                <AlbumArt uri="https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Blurryface_by_Twenty_One_Pilots.png/220px-Blurryface_by_Twenty_One_Pilots.png" />
                <TrackDetails
                    title="Stressed Out"
                    artist="Twenty One Pilots"
                />
                <SeekBar
                    trackLength={204}
                    currentPosition={156}
                />
                <Controls />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4, 4, 4)',
    },
});
