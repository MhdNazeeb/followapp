import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useCallback, useLayoutEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Image,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { routeNames } from '../../../navgation/Screens';
import { RootStackParamList } from '../../../navgation/navigation.types';
import useLogin from '../../../services/api/useLogin';
import { LoginCredentials } from '../../../types/login';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Colors from '../../../Theme/Colors';
import { getHeight, getWidth } from '../../../Theme/constens';

// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: "739541554715-08giuaq6deric8f1vlt7nro8633vin2r.apps.googleusercontent.com",
    iosClientId: "739541554715-11vliebjmrtlslbafrgu2292mv16hj24.apps.googleusercontent.com",
    scopes: ['profile', 'email'],
});

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignInScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [googleError, setGoogleError] = useState('');
    const {login} = useLogin()

    const screenDimensions = useMemo(() => ({
        width: getWidth(1),
        height: getHeight(1)
    }), []);

    useLayoutEffect(() => {
        setIsLayoutReady(true);
    }, []);

    const formConfig = useMemo(() => ({
        mode: 'onBlur' as const,
        reValidateMode: 'onBlur' as const,
        defaultValues: {
            email: '',
            password: ''
        }
    }), []);

    const { control, handleSubmit, formState: { errors } } = useForm<Partial<LoginCredentials>>(formConfig);

    const styles = useMemo(() => createStyles(screenDimensions, insets), [screenDimensions, insets]);

    const onSubmit = useCallback(async (data: Partial<LoginCredentials>) => {
        try {
            await login(data as LoginCredentials);
            navigation.replace(routeNames.main);
        } catch (error) {
            Alert.alert(
                'Login Failed',
                'Please check your credentials and try again.'
            );
        }
    }, [login, navigation]);

    const handleGoogleLogin = useCallback(async () => {
        setIsGoogleLoading(true);
        setGoogleError('');

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken, user }: any = userInfo?.data;
            console.log(idToken, user, 'this is id token');



            if (idToken) {
          
                login({
                    email: user.email,
                    name: user.name,
                    password: '',
                    confirmPassword: '',
                    token: idToken
                });
                navigation.replace(routeNames.main);
             
            }
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            let errorMessage = 'Something went wrong with Google Sign-In';
            if (error.code === 'SIGN_IN_CANCELLED') {
                errorMessage = 'Sign-in was cancelled';
            } else if (error.code === 'IN_PROGRESS') {
                errorMessage = 'Sign-in is already in progress';
            } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
                errorMessage = 'Play Services not available';
            } else if (error?.response?.data?.error?.message) {
                errorMessage = error.response.data.error.message;
            }

            setGoogleError(errorMessage);
            Alert.alert('Google Sign-In Failed', errorMessage);
        } finally {
            setIsGoogleLoading(false);
        }
    }, [navigation]);

    const handleForgotPassword = useCallback(async () => {
        const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
        try {
            const { available, biometryType } = await rnBiometrics.isSensorAvailable();

            if (available && (
                biometryType === 'TouchID' ||
                biometryType === 'FaceID' ||
                biometryType === 'Biometrics' ||
                biometryType === BiometryTypes.FaceID
            )) {
                const { success } = await rnBiometrics.simplePrompt({
                    promptMessage: 'Authenticate to reset password'
                });
                if (success) {
                    navigation.navigate(routeNames.forgotPassword);
                } else {
                    Alert.alert('Authentication failed');
                }
            } else {
                Alert.alert('Biometric authentication not available');
            }
        } catch (e: any) {
            Alert.alert('Biometric error', e.message || 'An error occurred');
        }
    }, [navigation]);

    const navigateToSignUp = useCallback(() => {
        navigation.navigate(routeNames.signUp);
    }, [navigation]);

    // Don't render until layout is ready to prevent jumping
    if (!isLayoutReady) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    overScrollMode="never"
                    scrollEventThrottle={16}
                >
                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleQatar}>Qatar </Text>
                            <Text style={styles.titleFollow}>Follow</Text>
                        </View>

                        <View style={styles.formShadowWrapper}>
                            <View style={styles.formContainer}>
                                <Text style={styles.heading}>Sign In To Your Account</Text>
                                <Text style={styles.subheading}>Welcome Back You've Been Missed!</Text>

                                {/* Google Sign-In Button */}
                                <TouchableOpacity
                                    style={styles.googleButton}
                                    onPress={handleGoogleLogin}
                                    disabled={isGoogleLoading}
                                    activeOpacity={0.8}
                                >
                                    {isGoogleLoading ? (
                                        <ActivityIndicator color="#fff" size="small" />
                                    ) : (
                                        <View style={styles.googleButtonContent}>
                                            <Image
                                                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                                                style={styles.googleIcon}
                                                resizeMode="contain"
                                            />
                                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                             {/* <View style={styles.googleButton}>
                             <GoogleSigninButton
                                // style={styles.googleButton}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={handleGoogleLogin}
                                disabled={isGoogleLoading}
                             />
                             </View> */}


                                {/* Display Google error if any */}
                                {googleError && (
                                    <Text style={styles.errorText}>{googleError}</Text>
                                )}

                                {/* Divider */}
                                {/* <View style={styles.dividerContainer}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>OR</Text>
                                    <View style={styles.dividerLine} />
                                </View> */}

                                {/* Email Input - Uncomment if needed */}
                                {/* <View style={styles.inputContainer}>
                                    <Text style={styles.label}>
                                        Email Address<Text style={styles.required}>*</Text>
                                    </Text>
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
                                                placeholderTextColor={Colors.black}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                textContentType="emailAddress"
                                                returnKeyType="next"
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <Text style={styles.errorText}>{errors.email.message}</Text>
                                    )}
                                </View> */}

                                {/* Password Input - Uncomment if needed */}
                                {/* <View style={styles.inputContainer}>
                                    <Text style={styles.label}>
                                        Password<Text style={styles.required}>*</Text>
                                    </Text>
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
                                                placeholderTextColor={Colors.black}
                                                secureTextEntry
                                                autoCorrect={false}
                                                textContentType="password"
                                                returnKeyType="done"
                                                onSubmitEditing={handleSubmit(onSubmit)}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <Text style={styles.errorText}>{errors.password.message}</Text>
                                    )}
                                </View> */}

                                {/* <TouchableOpacity
                                    style={styles.signInButton}
                                    onPress={handleSubmit(onSubmit)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.signInButtonText}>Sign In</Text>
                                </TouchableOpacity> */}

                                {/* <View style={styles.createAccountContainer}>
                                    <Text style={styles.createAccountText}>Not a member? </Text>
                                    <TouchableOpacity
                                        onPress={navigateToSignUp}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.createAccountLink}>Create an account</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.createAccountContainer}>
                                    <Text style={styles.createAccountText}>Forgot Password </Text>
                                    <TouchableOpacity
                                        onPress={handleForgotPassword}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.createAccountLink}>Forgot Password</Text>
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const createStyles = (screenDimensions: { width: number; height: number }, insets: any) => {
    const { width, height } = screenDimensions;

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        },
        loadingContainer: {
            flex: 1,
            backgroundColor: '#fff',
        },
        keyboardAvoidingView: {
            flex: 1,
        },
        scrollView: {
            flexGrow: 1,
            minHeight: height - insets.top - insets.bottom,
        },
        content: {
            flex: 1,
            paddingHorizontal: width * 0.06,
            paddingVertical: height * 0.03,
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
            width: '100%',
            maxWidth: Math.min(width * 0.95, 400),
            alignSelf: 'center',
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 16,
                },
                android: {},
            }),
            borderRadius: 28,
        },
        formContainer: {
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 28,
            paddingHorizontal: width * 0.05,
            paddingVertical: height * 0.03,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ececec',
        },
        heading: {
            fontSize: Math.min(width * 0.06, 24),
            fontWeight: '700',
            color: '#333',
            marginBottom: height * 0.01,
            textAlign: 'center',
        },
        subheading: {
            fontSize: Math.min(width * 0.04, 16),
            color: '#666',
            marginBottom: height * 0.03,
            textAlign: 'center',
        },
        // Google Button Styles
        googleButton: {
            backgroundColor: Colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: height * 0.02,
            width: '100%',
            height: 52,
            ...Platform.select({
                ios: {
                    shadowColor: '#4285f4',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                },
                android: {
                    elevation: 3,
                },
            }),
        },
        googleButtonContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        googleIcon: {
            width: 20,
            height: 20,
            marginRight: 12,
            backgroundColor: '#fff',
            borderRadius: 2,
        },
        googleButtonText: {
            color: '#fff',
            fontSize: Math.min(width * 0.04, 16),
            fontWeight: '600',
        },
        // Divider Styles
        dividerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: height * 0.02,
            width: '100%',
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: '#E1E5EB',
        },
        dividerText: {
            marginHorizontal: 16,
            fontSize: Math.min(width * 0.035, 14),
            color: '#666',
            fontWeight: '500',
        },
        inputContainer: {
            width: '100%',
            marginBottom: height * 0.02,
        },
        label: {
            fontSize: Math.min(width * 0.04, 16),
            color: '#333',
            marginBottom: height * 0.008,
            fontWeight: '500',
            alignSelf: 'flex-start',
            marginLeft: '2%',
        },
        required: {
            color: 'red',
            marginLeft: 4,
        },
        input: {
            backgroundColor: '#F5F8FF',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: Platform.OS === 'ios' ? 16 : 14,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#E1E5EB',
            width: '100%',
            height: 52,
            textAlignVertical: 'center',
            includeFontPadding: false,
        },
        inputError: {
            borderColor: '#FF3B30',
            borderWidth: 2,
        },
        errorText: {
            color: '#FF3B30',
            fontSize: Math.min(width * 0.035, 14),
            marginTop: height * 0.005,
            textAlign: 'center',
            alignSelf: 'center',
        },
        signInButton: {
            backgroundColor: '#2B6FF3',
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: height * 0.02,
            width: '100%',
            height: 52,
            ...Platform.select({
                ios: {
                    shadowColor: '#2B6FF3',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                },
                android: {
                    elevation: 3,
                },
            }),
        },
        signInButtonText: {
            color: '#fff',
            fontSize: Math.min(width * 0.045, 18),
            fontWeight: '600',
        },
        createAccountContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height * 0.025,
            width: '100%',
            minHeight: 24,
        },
        createAccountText: {
            color: '#666',
            fontSize: Math.min(width * 0.035, 14),
        },
        createAccountLink: {
            color: '#2B6FF3',
            fontSize: Math.min(width * 0.035, 14),
            fontWeight: '600',
        },
    });
};

export default SignInScreen;


// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useMemo, useCallback, useLayoutEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     ActivityIndicator,
//     Image,
// } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
// import { routeNames } from '../../../navgation/Screens';
// import { RootStackParamList } from '../../../navgation/navigation.types';
// import useLogin from '../../../services/api/useLogin';
// import { LoginCredentials } from '../../../types/login';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import Colors from '../../../Theme/Colors';
// import { getHeight, getWidth } from '../../../Theme/constens';

// // Configure Google Sign-In


// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const SignInScreen = () => {
//     const navigation = useNavigation<NavigationProp>();
//     const { login } = useLogin();
//     const insets = useSafeAreaInsets();
//     const [isLayoutReady, setIsLayoutReady] = useState(false);
//     const [isGoogleLoading, setIsGoogleLoading] = useState(false);
//     const [googleError, setGoogleError] = useState('');

//     const screenDimensions = useMemo(() => ({
//         width: getWidth(1),
//         height: getHeight(1)
//     }), []);

//     useLayoutEffect(() => {
//         setIsLayoutReady(true);
//     }, []);

//     const formConfig = useMemo(() => ({
//         mode: 'onBlur' as const,
//         reValidateMode: 'onBlur' as const,
//         defaultValues: {
//             email: '',
//             password: ''
//         }
//     }), []);

//     const { control, handleSubmit, formState: { errors } } = useForm<Partial<LoginCredentials>>(formConfig);

//     const styles = useMemo(() => createStyles(screenDimensions, insets), [screenDimensions, insets]);

//     const onSubmit = useCallback(async (data: Partial<LoginCredentials>) => {
//         try {
//             await login(data as LoginCredentials);
//             navigation.replace(routeNames.main);
//         } catch (error) {
//             Alert.alert(
//                 'Login Failed',
//                 'Please check your credentials and try again.'
//             );
//         }
//     }, [login, navigation]);

//     const handleGoogleLogin = useCallback(async () => {
//         setIsGoogleLoading(true);
//         setGoogleError('');

//         try {
//             // Check if device supports Google Play Services
//             await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            
//             // Get the user's ID token
//             const signInResult:any = await GoogleSignin.signIn();
//             console.log(signInResult,'signInResult');
            
//             // Try the new style of google-sign in result, from v13+ of that module
//             // let idToken = signInResult.data?.idToken;
//             // if (!idToken) {
//             //     // If using older versions of google-signin, try old style result
//             //     idToken = signInResult.idToken;
//             // }
            
//             // if (!idToken) {
//             //     throw new Error('No ID token found');
//             // }

//             // // Create a Google credential with the token
//             // const googleCredential = GoogleAuthProvider.credential(idToken);

//             // // Sign-in the user with the credential
//             // const userCredential = await signInWithCredential(getAuth(), googleCredential);
            
//             // console.log('Firebase User:', userCredential.user);
//             // console.log('User Email:', userCredential.user.email);
//             // console.log('User Display Name:', userCredential.user.displayName);

//             // Optional: Call your backend API to sync user data
//             // const resp = await authAPI.validateToken({
//             //     firebaseUid: userCredential.user.uid,
//             //     email: userCredential.user.email,
//             //     displayName: userCredential.user.displayName,
//             //     photoURL: userCredential.user.photoURL,
//             // });

//             // Navigate to main screen after successful login
//             navigation.replace(routeNames.main);
//         } catch (error: any) {
//             console.error('Google Sign-In Error:', error);
//             let errorMessage = 'Something went wrong with Google Sign-In';
            
//             if (error.code === 'SIGN_IN_CANCELLED') {
//                 errorMessage = 'Sign-in was cancelled';
//             } else if (error.code === 'IN_PROGRESS') {
//                 errorMessage = 'Sign-in is already in progress';
//             } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
//                 errorMessage = 'Play Services not available';
//             } else if (error.code === 'auth/account-exists-with-different-credential') {
//                 errorMessage = 'An account already exists with the same email address';
//             } else if (error.code === 'auth/invalid-credential') {
//                 errorMessage = 'The credential is invalid or has expired';
//             } else if (error.message) {
//                 errorMessage = error.message;
//             }

//             setGoogleError(errorMessage);
//             Alert.alert('Google Sign-In Failed', errorMessage);
//         } finally {
//             setIsGoogleLoading(false);
//         }
//     }, [navigation]);

//     const handleForgotPassword = useCallback(async () => {
//         const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
//         try {
//             const { available, biometryType } = await rnBiometrics.isSensorAvailable();

//             if (available && (
//                 biometryType === 'TouchID' ||
//                 biometryType === 'FaceID' ||
//                 biometryType === 'Biometrics' ||
//                 biometryType === BiometryTypes.FaceID
//             )) {
//                 const { success } = await rnBiometrics.simplePrompt({
//                     promptMessage: 'Authenticate to reset password'
//                 });
//                 if (success) {
//                     navigation.navigate(routeNames.forgotPassword);
//                 } else {
//                     Alert.alert('Authentication failed');
//                 }
//             } else {
//                 Alert.alert('Biometric authentication not available');
//             }
//         } catch (e: any) {
//             Alert.alert('Biometric error', e.message || 'An error occurred');
//         }
//     }, [navigation]);

//     const navigateToSignUp = useCallback(() => {
//         navigation.navigate(routeNames.signUp);
//     }, [navigation]);

//     // Don't render until layout is ready to prevent jumping
//     if (!isLayoutReady) {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.loadingContainer} />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={styles.keyboardAvoidingView}
//             >
//                 <ScrollView
//                     contentContainerStyle={styles.scrollView}
//                     showsVerticalScrollIndicator={false}
//                     keyboardShouldPersistTaps="handled"
//                     bounces={false}
//                     overScrollMode="never"
//                     scrollEventThrottle={16}
//                 >
//                     <View style={styles.content}>
//                         <View style={styles.titleContainer}>
//                             <Text style={styles.titleQatar}>Qatar </Text>
//                             <Text style={styles.titleFollow}>Follow</Text>
//                         </View>

//                         <View style={styles.formShadowWrapper}>
//                             <View style={styles.formContainer}>
//                                 <Text style={styles.heading}>Sign In To Your Account</Text>
//                                 <Text style={styles.subheading}>Welcome Back You've Been Missed!</Text>

//                                 {/* Google Sign-In Button */}
//                                 <TouchableOpacity
//                                     style={styles.googleButton}
//                                     onPress={handleGoogleLogin}
//                                     disabled={isGoogleLoading}
//                                     activeOpacity={0.8}
//                                 >
//                                     {isGoogleLoading ? (
//                                         <ActivityIndicator color="#fff" size="small" />
//                                     ) : (
//                                         <View style={styles.googleButtonContent}>
//                                             <Image
//                                                 source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
//                                                 style={styles.googleIcon}
//                                                 resizeMode="contain"
//                                             />
//                                             <Text style={styles.googleButtonText}>Continue with Google</Text>
//                                         </View>
//                                     )}
//                                 </TouchableOpacity>

//                                 {/* Display Google error if any */}
//                                 {googleError && (
//                                     <Text style={styles.errorText}>{googleError}</Text>
//                                 )}

//                                 {/* Divider */}
//                                 <View style={styles.dividerContainer}>
//                                     <View style={styles.dividerLine} />
//                                     <Text style={styles.dividerText}>OR</Text>
//                                     <View style={styles.dividerLine} />
//                                 </View>

//                                 {/* Email Input */}
//                                 <View style={styles.inputContainer}>
//                                     <Text style={styles.label}>
//                                         Email Address<Text style={styles.required}>*</Text>
//                                     </Text>
//                                     <Controller
//                                         control={control}
//                                         rules={{
//                                             required: 'Email is required',
//                                             pattern: {
//                                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                                 message: 'Invalid email address'
//                                             }
//                                         }}
//                                         name="email"
//                                         render={({ field: { onChange, value } }) => (
//                                             <TextInput
//                                                 style={[styles.input, errors.email && styles.inputError]}
//                                                 onChangeText={onChange}
//                                                 value={value}
//                                                 placeholder="Enter your email"
//                                                 keyboardType="email-address"
//                                                 placeholderTextColor={Colors.black}
//                                                 autoCapitalize="none"
//                                                 autoCorrect={false}
//                                                 textContentType="emailAddress"
//                                                 returnKeyType="next"
//                                             />
//                                         )}
//                                     />
//                                     {errors.email && (
//                                         <Text style={styles.errorText}>{errors.email.message}</Text>
//                                     )}
//                                 </View>

//                                 {/* Password Input */}
//                                 <View style={styles.inputContainer}>
//                                     <Text style={styles.label}>
//                                         Password<Text style={styles.required}>*</Text>
//                                     </Text>
//                                     <Controller
//                                         control={control}
//                                         rules={{
//                                             required: 'Password is required',
//                                             minLength: {
//                                                 value: 6,
//                                                 message: 'Password must be at least 6 characters'
//                                             }
//                                         }}
//                                         name="password"
//                                         render={({ field: { onChange, value } }) => (
//                                             <TextInput
//                                                 style={[styles.input, errors.password && styles.inputError]}
//                                                 onChangeText={onChange}
//                                                 value={value}
//                                                 placeholder="Enter your password"
//                                                 placeholderTextColor={Colors.black}
//                                                 secureTextEntry
//                                                 autoCorrect={false}
//                                                 textContentType="password"
//                                                 returnKeyType="done"
//                                                 onSubmitEditing={handleSubmit(onSubmit)}
//                                             />
//                                         )}
//                                     />
//                                     {errors.password && (
//                                         <Text style={styles.errorText}>{errors.password.message}</Text>
//                                     )}
//                                 </View>

//                                 <TouchableOpacity
//                                     style={styles.signInButton}
//                                     onPress={handleSubmit(onSubmit)}
//                                     activeOpacity={0.8}
//                                 >
//                                     <Text style={styles.signInButtonText}>Sign In</Text>
//                                 </TouchableOpacity>

//                                 <View style={styles.createAccountContainer}>
//                                     <Text style={styles.createAccountText}>Not a member? </Text>
//                                     <TouchableOpacity
//                                         onPress={navigateToSignUp}
//                                         activeOpacity={0.7}
//                                     >
//                                         <Text style={styles.createAccountLink}>Create an account</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                                 <View style={styles.createAccountContainer}>
//                                     <Text style={styles.createAccountText}>Forgot Password </Text>
//                                     <TouchableOpacity
//                                         onPress={handleForgotPassword}
//                                         activeOpacity={0.7}
//                                     >
//                                         <Text style={styles.createAccountLink}>Forgot Password</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// };

// const createStyles = (screenDimensions: { width: number; height: number }, insets: any) => {
//     const { width, height } = screenDimensions;

//     return StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: '#fff',
//             paddingTop: insets.top,
//             paddingBottom: insets.bottom,
//             paddingLeft: insets.left,
//             paddingRight: insets.right,
//         },
//         loadingContainer: {
//             flex: 1,
//             backgroundColor: '#fff',
//         },
//         keyboardAvoidingView: {
//             flex: 1,
//         },
//         scrollView: {
//             flexGrow: 1,
//             minHeight: height - insets.top - insets.bottom,
//         },
//         content: {
//             flex: 1,
//             paddingHorizontal: width * 0.06,
//             paddingVertical: height * 0.03,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         titleContainer: {
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginBottom: height * 0.04,
//             alignItems: 'center',
//         },
//         titleQatar: {
//             fontSize: width * 0.08,
//             fontWeight: 'bold',
//             color: '#800020',
//             textShadowColor: 'rgba(0, 0, 0, 0.15)',
//             textShadowOffset: { width: 1, height: 1 },
//         },
//         titleFollow: {
//             fontSize: width * 0.08,
//             fontWeight: 'bold',
//             color: '#0047AB',
//             textShadowColor: 'rgba(0, 0, 0, 0.15)',
//             textShadowOffset: { width: 1, height: 1 },
//             textShadowRadius: 2,
//         },
//         formShadowWrapper: {
//             width: '100%',
//             maxWidth: Math.min(width * 0.95, 400),
//             alignSelf: 'center',
//             ...Platform.select({
//                 ios: {
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: 8 },
//                     shadowOpacity: 0.12,
//                     shadowRadius: 16,
//                 },
//                 android: {},
//             }),
//             borderRadius: 28,
//         },
//         formContainer: {
//             width: '100%',
//             backgroundColor: '#fff',
//             borderRadius: 28,
//             paddingHorizontal: width * 0.05,
//             paddingVertical: height * 0.03,
//             alignItems: 'center',
//             borderWidth: 1,
//             borderColor: '#ececec',
//         },
//         heading: {
//             fontSize: Math.min(width * 0.06, 24),
//             fontWeight: '700',
//             color: '#333',
//             marginBottom: height * 0.01,
//             textAlign: 'center',
//         },
//         subheading: {
//             fontSize: Math.min(width * 0.04, 16),
//             color: '#666',
//             marginBottom: height * 0.03,
//             textAlign: 'center',
//         },
//         googleButton: {
//             backgroundColor: '#4285f4',
//             borderRadius: 12,
//             paddingVertical: 16,
//             paddingHorizontal: 20,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginBottom: height * 0.02,
//             width: '100%',
//             height: 52,
//             ...Platform.select({
//                 ios: {
//                     shadowColor: '#4285f4',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.3,
//                     shadowRadius: 4.65,
//                 },
//                 android: {
//                     elevation: 3,
//                 },
//             }),
//         },
//         googleButtonContent: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         googleIcon: {
//             width: 20,
//             height: 20,
//             marginRight: 12,
//             backgroundColor: '#fff',
//             borderRadius: 2,
//         },
//         googleButtonText: {
//             color: '#fff',
//             fontSize: Math.min(width * 0.04, 16),
//             fontWeight: '600',
//         },
//         dividerContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginVertical: height * 0.02,
//             width: '100%',
//         },
//         dividerLine: {
//             flex: 1,
//             height: 1,
//             backgroundColor: '#E1E5EB',
//         },
//         dividerText: {
//             marginHorizontal: 16,
//             fontSize: Math.min(width * 0.035, 14),
//             color: '#666',
//             fontWeight: '500',
//         },
//         inputContainer: {
//             width: '100%',
//             marginBottom: height * 0.02,
//         },
//         label: {
//             fontSize: Math.min(width * 0.04, 16),
//             color: '#333',
//             marginBottom: height * 0.008,
//             fontWeight: '500',
//             alignSelf: 'flex-start',
//             marginLeft: '2%',
//         },
//         required: {
//             color: 'red',
//             marginLeft: 4,
//         },
//         input: {
//             backgroundColor: '#F5F8FF',
//             borderRadius: 12,
//             paddingHorizontal: 16,
//             paddingVertical: Platform.OS === 'ios' ? 16 : 14,
//             fontSize: 16,
//             borderWidth: 1,
//             borderColor: '#E1E5EB',
//             width: '100%',
//             height: 52,
//             textAlignVertical: 'center',
//             includeFontPadding: false,
//         },
//         inputError: {
//             borderColor: '#FF3B30',
//             borderWidth: 2,
//         },
//         errorText: {
//             color: '#FF3B30',
//             fontSize: Math.min(width * 0.035, 14),
//             marginTop: height * 0.005,
//             textAlign: 'center',
//             alignSelf: 'center',
//         },
//         signInButton: {
//             backgroundColor: '#2B6FF3',
//             borderRadius: 12,
//             paddingVertical: 16,
//             paddingHorizontal: 20,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginTop: height * 0.02,
//             width: '100%',
//             height: 52,
//             ...Platform.select({
//                 ios: {
//                     shadowColor: '#2B6FF3',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.3,
//                     shadowRadius: 4.65,
//                 },
//                 android: {
//                     elevation: 3,
//                 },
//             }),
//         },
//         signInButtonText: {
//             color: '#fff',
//             fontSize: Math.min(width * 0.045, 18),
//             fontWeight: '600',
//         },
//         createAccountContainer: {
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: height * 0.025,
//             width: '100%',
//             minHeight: 24,
//         },
//         createAccountText: {
//             color: '#666',
//             fontSize: Math.min(width * 0.035, 14),
//         },
//         createAccountLink: {
//             color: '#2B6FF3',
//             fontSize: Math.min(width * 0.035, 14),
//             fontWeight: '600',
//         },
//     });
// };

// export default SignInScreen;