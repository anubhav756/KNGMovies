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
    constructor(props) {
        super(props);

        this.state = {
            paused: true,
            seeking: false,
            trackLength: 0,
            currentPosition: 0,
        };

        this.player = new Player(
            'https://kngmovies.com/wp-content/uploads/2019/02/dtod-5jan.mp3', {
                continuesToPlayInBackground: true,
            }
        );
        this.player.prepare(() => {
            this.setState({ trackLength: Math.floor(this.player.duration / 1000) });

            setInterval(() => {
                const {
                    currentPosition,
                    seeking,
                } = this.state;
                const newPosition = Math.floor(this.player.currentTime / 1000);

                if (!seeking && newPosition !== currentPosition) {
                    this.setState({ currentPosition: newPosition });
                }
            })
        });

        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
    }
    handleSeek(seeking, time) {
        const newPosition = Math.floor(parseInt(time, 10));

        if (seeking) {
            this.togglePlayPause(true);
            this.setState({
                seeking,
                currentPosition: newPosition,
            });
        } else {
            this.player.seek(newPosition * 1000, (err) => {
                const { paused } = this.state;

                if (!err) {
                    this.setState({ seeking: false });

                    if (!paused) {
                        this.togglePlayPause(false);
                    }
                }
            });
        }
    }
    togglePlayPause(paused) {
        const callback = err => !err && this.setState({ paused });

        if (paused) {
            if (this.player.state === 4) this.player.pause(callback);
        } else {
            this.player.play(callback);
        }
    }
    render() {
        const {
            paused,
            trackLength,
            currentPosition,
        } = this.state;

        return (
            <View style={styles.container}>
                <Header message="Playing from library" />
                <AlbumArt uri="https://kngmovies.com/wp-content/themes/dtod/assets/images/slider/slider1.jpg" />
                <TrackDetails
                    title="DTOD - Chapter One"
                    artist="KNG TEAM"
                />
                <SeekBar
                    trackLength={trackLength}
                    currentPosition={currentPosition}
                    handleSeek={this.handleSeek}
                />
                <Controls
                    paused={paused}
                    togglePlayPause={this.togglePlayPause}
                />
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
