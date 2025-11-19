
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { clearStorage, getItem } from '../../../utils/storage';
import { formatDate } from '../../../utils/formateDate';
import { getHeight, getWidth, lightenColor } from '../../../Theme/constens';
import { whatsppMessage } from '../../../constance/constents';
import useDeleteAccount from '../../../services/api/useDeleteAccount';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { deleteAccount } = useDeleteAccount();
  const [activeTab, setActiveTab] = useState<'Profile' | 'Settings'>('Profile');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [userJoined, setUserJoined] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<'Login' | 'Logout' | null>(null);

  // Get screen dimensions
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth > 600; // Tablet threshold

  useEffect(() => {
    const checkUser = async () => {
      const userEmail: any = await getItem('email');
      const userName: any = await getItem('userName');
      const userJoined: any = await getItem('joind');
      setEmail(userEmail || '');
      setName(userName || '');
      setUserJoined(userJoined || '');
    };
    checkUser();
  }, []);

  const openWhatsApp = useCallback((phoneNumber: string, message: string) => {
    const formattedNumber = phoneNumber.replace(/[^\d]/g, '');
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          const alternateUrl = Platform.OS === 'ios'
            ? `whatsapp://send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`
            : `whatsapp://send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`;
          return Linking.openURL(alternateUrl).catch(() => {
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
  }, []);

  const handleButton = useCallback((value: 'Login' | 'Logout') => {
    setCurrentState(value);
    setModalOpen(true);
  }, []);

  const handleModalAction = useCallback(() => {
    if (currentState === 'Login') {
      navigation.replace('Login');
    } else if (currentState === 'Logout') {
      clearStorage();
      navigation.replace('Login');
    }
    setModalOpen(false);
  }, [currentState, navigation]);

  const handleDeleteAccount = async () => {
    const userId = await getItem('userId');
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteAccount({ userId });
            await clearStorage();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const isLoggedIn = email && email !== 'null' && email !== '';

  const renderHeaderCard = () => (
    <LinearGradient
      colors={['#8b5cf6', '#a855f7', '#c084fc']}
      style={styles.headerCard}
    >
      <View style={styles.headerContent}>
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name?.[0]?.toUpperCase() ?? 'N'}</Text>
          </View>
          {isLoggedIn ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{name || 'Guest User'}</Text>
              <Text style={styles.welcomeText}>Welcome back!</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleButton('Login')}
            >
              <MaterialIcons name="person" size={getWidth(25)} color="#8b5cf6" style={styles.icon} />
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.postJobButton}
            onPress={() => openWhatsApp('+97466707645', whatsppMessage)}
          >
            <MaterialIcons name="work" size={getWidth(25)} color="#8b5cf6" style={styles.icon} />
            <Text style={styles.postJobButtonText}>Post Job</Text>
          </TouchableOpacity>
          {isLoggedIn && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleButton('Logout')}
            >
              <MaterialIcons name="logout" size={getWidth(25)} color="#fff" style={styles.icon} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
        onPress={() => setActiveTab('Profile')}
      >
        <Text style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText]}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Settings' && styles.activeTab]}
        onPress={() => setActiveTab('Settings')}
      >
        <Text style={[styles.tabText, activeTab === 'Settings' && styles.activeTabText]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileContent = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.sectionSubtitle}>Manage your personal details</Text>
        <View style={styles.card}>
          <LinearGradient
            colors={['#f0f5ff', '#f0eaff']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="email" size={getWidth(20)} color="#8b5cf6" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Email</Text>
                <Text style={styles.cardValue}>{email || 'Not provided'}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.card}>
          <LinearGradient
            colors={['#e0f7ff', '#e0f0ff']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="location-pin" size={getWidth(20)} color="#3b82f6" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Location</Text>
                <Text style={styles.cardValue}>Qatar</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
        {isLoggedIn && (
          <TouchableOpacity style={styles.card} onPress={handleDeleteAccount}>
            <LinearGradient
              colors={['#fff0f0', '#ffe5e5']}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="delete" size={getWidth(20)} color="#ef4444" />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardLabel}>Delete Account</Text>
                </View>
                <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <Text style={styles.sectionSubtitle}>Your subscription details</Text>
        <View style={styles.card}>
          <LinearGradient
            colors={[lightenColor('#fef3c7',40), lightenColor('#fef3c7',50)]}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="emoji-events" size={getWidth(20)} color="#f59e0b" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Membership</Text>
                <Text style={styles.cardValue}>Free</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.card}>
          <LinearGradient
            colors={['#ccfbf1', '#d1fae5']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="inventory" size={getWidth(20)} color="#10b981" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Subscription</Text>
                <Text style={styles.cardValue}>Jobs</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );

  const renderSettingsContent = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Text style={styles.sectionSubtitle}>Customize your preferences</Text>
        <View style={styles.card}>
          <LinearGradient
            colors={['#e0f2ff', '#e0e7ff']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="notifications" size={getWidth(20)} color="#3b82f6" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Notification</Text>
                <Text style={styles.cardValue}>Enabled</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.card}>
          <LinearGradient
            colors={['#f3e8ff', '#f5d0fe']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="language" size={getWidth(20)} color="#8b5cf6" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Language</Text>
                <Text style={styles.cardValue}>English</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.card}>
          <LinearGradient
            colors={['#f1f5f9', '#e5e7eb']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="nightlight" size={getWidth(20)} color="#6b7280" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>Dark Mode</Text>
                <Text style={styles.cardValue}>Off</Text>
              </View>
              <MaterialIcons name="chevron-right" size={getWidth(20)} color="#9ca3af" />
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + getHeight(13.5) }}
      >
        {renderHeaderCard()}
        {!isTablet && renderTabs()}
        {isTablet ? (
          <View style={styles.tabletContainer}>
            <View style={styles.tabletSection}>
              {renderProfileContent()}
            </View>
            <View style={styles.tabletSection}>
              {renderSettingsContent()}
            </View>
          </View>
        ) : (
          activeTab === 'Profile' ? renderProfileContent() : renderSettingsContent()
        )}
      </ScrollView>
      <Modal
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: isTablet ? getWidth(2) : getWidth(1.25) }]}>
            <Text style={styles.modalTitle}>
              {currentState === 'Logout' ? 'Confirm Logout' : 'Login Required'}
            </Text>
            <Text style={styles.modalDescription}>
              {currentState === 'Logout'
                ? 'Are you sure you want to log out?'
                : 'Please log in to continue.'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { padding: isTablet ? getWidth(40) : getWidth(50) }]}
                onPress={() => setModalOpen(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalActionButton, { padding: isTablet ? getWidth(40) : getWidth(50) }]}
                onPress={handleModalAction}
              >
                <Text style={styles.modalActionButtonText}>
                  {currentState === 'Logout' ? 'Logout' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    paddingHorizontal: getWidth(20),
  },
  headerCard: {
    marginTop: getHeight(30),
    borderRadius: getWidth(40),
    padding: getWidth(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(100) },
    shadowOpacity: 0.15,
    shadowRadius: getWidth(10),
    height:getHeight(5),
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap:getHeight(90)
    // alignItems: 'center',
    // backgroundColor:"black"
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: getWidth(10),
    height: getWidth(10),
    borderRadius: getWidth(50),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(100),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    color: '#fff',
    fontSize: getWidth(25),
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    color: '#fff',
    fontSize: getWidth(25),
    fontWeight: '600',
    // allowFontScaling: false,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: getWidth(30),
    // allowFontScaling: false,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: getWidth(100),
    paddingVertical: getHeight(100),
    paddingHorizontal: getWidth(30),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(100),
  },
  loginButtonText: {
    color: '#8b5cf6',
    fontSize: getWidth(30),
    fontWeight: '600',
    // allowFontScaling: false,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(50),
  },
  postJobButton: {
    backgroundColor: '#fff',
    borderRadius: getWidth(100),
    paddingVertical: getHeight(80),
    paddingHorizontal: getWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.15,
    shadowRadius: getWidth(100),
  },
  postJobButtonText: {
    color: '#8b5cf6',
    fontSize: getWidth(30),
    fontWeight: '600',
    // allowFontScaling: false,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: getWidth(100),
    paddingVertical: getHeight(100),
    paddingHorizontal: getWidth(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: getWidth(30),
    fontWeight: '600',
    // allowFontScaling: false,
  },
  icon: {
    marginRight: getWidth(50),
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: getWidth(50),
    padding: getWidth(100),
    marginTop: getHeight(30),
    marginHorizontal: getWidth(50),
  },
  tab: {
    flex: 1,
    paddingVertical: getHeight(80),
    alignItems: 'center',
    borderRadius: getWidth(60),
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(100),
  },
  tabText: {
    color: '#6b7280',
    fontSize: getWidth(30),
    fontWeight: '600',
    // allowFontScaling: false,
  },
  activeTabText: {
    color: '#8b5cf6',
  },
  sectionContainer: {
    marginTop: getHeight(30),
    marginHorizontal: getWidth(50),
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: getWidth(40),
    padding: getWidth(20),
    marginBottom: getHeight(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(100),
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: getWidth(20),
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: getHeight(200),
    // allowFontScaling: false,
  },
  sectionSubtitle: {
    fontSize: getWidth(30),
    color: '#6b7280',
    marginBottom: getHeight(60),
    // allowFontScaling: false,
  },
  card: {
    marginBottom: getHeight(100),
  },
  cardGradient: {
    borderRadius: getWidth(50),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(100),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getWidth(30),
  },
  iconContainer: {
    width: getWidth(15),
    height: getWidth(15),
    borderRadius: getWidth(100),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(40),
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: getWidth(30),
    color: '#6b7280',
    fontWeight: '500',
    // allowFontScaling: false,
  },
  cardValue: {
    fontSize: getWidth(25),
    color: '#111827',
    fontWeight: '600',
    // allowFontScaling: false,
  },
  tabletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: getWidth(50),
  },
  tabletSection: {
    flex: 1,
    marginHorizontal: getWidth(50),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: getWidth(50),
    padding: getWidth(20),
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: getHeight(500) },
    shadowOpacity: 0.25,
    shadowRadius: getWidth(100),
    elevation: 5,
  },
  modalTitle: {
    fontSize: getWidth(20),
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: getHeight(100),
    textAlign: 'center',
    // allowFontScaling: false,
  },
  modalDescription: {
    fontSize: getWidth(30),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: getHeight(40),
    // allowFontScaling: false,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: getWidth(100),
    marginHorizontal: getWidth(100),
    backgroundColor: '#f3f4f6',
  },
  modalButtonText: {
    fontSize: getWidth(30),
    color: '#6b7280',
    fontWeight: '600',
    // allowFontScaling: false,
  },
  modalActionButton: {
    backgroundColor: '#8b5cf6',
  },
  modalActionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: getWidth(30),
    // allowFontScaling: false,
  },
});

export default ProfileScreen;