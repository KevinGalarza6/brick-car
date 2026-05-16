import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/colors';

interface VehicleCardProps {
    model: string;
    imageUrl: string;
    onPress: () => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ model, imageUrl, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{model}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        overflow: 'hidden',
        width: 110,
        marginRight: 12,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 80,
        backgroundColor: theme.colors.textSecondary,
    },
    infoContainer: {
        padding: 8,
        alignItems: 'center',
    },
    title: {
        color: theme.colors.background,
        fontSize: 14,
        fontWeight: 'bold',
    },
});