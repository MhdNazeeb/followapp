import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
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
           

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                 <View style={styles.titleContainer}>
                                    <Text style={styles.titleQatar}>Qatar </Text>
                                    <Text style={styles.titleFollow}>Follow</Text>
                                </View>

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
                            placeholderTextColor={'black'}

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
                            placeholderTextColor={'black'}

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
                            placeholderTextColor={'black'}



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
                            placeholderTextColor={'black'}


                        />
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

                    </View>

                    {/* <View style={styles.termsContainer}>
                        <Text style={styles.termsText}>
                            By signing up, you agree to our{' '}
                            <Text style={styles.termsLink}>Terms of Service</Text>{' '}
                            and{' '}
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </Text>
                    </View> */}

                    <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.signUpButtonText}>Create Account</Text>
                    </TouchableOpacity>

                    {/* <Text style={styles.orText}>Or Continue With</Text>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Sign Up With Google</Text>
          </TouchableOpacity> */}

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(routeNames.login)}>
                            <Text style={styles.loginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 20,
    },
    backButtonText: {
        fontSize: 24,
        color: '#666',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 30,
    },
    formContainer: {
        flex: 1,
        paddingBottom: 30,
    },
    heading: {
        fontSize: 10,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    required: {
        color: 'red',
    },
    input: {
        backgroundColor: '#F5F8FF',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
    },
    termsContainer: {
        marginBottom: 20,
    },
    termsText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    termsLink: {
        color: '#2B6FF3',
    },
    signUpButton: {
        backgroundColor: '#2B6FF3',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        textAlign: 'center',
        color: '#666',
        marginVertical: 20,
    },
    googleButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#2B6FF3',
        fontSize: 14,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    titleQatar: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#800020',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    titleFollow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0047AB',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default SignUpScreen;