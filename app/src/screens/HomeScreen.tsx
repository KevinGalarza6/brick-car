import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { VehicleCard } from '../components/VehicleCard';
import { theme } from '../theme/colors';
import { api } from '../services/api';

export const HomeScreen = ({ navigation }: any) => {
    const [cars, setCars] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Deseja realmente sair da conta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: () => navigation.replace('Login') // Redireciona para o Login
                }
            ]
        );
    };

    useFocusEffect(
        useCallback(() => {
            loadCars();
        }, [])
    );

    const loadCars = async () => {
        setLoading(true);
        try {
            const data = await api.getCars();
            setCars(data);
        } catch (e) {
            console.error("Erro ao carregar dados na Home da API", e);
        } finally {
            setLoading(false);
        }
    };

    const filteredCars = cars.filter(car => {
        const search = searchText.toLowerCase();
        return (
            car.brand?.toLowerCase().includes(search) ||
            car.model?.toLowerCase().includes(search)
        );
    });

    const recommendedCars = filteredCars.slice(0, 3);
    const recentCars = [...filteredCars].reverse();
    const bestSellers = filteredCars.slice(Math.max(0, filteredCars.length - 3));

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: 12, color: theme.colors.textSecondary }}>Buscando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Brick Car</Text>

                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ marginRight: 15 }}>
                        <Ionicons name="heart-outline" size={24} color={theme.colors.background} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ManageCars')} style={{ marginRight: 15 }}>
                        <Ionicons name="settings-outline" size={24} color={theme.colors.background} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout}>
                        <Ionicons name="person-circle-outline" size={24} color={theme.colors.background} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Busque aqui..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {filteredCars.length > 0 ? (
                    <>
                        <Text style={styles.sectionTitle}>Recomendados para você</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {recommendedCars.map(car => (
                                <VehicleCard
                                    key={`rec-${car.id}`}
                                    model={car.model}
                                    imageUrl={car.imageUrl}
                                    onPress={() => navigation.navigate('CarDetails', { carId: car.id })}
                                />
                            ))}
                        </ScrollView>

                        <Text style={styles.sectionTitle}>Anunciados Recentes</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {recentCars.map(car => (
                                <VehicleCard
                                    key={`recent-${car.id}`}
                                    model={car.model}
                                    imageUrl={car.imageUrl}
                                    onPress={() => navigation.navigate('CarDetails', { carId: car.id })}
                                />
                            ))}
                        </ScrollView>
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum veículo encontrado.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E5F0ED' },
    header: { backgroundColor: theme.colors.primary, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { color: theme.colors.background, fontSize: 20, fontWeight: 'bold' },
    headerButtons: { position: 'absolute', right: 16, flexDirection: 'row', alignItems: 'center' },
    searchContainer: { padding: 16 },
    searchInput: { backgroundColor: theme.colors.background, borderRadius: 20, paddingHorizontal: 16, height: 40 },
    scrollContent: { paddingBottom: 100 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginBottom: 12, marginTop: 8 },
    horizontalScroll: { paddingLeft: 16 },
    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: theme.colors.textSecondary }
});