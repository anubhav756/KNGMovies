import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const TrackDetails = ({
    title,
    artist,
    onAddPress,
    onMorePress,
    onTitlePress,
    onArtistPress,
}) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onAddPress}>
            <View style={styles.buttonContainer}>
                <Image
                    source={require('../../assets/images/baseline_add_white_18dp.png')}
                    style={styles.buttonIcon}
                />
            </View>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
            <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
            <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
        </View>
        <TouchableOpacity onPress={onMorePress}>
            <View style={styles.buttonContainer}>
                <Image
                    source={require('../../assets/images/baseline_more_horiz_white_18dp.png')}
                    style={styles.buttonIcon}
                />
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        paddingRight: 20,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    artist: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 12,
        marginTop: 4,
    },
    buttonContainer: {
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        opacity: 0.72,
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        height: 20,
        width: 20,
    },
});

export default TrackDetails;
