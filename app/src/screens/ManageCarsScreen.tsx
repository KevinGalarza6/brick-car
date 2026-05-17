import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';
import { api } from '../services/api';

export const ManageCarsScreen = ({ navigation }: any) => {
    const [cars, setCars] = useState<any[]>([]);

    // Todos os estados do Formulário
    const [editingId, setEditingId] = useState<string | null>(null);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [mileage, setMileage] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [color, setColor] = useState('');
    const [city, setCity] = useState('');
    const [acceptsTrade, setAcceptsTrade] = useState('');
    const [price, setPrice] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // 1. Carregar dados ao abrir a tela
    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        try {
            const data = await api.getCars();
            setCars(data);
        } catch (e) {
            console.error("Erro ao buscar dados da API", e);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
    };

    // CREATE & UPDATE
    const handleSave = async () => {
        if (!brand || !model || !price || !city) {
            Alert.alert('Erro', 'Preencha pelo menos Marca, Modelo, Preço e Cidade.');
            return;
        }

        const carData = {
            brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone,
            imageUrl: imageUrl || 'https://via.placeholder.com/800x600.png?text=Sem+Foto'
        };

        try {
            if (editingId) {
                await api.updateCar(editingId, carData);
                Alert.alert('Sucesso', 'Anúncio atualizado com sucesso!');
            } else {
                await api.createCar(carData);
                Alert.alert('Sucesso', 'Novo veículo anunciado!');
            }
            resetForm();
            loadCars(); // Recarrega a lista do banco
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao salvar no banco de dados.');
        }
    };

    const handleEdit = (car: any) => {
        setEditingId(String(car.id));
        setBrand(car.brand);
        setModel(car.model);
        setYear(car.year);
        setMileage(car.mileage);
        setTransmission(car.transmission);
        setFuelType(car.fuelType);
        setColor(car.color);
        setCity(car.city);
        setAcceptsTrade(car.acceptsTrade);
        setPrice(car.price);
        setContactPhone(car.contactPhone);
        setImageUrl(car.imageUrl);
    };

    const handleDelete = (id: string) => {
        Alert.alert('Atenção', 'Deseja realmente excluir este anúncio?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.deleteCar(id);
                        loadCars(); // Recarrega a lista
                    } catch (error) {
                        Alert.alert('Erro', 'Não foi possível excluir o veículo.');
                    }
                }
            }
        ]);
    };

    const resetForm = () => {
        setEditingId(null); setBrand(''); setModel(''); setYear(''); setMileage('');
        setTransmission(''); setFuelType(''); setColor(''); setCity('');
        setAcceptsTrade(''); setPrice(''); setContactPhone(''); setImageUrl('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.background} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Painel do Vendedor</Text>
                <View style={{ width: 24 }} />
                {/* View vazia apenas para manter o título centralizado */}
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <FlatList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={(
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>{editingId ? 'Editar Anúncio' : 'Novo Anúncio'}</Text>

                            <View style={styles.inputRow}>
                                <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="Marca" value={brand} onChangeText={setBrand} />
                                <TextInput style={[styles.input, { flex: 2 }]} placeholder="Modelo" value={model} onChangeText={setModel} />
                            </View>

                            <View style={styles.inputRow}>
                                <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="Ano (ex: 22/23)" value={year} onChangeText={setYear} />
                                <TextInput style={[styles.input, { flex: 1 }]} placeholder="KM" keyboardType="numeric" value={mileage} onChangeText={setMileage} />
                            </View>

                            <View style={styles.inputRow}>
                                <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="Câmbio" value={transmission} onChangeText={setTransmission} />
                                <TextInput style={[styles.input, { flex: 1 }]} placeholder="Combustível" value={fuelType} onChangeText={setFuelType} />
                            </View>

                            <View style={styles.inputRow}>
                                <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="Cor" value={color} onChangeText={setColor} />
                                <TextInput style={[styles.input, { flex: 1 }]} placeholder="Aceita Troca? (Sim/Não)" value={acceptsTrade} onChangeText={setAcceptsTrade} />
                            </View>

                            <TextInput style={styles.input} placeholder="Cidade - UF" value={city} onChangeText={setCity} />
                            <TextInput style={styles.input} placeholder="Preço (ex: R$ 35.000,00)" value={price} onChangeText={setPrice} />
                            <TextInput style={styles.input} placeholder="Telefone de Contato" keyboardType="phone-pad" value={contactPhone} onChangeText={setContactPhone} />
                            <TextInput style={styles.input} placeholder="URL da Imagem (Link da foto)" value={imageUrl} onChangeText={setImageUrl} />

                            <View style={styles.actionRow}>
                                {!!editingId && (
                                    <TouchableOpacity style={styles.btnCancel} onPress={resetForm}>
                                        <Text style={styles.btnCancelText}>Cancelar</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                                    <Text style={styles.btnSaveText}>{editingId ? 'Salvar Alterações' : 'Publicar Anúncio'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.carCard}>
                            <Image source={{ uri: item.imageUrl }} style={styles.carImage} />

                            <View style={styles.carInfo}>
                                <Text style={styles.carName}>{item.brand} {item.model}</Text>
                                <Text style={styles.carDetailsText}>{item.year} • {item.mileage} km</Text>
                                <Text style={styles.carPrice}>{item.price}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
                                    <Ionicons name="pencil" size={20} color={theme.colors.secondary} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
                                    <Ionicons name="trash" size={20} color={theme.colors.danger} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { backgroundColor: theme.colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    headerTitle: { color: theme.colors.background, fontSize: 18, fontWeight: 'bold' },
    listContent: { paddingBottom: 20 },
    formContainer: { padding: 16, backgroundColor: '#E5F0ED', marginBottom: 16 },
    formTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 16 },
    inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
    input: { backgroundColor: theme.colors.background, borderRadius: 8, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#D0E0DB', fontSize: 14 },
    actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
    btnSave: { backgroundColor: theme.colors.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, marginLeft: 10 },
    btnSaveText: { color: theme.colors.background, fontWeight: 'bold', fontSize: 16 },
    btnCancel: { backgroundColor: 'transparent', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, borderWidth: 1, borderColor: theme.colors.danger },
    btnCancelText: { color: theme.colors.danger, fontWeight: 'bold', fontSize: 16 },
    carCard: { flexDirection: 'row', backgroundColor: theme.colors.background, borderRadius: 12, padding: 10, marginHorizontal: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0' },
    carImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#E0E0E0' },
    carInfo: { flex: 1, marginLeft: 12 },
    carName: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
    carDetailsText: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
    carPrice: { fontSize: 15, color: theme.colors.primary, marginTop: 4, fontWeight: 'bold' },
    actionButtons: { flexDirection: 'row', alignItems: 'center' },
    iconBtn: { padding: 8, marginLeft: 4 },
});