// JobDetails.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Linking,
    Alert,
    TouchableOpacity,
    Share,
} from 'react-native';
import jobDescriptions, { JobDescription } from '../../../constance/constents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { formatDate } from '../../../utils/formateDate';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowComponent from '../../../components/ArrowComponent';
import { useNavigation } from '@react-navigation/native';
import { getHeight, getWidth } from '../../../Theme/constens';
import { useGetJobById } from '../../../services/api/usegetJobById';
import Loading from '../../../components/Loading';
import { Haptics } from '../../../utils/Haptics';
import ShareIcon from '../../../assets/icons/shareIcon';
import { TouchableRipple } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobDetails = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();

    const [expanded, setExpanded] = useState(false);
  
    // Fix: Get jobid correctly from route params
    const id = route.params?.jobid;
    console.log(id, 'kkkkkk');

    const { data: job, isLoading, error }: any = useGetJobById(id);
    useEffect(() => {
        console.log(job, 'here is job');

    }, [job])

    const sendEmail = async () => {
        const email = 'someone@example.com';
        const subject = 'Hello';
        const body = 'I wanted to say hello.';

        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
            Linking.openURL(url);
        } else {
            Alert.alert('Error', 'Could not open email client');
        }
    };

    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    // Convert job details to array format if needed
    const jobDetailsArray = React.useMemo(() => {
        if (!job) return [];

        // If job has jobDetails property, convert it to array
        if (job.jobDetails && typeof job.jobDetails === 'object') {
            return Object.entries(job.jobDetails).map(([key, value]) => ({
                key,
                value: value as string,
            }));
        }

        // If job itself is the details object, convert it to array
        return Object.entries(job).map(([key, value]) => ({
            key,
            value: value as string,
        }));
    }, [job]);

    // Get job description
    const jobDescription = React.useMemo(() => {
        if (!job) return '';

        // Try to get description from different possible locations
        return job.jobDescription ||
            job.jobDetails?.jobDescription ||
            jobDetailsArray.find(item => item.key === 'jobDescription')?.value ||
            '';
    }, [job, jobDetailsArray]);

    // Share job handler
    const handleShare = async () => {
        try {
            const message = `${job?.jobTitle || 'Job Opportunity'}\n\n${jobDescription || ''}` + (job?.link ? `\n\nApply here: ${job.link}` : '');
            await Share.share({
                message,
                title: job?.jobTitle || 'Job Opportunity',
            });
        } catch (error) {
            // Optionally handle error
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <Loading size='large' color='blue' />
        );
    }

    // Show error state
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error loading job details</Text>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Show no job found state
    if (!job) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Job not found</Text>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button and Share Button */}
            <View style={styles.headerBackContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                        hitSlop={10}
                    >
                        <ArrowComponent onPress={handleBackPress} />
                    </TouchableOpacity>
                    <TouchableRipple
                        rippleColor={'#808080'}
                        onPress={() => {
                            Haptics.success();
                            handleShare();
                        }}
                        style={styles.shareButton}
                        borderless
                        hitSlop={10}
                    >
                        <ShareIcon size={24} color="#000000" />
                    </TouchableRipple>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContentContainer}
            >
                {/* Enhanced Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                            {job?.jobTitle || job?.title || 'Job Title'}
                        </Text>
                        <View style={styles.jobTypeBadge}>
                            <Text style={styles.jobTypeText}>
                                {job?.jobType || job?.type || 'Full-time'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Enhanced Job Overview Section */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Job Overview</Text>
                    <View style={styles.rowContainer}>
                        {jobDetailsArray
                            ?.filter((item: JobDescription) =>
                                item.key !== 'jobDescription' &&
                                item.key !== 'description' &&
                                item.key !== '_id' &&
                                item.key !== '__v' &&
                                item.key !== 'createdAt' &&
                                item.key !== 'updatedAt' &&
                                item.key !== 'image' &&
                                item.key !== 'jobsStatus'
                            )
                            .map((item: JobDescription, index) => (
                                <View
                                    style={styles.infoItem}
                                    key={item.key}
                                >
                                    <View style={styles.infoIconContainer}>
                                        <View style={styles.infoIconPlaceholder} />
                                    </View>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>
                                            {item?.key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                        </Text>
                                        <Text
                                            selectable={item?.key === 'email'}
                                            style={[
                                                styles.infoValue,
                                                item?.key === 'email' && styles.emailText,
                                            ]}
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                        >
                                            {item?.key === 'expirationDate'
                                                ? formatDate(item?.value ?? null)
                                                : item?.value}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>

                {/* Enhanced Job Description Section */}
                {jobDescription && (
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.sectionTitle}>Job Description</Text>

                        <Text style={styles.descriptionText} selectable={true}>
                            {expanded
                                ? jobDescription
                                : `${jobDescription?.slice(0, 200)}${jobDescription?.length > 200 ? '...' : ''}`}
                        </Text>

                        {jobDescription.length > 200 && (
                            <TouchableOpacity
                                onPress={() => setExpanded(!expanded)}
                                style={styles.toggleButton}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.toggleText}>
                                    {expanded ? 'Show Less ▲' : 'Show More ▼'}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {expanded && (
                            <Text style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                                Long press to select or copy this text.
                            </Text>
                        )}
                    </View>
                )}

                {/* Contact/Apply Section */}
                {/* <View style={styles.actionContainer}>
                    <TouchableOpacity 
                        style={styles.applyButton}
                        onPress={sendEmail}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.applyButtonText}>Apply Now</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
        marginBottom: 20,
        textAlign: 'center',
    },
    backButtonText: {
        color: '#4285f4',
        fontSize: 16,
        fontWeight: '600',
    },
    headerBackContainer: {
        paddingVertical: getHeight(80),
        backgroundColor: '#fff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 80,
        minHeight: 44,
    },
    backText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#495057',
    },
    scrollView: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingBottom: getHeight(50),
    },
    headerContainer: {
        paddingVertical: getHeight(50),
        paddingHorizontal: getWidth(25),
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    titleContainer: {
        flexDirection: 'column',
        gap: getHeight(80),
    },
    title: {
        fontSize: getHeight(35),
        fontWeight: '700',
        color: '#212529',
        lineHeight: getHeight(30),
    },
    jobTypeBadge: {
        backgroundColor: '#e3f2fd',
        borderRadius: getWidth(35),
        paddingVertical: getHeight(120),
        paddingHorizontal: getWidth(35),
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#bbdefb',
    },
    jobTypeText: {
        color: '#1976d2',
        fontWeight: '600',
        fontSize: getHeight(70),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: getWidth(50),
        marginTop: getHeight(60),
        marginHorizontal: getWidth(25),
        padding: getWidth(30),
        elevation: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    sectionTitle: {
        fontSize: getHeight(45),
        fontWeight: '700',
        marginBottom: getHeight(60),
        color: '#212529',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '48%',
        marginBottom: getHeight(55),
        paddingRight: getWidth(70),
    },
    infoIconContainer: {
        marginRight: getWidth(40),
        marginTop: getHeight(300),
    },
    infoIconPlaceholder: {
        width: getWidth(22),
        height: getWidth(22),
        borderRadius: getWidth(44),
        backgroundColor: '#4285f4',
        opacity: 0.8,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: getHeight(70),
        fontWeight: '600',
        color: '#495057',
        marginBottom: getHeight(150),
        textTransform: 'capitalize',
    },
    infoValue: {
        fontSize: getHeight(60),
        color: '#212529',
        fontWeight: '500',
        lineHeight: getHeight(50),
    },
    emailText: {
        fontSize: getHeight(70),
        color: '#4285f4',
        textDecorationLine: 'underline',
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        borderRadius: getWidth(50),
        marginTop: getHeight(60),
        marginHorizontal: getWidth(25),
        padding: getWidth(30),
        elevation: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    descriptionText: {
        fontSize: getHeight(60),
        lineHeight: getHeight(45),
        color: '#495057',
        textAlign: 'justify',
    },
    toggleButton: {
        paddingVertical: getHeight(100),
        paddingHorizontal: getWidth(150),
        alignSelf: 'flex-start',
        marginTop: getHeight(100),
    },
    toggleText: {
        color: '#4285f4',
        fontWeight: '600',
        fontSize: getHeight(60),
    },
    actionContainer: {
        marginTop: getHeight(45),
        marginHorizontal: getWidth(25),
        marginBottom: getHeight(60),
    },
    applyButton: {
        backgroundColor: '#4285f4',
        borderRadius: getWidth(50),
        paddingVertical: getHeight(60),
        paddingHorizontal: getWidth(25),
        alignItems: 'center',
        shadowColor: '#4285f4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: getHeight(55),
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    shareIcon: {
        fontSize: 22,
        color: '#1976d2',
        fontWeight: 'bold',
    },
});

export default JobDetails;