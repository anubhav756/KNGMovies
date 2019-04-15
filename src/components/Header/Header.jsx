import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const Header = ({
    message,
    onDownPress,
    onQueuePress,
    onMessagePress,
}) => (
        <View style={styles.container}>
            <TouchableOpacity onPress={onDownPress}>
                <Image
                    source={require('../../assets/images/baseline_keyboard_arrow_down_white_18dp.png')}
                    style={styles.button}
                />
            </TouchableOpacity>
            <Text
                onPress={onMessagePress}
                style={styles.message}
            >
                {message.toUpperCase()}
            </Text>
            <TouchableOpacity onPress={onQueuePress}>
                <Image
                    source={require('../../assets/images/baseline_queue_music_white_18dp.png')}
                    style={styles.button}
                />
            </TouchableOpacity>
        </View>
    );

const styles = StyleSheet.create({
    container: {
        height: 72,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
    },
    message: {
        flex: 1,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 10,
    },
    button: {
        opacity: 0.72,
    },
});

export default Header;
