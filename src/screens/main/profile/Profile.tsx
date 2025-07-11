import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    Platform,
} from 'react-native';
import { Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { routeNames } from '../../../navgation/Screens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { useNavigation } from '@react-navigation/native';
import { clearStorage, getItem, removeItem } from '../../../utils/storage';
import { formatDate } from '../../../utils/formateDate';
import ArrowComponent from '../../../components/ArrowComponent';
import { getHeight, getWidth } from '../../../Theme/constens';
import { SafeAreaView } from 'react-native-safe-area-context';
import { whatsppMessage } from '../../../constance/constents';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const TAB_BAR_HEIGHT = getHeight(13.5); 

    const [activeTab, setActiveTab] = useState('Profile');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [userJoind, setUserJoind] = useState<string>('')


    const openWhatsApp = (phoneNumber: string, message: string) => {
        const formattedNumber = phoneNumber.replace(/[^\d]/g, '');

        const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

        console.log("Attempting to open URL:", url);

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log("WhatsApp is not supported");
                    const alternateUrl = Platform.OS === 'ios'
                        ? `whatsapp://send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`
                        : `whatsapp://send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`;

                    return Linking.openURL(alternateUrl)
                        .catch(() => {
                            Alert.alert('Error', 'WhatsApp is not installed on your device.');
                        });
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                console.error('An error occurred:', err);
                Alert.alert('Error', 'Could not open WhatsApp. Please try again.');
            });
    };




    useEffect(() => {
        const checkUser = async () => {
            const userEmail: any = await getItem("email");
            const userName: any = await getItem("userName");
            const userJoind: any = await getItem("joind");
            setEmail(userEmail)
            setName(userName)
            setUserJoind(userJoind)
        };
        checkUser();
    }, []);

    const renderPersonalInfo = () => (
        <SafeAreaView style={styles.profileSection}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{email}</Text>
            </View>
            {/* <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>+974 5555 1234</Text>
            </View> */}
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}> Qatar</Text>
            </View>
        </SafeAreaView>
    );

    const renderAccountInfo = () => (
        <View style={styles.profileSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Membership</Text>
                <Text style={styles.infoValue}>Free</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Subscriptions</Text>
                <Text style={styles.infoValue}>Jobs</Text>
            </View>
        </View>
    );



    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <View style={styles.profileContainer}>
                        {renderPersonalInfo()}
                        {renderAccountInfo()}
                    </View>
                );

            case 'Settings':
                return (
                    <View style={styles.profileContainer}>
                        <Text style={styles.sectionTitle}>Account Settings</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Notifications</Text>
                            <Text style={styles.infoValue}>Enabled</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Language</Text>
                            <Text style={styles.infoValue}>English</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Dark Mode</Text>
                            <Text style={styles.infoValue}>Off</Text>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (

        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
            <TouchableOpacity
                style={{ marginLeft: getWidth(50), marginTop: getWidth(80) }}
            >
                <ArrowComponent onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom + TAB_BAR_HEIGHT }}>


                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Text style={styles.logoTextMaroon}>Qatar</Text>
                        <Text style={styles.logoTextBlue}> Follow</Text>
                    </View>
                    <Text style={styles.subtitle}>Your Profile</Text>
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profilePic}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/80' }}
                                style={styles.profileImage}
                            />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{name}</Text>
                            <Text style={styles.profileUsername}>{email}</Text>
                            <Text style={styles.profileJoined}>Joined {formatDate(userJoind)}</Text>
                        </View>
                        {/* Show login button next to photo if not logged in */}
                        {(!email || email === 'null' || email === '') && (
                            <TouchableOpacity
                                style={styles.loginButtonSide}
                                onPress={() => navigation.replace(routeNames.login)}
                            >
                                <Text style={styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={styles.editButton} onPress={() => openWhatsApp('+97466707645', whatsppMessage)} >
                        <Text style={styles.editButtonText}>
                            Post Your Job
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabs}>
                    {['Profile', 'Settings'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {renderContent()}
                <TouchableOpacity style={styles.logoutButton} onPress={() => {
                    removeItem("userName")
                    clearStorage()
                    navigation.replace(routeNames.login)
                }}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
                </ScrollView>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        // backgroundColor:"blue"
    },
    container: {
        // flex: 1,
        padding: 20,
        backgroundColor: '#f5f7fa',
        // backgroundColor:"green"

    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ecf0f7',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 20,
        color: '#333',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    logoTextMaroon: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6b1246',
    },
    logoTextBlue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a73e8',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e1e5eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: 80,
        height: 80,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    profileUsername: {
        fontSize: 14,
        color: '#7a7a7a',
        marginBottom: 2,
    },
    profileJoined: {
        fontSize: 14,
        color: '#7a7a7a',
    },
    editButton: {
        backgroundColor: 'transparent',
        borderColor: '#1a73e8',
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#1a73e8',
        fontSize: 16,
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
    },
    tabText: {
        fontSize: 14,
        color: '#555',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#1a73e8',
    },
    activeTabText: {
        color: '#1a73e8',
        fontWeight: 'bold',
    },
    profileSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#555',
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoLabel: {
        flex: 1,
        color: '#777',
        fontSize: 14,
    },
    infoValue: {
        flex: 2,
        textAlign: 'right',
        fontSize: 14,
    },
    activityItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    activityDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    logoutButton: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    logoutButtonText: {
        color: '#1a73e8',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#1a73e8',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginBottom: 0,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButtonSide: {
        backgroundColor: '#1a73e8',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        alignSelf: 'center',
        height: 36,
    },
});

export default ProfileScreen;