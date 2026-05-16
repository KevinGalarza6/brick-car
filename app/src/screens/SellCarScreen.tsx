import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export const SellCarScreen = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Venda seu veiculo</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.photoGrid}>
                    <TouchableOpacity style={styles.photoBox}><Ionicons name="camera-outline" size={30} color={theme.colors.textSecondary} /><Text style={styles.photoText}>Frente</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.photoBox}><Ionicons name="camera-outline" size={30} color={theme.colors.textSecondary} /><Text style={styles.photoText}>Lateral Dir.</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.photoBox}><Ionicons name="camera-outline" size={30} color={theme.colors.textSecondary} /><Text style={styles.photoText}>Lateral Esq.</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.photoBox}><Ionicons name="camera-outline" size={30} color={theme.colors.textSecondary} /><Text style={styles.photoText}>Traseira</Text></TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Descrição do veiculo</Text>

                <TextInput style={styles.input} placeholder="Digite a Marca" placeholderTextColor={theme.colors.textSecondary} value={brand} onChangeText={setBrand} />
                <TextInput style={styles.input} placeholder="Digite o Modelo" placeholderTextColor={theme.colors.textSecondary} value={model} onChangeText={setModel} />

                <Text style={styles.sectionTitle}>Dados Finais</Text>
                <TextInput style={styles.input} placeholder="Informe o valor R$" keyboardType="numeric" placeholderTextColor={theme.colors.textSecondary} value={price} onChangeText={setPrice} />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descrição Adicional..."
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    numberOfLines={4}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonSecondary}>
                        <Text style={styles.buttonSecondaryText}>Excluir dados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPrimary}>
                        <Text style={styles.buttonPrimaryText}>Publicar</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { backgroundColor: theme.colors.primary, padding: 16, alignItems: 'center' },
    headerTitle: { color: theme.colors.background, fontSize: 18, fontWeight: 'bold' },
    content: { padding: 20 },
    photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
    photoBox: { width: '48%', height: 100, backgroundColor: '#F5F5F5', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0', borderStyle: 'dashed' },
    photoText: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 10, marginTop: 10 },
    input: { borderBottomWidth: 1, borderBottomColor: theme.colors.textSecondary, paddingVertical: 10, marginBottom: 15, fontSize: 16, color: theme.colors.textPrimary },
    textArea: { borderBottomWidth: 0, borderWidth: 1, borderColor: theme.colors.textSecondary, borderRadius: 8, padding: 10, textAlignVertical: 'top' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
    buttonSecondary: { flex: 1, padding: 16, borderRadius: 25, alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: theme.colors.danger },
    buttonSecondaryText: { color: theme.colors.danger, fontWeight: 'bold' },
    buttonPrimary: { flex: 1, backgroundColor: theme.colors.primary, padding: 16, borderRadius: 25, alignItems: 'center', marginLeft: 10 },
    buttonPrimaryText: { color: theme.colors.background, fontWeight: 'bold' },
});