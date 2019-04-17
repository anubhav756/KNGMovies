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
import {
    Player,
    MediaStates,
} from 'react-native-audio-toolkit';


const INITIAL_STATE = {
    paused: true,
    seeking: false,
    preparing: true,
    trackLength: 0,
    currentPosition: 0,
};

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.preparePlayer('https://kngmovies.com/wp-content/uploads/2019/02/dtod-5jan.mp3')

        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
    }
    componentDidMount() {
        this.progressInterval = setInterval(() => {
            const {
                seeking,
                currentPosition,
            } = this.state;
            const newPosition = Math.floor(this.player.currentTime / 1000);

            if (!seeking && newPosition !== currentPosition) {
                this.setState({ currentPosition: newPosition === -1 ? 0 : newPosition });
            }
        });
    }
    componentWillUnmount() {
        this.player.destroy();
        clearInterval(this.progressInterval);
    }
    preparePlayer(url) {
        this.player = new Player(url, { continuesToPlayInBackground: true });
        this.player.prepare(() => {
            this.setState({
                preparing: false,
                trackLength: Math.floor(this.player.duration / 1000),
            });
        });
        this.player.on('error', (err) => {
            console.log('ERROR:', err);
            this.setState(INITIAL_STATE);
        });
        this.player.on('ended', () => {
            this.player.destroy();
            this.setState(INITIAL_STATE);
            this.preparePlayer(url);
        });
    }
    handleSeek(seeking, time) {
        const { trackLength } = this.state;
        const newPosition = Math.floor(parseInt(time, 10));

        if (seeking) {
            this.setState({
                seeking,
                currentPosition: Math.min(newPosition, trackLength),
            });
        } else if (this.player.state !== 1) {
            this.player.seek(Math.min(newPosition * 1000, this.player.duration), (err) => {
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
            this.player.pause(callback);
        } else {
            this.player.play(callback);
        }
    }
    render() {
        const {
            paused,
            preparing,
            trackLength,
            currentPosition,
        } = this.state;

        return (
            <View style={styles.container}>
                <Header message="Dark Truth of Desires" />
                <AlbumArt uri="https://kngmovies.com/wp-content/themes/dtod/assets/images/slider/slider1.jpg" />
                <TrackDetails
                    title="Chapter One"
                    artist="KNG TEAM"
                />
                <SeekBar
                    disabled={preparing}
                    trackLength={trackLength}
                    currentPosition={currentPosition}
                    handleSeek={this.handleSeek}
                />
                <Controls
                    paused={paused}
                    disabled={preparing}
                    forwardDisabled
                    togglePlayPause={this.togglePlayPause}
                    onBack={() => {
                        this.handleSeek(true, 0);
                        setTimeout(() => this.handleSeek(false, 0));
                    }}
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
