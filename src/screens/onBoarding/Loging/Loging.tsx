import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { routeNames } from '../../../navgation/Screens';
import { RootStackParamList } from '../../../navgation/navigation.types';
import useLogin from '../../../services/api/useLogin';
import { LoginCredentials } from '../../../types/login';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;



const SignInScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { login } = useLogin();

    const { control, handleSubmit, formState: { errors } } = useForm<Partial<LoginCredentials>>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: Partial<LoginCredentials>) => {
        try {
            await login(data as LoginCredentials);
            navigation.replace(routeNames.main);
        } catch (error) {
            Alert.alert(
                'Login Failed',
                'Please check your credentials and try again.'
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleQatar}>Qatar </Text>
                    <Text style={styles.titleFollow}>Follow</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.heading}>Sign In To Your Account</Text>
                    <Text style={styles.subheading}>Welcome Back You've Been Missed!</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address<Text style={styles.required}>*</Text></Text>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            }}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.email && styles.inputError]}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor={'black'}
                                />
                            )}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password<Text style={styles.required}>*</Text></Text>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            }}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.password && styles.inputError]}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Enter your password"
                                    secureTextEntry
                                    placeholderTextColor={'black'}

                                />
                            )}
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.createAccountContainer}>
                        <Text style={styles.createAccountText}>Not a member? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(routeNames.signUp)}>
                            <Text style={styles.createAccountLink}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // ... existing styles ...
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
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
    signInButton: {
        backgroundColor: '#2B6FF3',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    createAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    createAccountText: {
        color: '#666',
        fontSize: 14,
    },
    createAccountLink: {
        color: '#2B6FF3',
        fontSize: 14,
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

export default SignInScreen;