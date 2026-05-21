import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { VehicleCard } from '../components/VehicleCard';
import { theme } from '../theme/colors';

export const FavoritesScreen = ({ navigation }: any) => {
    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const loadFavorites = async () => {
                setLoading(true);
                try {
                    const data = await api.getFavorites();
                    setFavs(data);
                } catch (error) {
                    console.error("Erro ao buscar favoritos:", error);
                } finally {
                    setLoading(false);
                }
            };
            loadFavorites();
        }, [])
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.background} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Favoritos</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={favs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <VehicleCard
                        model={item.model}
                        imageUrl={item.imageUrl}
                        onPress={() => navigation.navigate('CarDetails', { carId: item.id })}
                    />
                )}
                contentContainerStyle={styles.listPadding}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    headerTitle: { color: theme.colors.background, fontSize: 18, fontWeight: 'bold' },
    listPadding: { padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: theme.colors.textSecondary, fontSize: 16 }
});