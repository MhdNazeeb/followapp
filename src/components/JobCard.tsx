import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobData } from '../types/JobData'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navgation/navigation.types';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '../navgation/Screens';
import { formatDate } from '../utils/formateDate';
import Company from '../assets/icons/Company';
import LocationIcon from '../assets/icons/LocationIcon';
import MoneyIcon from '../assets/icons/MoneyIcon';
import { getItem } from '../utils/storage';
import useSavedJobs from '../services/api/useSavedJobs';
import Saved from '../assets/icons/Saved';
import ColorSaved from '../assets/icons/ColorSaved';
import { getHeight, getWidth } from '../Theme/constens';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    FadeIn,
    interpolateColor,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import { Haptics } from '../utils/Haptics';
import LoginPromptModal from './LoginPromptModal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;



const JobCard = ({ job, screen = '',setShowLoginModal }: { job: JobData, screen: string ,setShowLoginModal?:any}) => {
    const navigation = useNavigation<NavigationProp>()
    const { saved_jobs, isError, isPending } = useSavedJobs()




    const handleSaved = async () => {
        Haptics.success()
        // Animate heart icon on tap
        heartScale.value = withSequence(
            withTiming(1.2, { duration: 150 }),
            withTiming(1, { duration: 150 })
        );
        const userid = await getItem<string>('userId')
        const jobid = job?._id

        if (!userid) {
            setShowLoginModal(true);
            return;
        }
        if (userid && jobid) {
            const data = await saved_jobs({ userid, jobid })
        }
    }

    // Use Reanimated shared values for animations
    const colorProgress = useSharedValue(0);
  
    const heartScale = useSharedValue(1);
    const tagScale = useSharedValue(1);

    // Restore animated background color effect
    useEffect(() => {
        colorProgress.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            -1, // Infinite repetitions
            true // Reverse
        );
    }, []);

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            colorProgress.value,
            [0, 0.33, 0.66, 1],
            [
                '#FF69B4', 
                '#1E90FF',
                '#DA70D6',
                '#FF69B4'  
            ]
        );
        return { backgroundColor };
    });

   



    const heartStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: heartScale.value }]
        };
    });

    const tagStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: tagScale.value }]
        };
    });

    useEffect(() => {
        console.log(job, screen, 'both are checking');
    }, [])

    return (
        <View
            style={styles.jobCard}
            // entering={FadeIn.duration(400).delay(100).springify()}
        >
            {/* Login Modal */}
         
            <TouchableOpacity onPress={() => {
                navigation.navigate(routeNames.jobDetails, { jobid: job?._id });
                Haptics.success()
            }
            }>
                <View style={styles.jobCardContent}>
                    <Animated.View
                        style={[
                            styles.container,
                            { width: 50, height: 50 },
                            animatedBackgroundStyle
                        ]}
                    >
                        <Text style={styles.text}>{job?.companyName[0]}</Text>
                    </Animated.View>

                    <View style={styles.jobInfoContainer}>
                        <View style={styles.jobDetailsContainer}>
                            <View style={styles.detailItem}>
                                <Company width={20} height={20} />
                                <Text style={[styles.detailText, { fontSize: getWidth(32.5), fontWeight: "bold" }]}>{job?.jobTitle}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Company width={20} height={10} />
                                <Text style={styles.detailText}>{job?.companyName}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <LocationIcon width={20} height={10} />
                                <Text style={styles.detailText}>{"Qatar"}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <MoneyIcon width={20} height={10} />
                                <Text style={styles.detailText}>{"standard"}</Text>
                            </View>
                        </View>

                        <View style={styles.cardFooter}>
                            {screen == "home" &&
                                <TouchableOpacity onPress={handleSaved} hitSlop={10}>
                                    <Animated.View style={heartStyle}>
                                        {!job?.saved ? <Saved /> : <ColorSaved />}
                                    </Animated.View>
                                </TouchableOpacity>
                            }

                            <View style={styles.tagsContainer}>
                                <Animated.View style={[styles.tagType, tagStyle]}>
                                    <Text style={styles.tagTypeText}>{job?.jobType}</Text>
                                </Animated.View>
                                <Animated.View style={[styles.tagPosted, tagStyle]}>
                                    <Text style={styles.tagPostedText}>{formatDate(job?.createdAt ?? null)}</Text>
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    jobCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: getHeight(60),
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        maxWidth: getWidth(1.1),
        shadowOpacity: 0.1,
        shadowRadius: 3.84,

    },
    jobCardContent: {
        flex: 1,
        flexDirection: 'row',
    },
    companyLogoContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#0f7bc9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    companyLogoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    jobInfoContainer: {
        flex: 1,
    },
    jobTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    jobDetailsContainer: {
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    iconText: {
        fontSize: 20,
        color: '#777',
    },
    cardFooter: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likeIcon: {
        fontSize: 24,
        color: '#777',
    },
    tagsContainer: {
        flexDirection: 'row',
    },
    tagType: {
        backgroundColor: '#e6effe',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },
    tagTypeText: {
        color: '#0057b8',
        fontSize: 12,
        fontWeight: '500',
    },
    tagPosted: {
        backgroundColor: '#fff7e6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    tagPostedText: {
        color: '#f5a623',
        fontSize: 12,
        fontWeight: '500',
    },
    container: {
        borderRadius: 8,
        marginRight: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default React.memo(JobCard);