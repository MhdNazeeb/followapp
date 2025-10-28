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
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { routeNames } from '../../../navgation/Screens';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { SafeAreaView } from 'react-native-safe-area-context';
import useResetPassword from '../../../services/api/useResetPassword';
import Colors from '../../../Theme/Colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

const ResetPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { resetPassword, isPending, isError, error } = useResetPassword();
    const { control, handleSubmit, watch, formState: { errors } } = useForm<{ email: string; password: string; confirmPassword: string }>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: { email: string; password: string; confirmPassword: string }) => {
        if (data.password !== data.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        await resetPassword(data);
        Alert.alert('Success', 'Your password has been reset.');
        navigation.replace(routeNames.login);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleQatar}>Qatar </Text>
                            <Text style={styles.titleFollow}>Follow</Text>
                        </View>

                        <View style={styles.formShadowWrapper}>
                            <View style={styles.formContainer}>
                                <Text style={styles.heading}>Reset Password</Text>
                                <Text style={styles.subheading}>
                                    Enter your email and new password below.
                                </Text>

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
                                                placeholderTextColor={Colors.black}

                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <Text style={styles.errorText}>{errors.email.message}</Text>
                                    )}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>New Password<Text style={styles.required}>*</Text></Text>
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
                                                placeholder="Enter new password"
                                                secureTextEntry
                                                placeholderTextColor={Colors.black}

                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <Text style={styles.errorText}>{errors.password.message}</Text>
                                    )}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Confirm Password<Text style={styles.required}>*</Text></Text>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Please confirm your password',
                                            validate: value =>
                                                value === watch('password') || 'Passwords do not match'
                                        }}
                                        name="confirmPassword"
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                style={[styles.input, errors.confirmPassword && styles.inputError]}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholder="Confirm new password"
                                                secureTextEntry
                                                placeholderTextColor={Colors.black}

                                            />
                                        )}
                                    />
                                    {errors.confirmPassword && (
                                        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.signInButton}
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <Text style={styles.signInButtonText}>Reset Password</Text>
                                </TouchableOpacity>

                                <View style={styles.createAccountContainer}>
                                    <TouchableOpacity onPress={() => navigation.replace(routeNames.login)}>
                                        <Text style={styles.createAccountLink}>Back to Sign In</Text>
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
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        minHeight: height,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.04,
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
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ececec',
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
        marginBottom: height * 0.03,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: height * 0.02,
        alignItems: 'center',
    },
    label: {
        fontSize: width * 0.04,
        color: '#333',
        marginBottom: height * 0.01,
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
    signInButton: {
        backgroundColor: '#2B6FF3',
        borderRadius: 12,
        padding: width * 0.04,
        alignItems: 'center',
        marginTop: height * 0.02,
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
    signInButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: '600',
    },
    createAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.03,
        width: '100%',
    },
    createAccountLink: {
        color: '#2B6FF3',
        fontSize: width * 0.035,
        fontWeight: '600',
    },
});

export default ResetPasswordScreen;