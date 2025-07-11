import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { routeNames } from '../../../navgation/Screens';
import { LoginCredentials } from '../../../types/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../utils/yup';
import useSignup from '../../../services/api/useSignup';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
    const { signup } = useSignup()

    const navigation = useNavigation<NavigationProp>();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<LoginCredentials>({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit: SubmitHandler<LoginCredentials> = async (data: LoginCredentials) => {
        await signup(data)
        navigation.navigate(routeNames.login)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
            >
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleQatar}>Qatar </Text>
                            <Text style={styles.titleFollow}>Follow</Text>
                        </View>

                        <View style={styles.formShadowWrapper}>
                            <View style={styles.formContainer}>
                                <Text style={styles.heading}>Create New Account</Text>
                                <Text style={styles.subheading}>Join Our Community Today!</Text>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Full Name<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={[styles.input, errors.email && styles.inputError]}
                                        placeholder="Enter your full name"
                                        autoCapitalize="words"
                                        {...register("fullName")}
                                        onChangeText={(text) => setValue("fullName", text)}
                                        placeholderTextColor={'#666'}
                                    />
                                    {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>
                                        Email Address<Text style={styles.required}>*</Text>
                                    </Text>
                                    <TextInput
                                        style={[styles.input, errors.email && styles.inputError]}
                                        placeholder="Enter your email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        {...register("email")}
                                        onChangeText={(text) => setValue("email", text)}
                                        placeholderTextColor={'#666'}
                                    />
                                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Password<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={[styles.input, errors.email && styles.inputError]}
                                        placeholder="Create your password"
                                        secureTextEntry
                                        {...register("password")}
                                        onChangeText={(text) => setValue("password", text)}
                                        placeholderTextColor={'#666'}
                                    />
                                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Confirm Password<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={[styles.input, errors.email && styles.inputError]}
                                        {...register("confirmPassword")}
                                        placeholder="Confirm your password"
                                        secureTextEntry
                                        onChangeText={(text) => setValue("confirmPassword", text)}
                                        placeholderTextColor={'#666'}
                                    />
                                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                                </View>

                                <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)}>
                                    <Text style={styles.signUpButtonText}>Create Account</Text>
                                </TouchableOpacity>

                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate(routeNames.login)}>
                                        <Text style={styles.loginLink}>Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.02,
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.03,
        alignItems: 'center',
    },
    titleQatar: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#800020',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    titleFollow: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#0047AB',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    formShadowWrapper: {
        maxWidth: width * 0.95,
        minWidth: width * 0.85,
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 16,
            },
            android: {
                backgroundColor: '#f8f9fa',
                borderRadius: 28,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.04)',
            },
        }),
        marginBottom: 16,
        borderRadius: 28,
    },
    formContainer: {
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        backgroundColor: '#fff',
        borderRadius: 28,
        padding: width * 0.05,
        borderWidth: 1,
        borderColor: '#ececec',
        alignItems: 'center',
    },
    heading: {
        fontSize: width * 0.06,
        fontWeight: '700',
        color: '#333',
        marginBottom: height * 0.01,
        textAlign: 'center',
    },
    subheading: {
        fontSize: width * 0.04,
        color: '#666',
        marginBottom: height * 0.02,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: height * 0.015,
        alignItems: 'center',
    },
    label: {
        fontSize: width * 0.04,
        color: '#333',
        marginBottom: height * 0.008,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginLeft: '4%',
    },
    required: {
        color: 'red',
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F5F8FF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E1E5EB',
        width: '92%',
        minWidth: 260,
        maxWidth: 400,
        minHeight: 48,
    },
    inputError: {
        borderColor: '#FF3B30',
        borderWidth: 1,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: width * 0.035,
        marginTop: height * 0.005,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: '4%',
    },
    signUpButton: {
        backgroundColor: '#2B6FF3',
        borderRadius: 12,
        padding: width * 0.04,
        alignItems: 'center',
        marginTop: height * 0.015,
        ...Platform.select({
            ios: {
                shadowColor: '#2B6FF3',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
            },
            android: {
                elevation: 2,
            },
        }),
        width: '98%',
        minWidth: 280,
        maxWidth: 500,
        alignSelf: 'center',
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02,
        width: '100%',
    },
    loginText: {
        color: '#666',
        fontSize: width * 0.035,
    },
    loginLink: {
        color: '#2B6FF3',
        fontSize: width * 0.035,
        fontWeight: '600',
    },
});

export default SignUpScreen;