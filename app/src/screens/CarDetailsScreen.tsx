import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme/colors';

// Importamos o JSON apenas como alternativa de segurança
import initialCars from '../utils/cars.json';

const STORAGE_KEY = '@carros_na_serra_data';

export const CarDetailsScreen = ({ route, navigation }: any) => {
    const { carId } = route.params || { carId: '1' };
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCarDetails = async () => {
            try {
                const storedData = await AsyncStorage.getItem(STORAGE_KEY);
                let carsList = initialCars;

                // Se existirem dados na memória, usamos esses (que incluem os novos cadastros)
                if (storedData) {
                    carsList = JSON.parse(storedData);
                }

                // Procura o carro pelo ID garantindo que ambos são do tipo string
                const foundCar = carsList.find((c: any) => String(c.id) === String(carId));
                setCar(foundCar);
            } catch (error) {
                console.error("Erro ao carregar detalhes do carro", error);
            } finally {
                setLoading(false);
            }
        };

        loadCarDetails();
    }, [carId]);

    // Enquanto procura na memória, mostra o ícone de carregamento
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </SafeAreaView>
        );
    }

    // Se mesmo assim não encontrar, exibe o ecrã de erro
    if (!car) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={theme.colors.background} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Erro</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Carro não encontrado.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.background} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <Image source={{ uri: car.imageUrl }} style={styles.carImage} resizeMode="cover" />

                <View style={styles.detailsContainer}>
                    <View style={styles.titleRow}>
                        {/* Garantimos que a marca e modelo aparecem completos se for adicionado no form */}
                        <Text style={styles.carName}>{car.brand} {car.model}</Text>
                        <Text style={styles.carPrice}>{car.price}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Descrição do veículo</Text>

                    <View style={styles.specsGrid}>
                        <SpecItem label="Modelo:" value={`${car.brand} ${car.model}`} />
                        <SpecItem label="Ano:" value={car.year} />
                        <SpecItem label="KM:" value={car.mileage} />
                        <SpecItem label="Câmbio:" value={car.transmission} />
                        <SpecItem label="Combustível:" value={car.fuelType} />
                        <SpecItem label="Cor:" value={car.color} />
                        <SpecItem label="Cidade:" value={car.city} />
                        <SpecItem label="Aceita troca:" value={car.acceptsTrade} />
                    </View>

                    <View style={styles.contactCard}>
                        <Text style={styles.contactTitle}>Contacto Para Dúvidas:</Text>
                        <Text style={styles.contactPhone}>{car.contactPhone}</Text>
                    </View>

                    <TouchableOpacity style={styles.favoriteButton}>
                        <Ionicons name="star-outline" size={20} color={theme.colors.primary} />
                        <Text style={styles.favoriteText}>Adicionar aos favoritos</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Sub-componente para organizar os dados
const SpecItem = ({ label, value }: { label: string, value: string }) => (
    <View style={styles.specItem}>
        <Text style={styles.specLabel}>{label}</Text>
        <Text style={styles.specValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { backgroundColor: theme.colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    headerTitle: { color: theme.colors.background, fontSize: 18, fontWeight: 'bold' },
    carImage: { width: '100%', height: 250, backgroundColor: '#E5F0ED' },
    detailsContainer: { padding: 20 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    carName: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textPrimary, flex: 1 },
    carPrice: { fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, marginLeft: 10 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: theme.colors.textPrimary },
    specsGrid: { marginBottom: 20 },
    specItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    specLabel: { color: theme.colors.textSecondary, fontSize: 14 },
    specValue: { color: theme.colors.textPrimary, fontSize: 14, fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
    contactCard: { backgroundColor: '#E5F0ED', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
    contactTitle: { color: theme.colors.textSecondary, fontSize: 14, marginBottom: 4 },
    contactPhone: { color: theme.colors.primary, fontSize: 18, fontWeight: 'bold' },
    favoriteButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 25 },
    favoriteText: { color: theme.colors.primary, fontWeight: 'bold', marginLeft: 8 },
});