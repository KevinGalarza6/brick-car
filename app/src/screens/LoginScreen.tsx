import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons'; // Já vem no Expo

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>

                {/* Logo Placeholder */}
                <View style={styles.logoContainer}>
                    <Ionicons name="car-sport-outline" size={80} color={theme.colors.primary} />
                    <Text style={styles.appName}>CarrosNaSerra</Text>
                </View>

                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="digite seu e-mail"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="digite sua senha"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonPrimaryText}>Acessar</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>ou</Text>

                <TouchableOpacity style={styles.buttonGoogle}>
                    <Ionicons name="logo-google" size={20} color={theme.colors.textPrimary} />
                    <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerLink}>
                    <Text style={styles.registerText}>
                        Ainda não possui uma conta? <Text style={styles.registerTextBold}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { flex: 1, padding: 24, justifyContent: 'center' },
    logoContainer: { alignItems: 'center', marginBottom: 40 },
    appName: { fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginTop: 10 },
    title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 24, textAlign: 'center' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.colors.textSecondary, marginBottom: 20, paddingBottom: 8 },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 16, color: theme.colors.textPrimary },
    forgotPassword: { alignSelf: 'flex-end', marginBottom: 30 },
    forgotPasswordText: { color: theme.colors.textSecondary, fontSize: 14 },
    buttonPrimary: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 25, alignItems: 'center', marginBottom: 20 },
    buttonPrimaryText: { color: theme.colors.background, fontSize: 16, fontWeight: 'bold' },
    orText: { textAlign: 'center', color: theme.colors.textSecondary, marginBottom: 20 },
    buttonGoogle: { flexDirection: 'row', backgroundColor: '#F5F5F5', padding: 16, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
    buttonGoogleText: { color: theme.colors.textPrimary, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    registerLink: { alignItems: 'center' },
    registerText: { color: theme.colors.textSecondary, fontSize: 14 },
    registerTextBold: { color: theme.colors.primary, fontWeight: 'bold' },
});