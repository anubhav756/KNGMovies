import React from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const AlbumArt = ({
    uri,
    onPress,
}) => (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );

const { width } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    image: {
        width: imageSize,
        height: imageSize,
    }
});

export default AlbumArt;
