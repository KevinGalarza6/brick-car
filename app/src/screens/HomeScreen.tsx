import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { VehicleCard } from '../components/VehicleCard';
import { theme } from '../theme/colors';

import initialCars from '../utils/cars.json';

const STORAGE_KEY = '@carros_na_serra_data';

export const HomeScreen = ({ navigation }: any) => {
    const [cars, setCars] = useState<any[]>([]);
    const [searchText, setSearchText] = useState(''); // Novo estado para a busca

    useFocusEffect(
        useCallback(() => {
            loadCars();
        }, [])
    );

    const loadCars = async () => {
        try {
            const storedData = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedData) {
                setCars(JSON.parse(storedData));
            } else {
                setCars(initialCars);
            }
        } catch (e) {
            console.error("Erro ao carregar dados na Home", e);
        }
    };

    // Lógica de Filtro: Filtra a lista principal com base no texto digitado
    const filteredCars = cars.filter(car => {
        const search = searchText.toLowerCase();
        return (
            car.brand.toLowerCase().includes(search) ||
            car.model.toLowerCase().includes(search)
        );
    });

    // Listas dinâmicas baseadas nos resultados filtrados
    const recommendedCars = filteredCars.slice(0, 3);
    const recentCars = [...filteredCars].reverse();
    const bestSellers = filteredCars.slice(Math.max(0, filteredCars.length - 3));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Brick Car</Text>

                <TouchableOpacity
                    style={styles.adminBtn}
                    onPress={() => navigation.navigate('ManageCars')}
                >
                    <Ionicons name="settings-outline" size={24} color={theme.colors.background} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Busque aqui..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={searchText}
                    onChangeText={setSearchText} // Atualiza o estado conforme digita
                />
                {searchText !== '' && (
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={() => setSearchText('')}
                    >
                        <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                )}
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

                        <Text style={styles.sectionTitle}>Modelos mais vendidos</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {bestSellers.map(car => (
                                <VehicleCard
                                    key={`best-${car.id}`}
                                    model={car.model}
                                    imageUrl={car.imageUrl}
                                    onPress={() => navigation.navigate('CarDetails', { carId: car.id })}
                                />
                            ))}
                        </ScrollView>
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={50} color={theme.colors.textSecondary} />
                        <Text style={styles.emptyText}>Nenhum veículo encontrado para "{searchText}"</Text>
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
    adminBtn: { position: 'absolute', right: 16 },
    searchContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 40
    },
    clearBtn: {
        position: 'absolute',
        right: 25,
    },
    scrollContent: { paddingBottom: 100 },
    sectionTitle: { color: theme.colors.textPrimary, fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginBottom: 12, marginTop: 8 },
    horizontalScroll: { paddingLeft: 16 },
    emptyContainer: { alignItems: 'center', marginTop: 50, paddingHorizontal: 20 },
    emptyText: { color: theme.colors.textSecondary, marginTop: 10, textAlign: 'center' },
    dealershipBanner: { backgroundColor: theme.colors.primary, padding: 16, position: 'absolute', bottom: 0, width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    dealershipText: { color: theme.colors.background, fontWeight: 'bold' },
    dealershipSubtext: { color: theme.colors.background, fontSize: 12, marginTop: 4 }
});