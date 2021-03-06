import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

const Controls = ({
    paused,
    disabled,
    togglePlayPause,
    shuffleOn,
    repeatOn,
    onBack,
    onForward,
    onPressShuffle,
    onPressRepeat,
    forwardDisabled,
}) => (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
                <Image
                    source={require('../../assets/images/baseline_shuffle_white_18dp.png')}
                    style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
                />
            </TouchableOpacity>
            <View style={{ width: 40 }} />
            <TouchableOpacity onPress={onBack}>
                <Image
                    source={require('../../assets/images/baseline_skip_previous_white_18dp.png')}
                />
            </TouchableOpacity>
            <View style={{ width: 20 }} />
            {
                !paused
                    ? (
                        <TouchableOpacity disabled={disabled} onPress={() => togglePlayPause(true)}>
                            <View style={[styles.playButton, disabled ? styles.off : {}]}>
                                <Image source={require('../../assets/images/baseline_pause_white_18dp.png')} />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity disabled={disabled} onPress={() => togglePlayPause(false)}>
                            <View style={[styles.playButton, disabled ? styles.off : {}]}>
                                <Image source={require('../../assets/images/baseline_play_arrow_white_18dp.png')} />
                            </View>
                        </TouchableOpacity>
                    )
            }
            <View style={{ width: 20 }} />
            <TouchableOpacity
                onPress={onForward}
                disabled={forwardDisabled}
            >
                <Image
                    source={require('../../assets/images/baseline_skip_next_white_18dp.png')}
                    style={[forwardDisabled && styles.off]}
                />
            </TouchableOpacity>
            <View style={{ width: 40 }} />
            <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
                <Image
                    source={require('../../assets/images/baseline_repeat_white_18dp.png')}
                    style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
                />
            </TouchableOpacity>
        </View>
    );

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
    },
    playButton: {
        height: 72,
        width: 72,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 72 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryControl: {
        height: 18,
        width: 18,
    },
    off: {
        opacity: 0.30,
    },
});

export default Controls;
