import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { JobData } from '../types/JobData'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navgation/navigation.types';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '../navgation/Screens';
import { formatDate } from '../utils/formateDate';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { getItem } from '../utils/storage';
import useSavedJobs from '../services/api/useSavedJobs';
import { getColorByLetter, getHeight, getWidth } from '../Theme/constens';
import { Haptics } from '../utils/Haptics';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Theme/Colors';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobCard = ({ job, screen = '', setShowLoginModal }: { job: JobData, screen: string, setShowLoginModal?: any }) => {
    const navigation = useNavigation<NavigationProp>()
    const { saved_jobs } = useSavedJobs()

    // Reanimated shared values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    const handleSaved = async (status: boolean) => {
        Haptics.success()
        const userid = await getItem<string>('userId')
        const jobid = job?._id

        if (!userid) {
            setShowLoginModal && setShowLoginModal(true);
            return;
        }
        if (userid && jobid) {
            await saved_jobs({ userid, jobid, status })
        }
    }

    const handlePressIn = () => {
        scale.value = withSpring(0.30, {
            damping: 15,
            stiffness: 150,
        });
        opacity.value = withTiming(0.3, {
            duration: 200,
            easing: Easing.ease,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 150,
        });
        opacity.value = withTiming(0, {
            duration: 200,
            easing: Easing.ease,
        });
    };

    // Animated styles
    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const animatedOverlayStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={[styles.jobCard, animatedCardStyle]}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => {
                    navigation.navigate(routeNames.jobDetails, {
                        jobid: `${screen == "home" || screen == "search" ? job._id : job.jobId}`
                    });
                    Haptics.success()
                }}
                activeOpacity={1}
            >
                {/* Gradient overlay on press */}
                <Animated.View style={[styles.gradientOverlay, animatedOverlayStyle]} pointerEvents="none">
                    <LinearGradient
                        colors={['rgba(139, 92, 246, 0.2)', 'rgba(168, 85, 247, 0.2)']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                </Animated.View>

                <View style={styles.jobCardContent}>
                    {/* Company Logo with enhanced styling */}
                    <View style={styles.logoWrapper}>
                        <View style={styles.logoContainer}>
                            <LinearGradient
                                colors={getColorByLetter(job?.jobTitle?.[0] ?? "A")}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                            <Text style={styles.logoText}>
                                {job?.companyName?.[0]?.toUpperCase() || 'C'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.jobInfoContainer}>
                        {/* Job Title with better typography */}
                        <View style={styles.titleContainer}>
                            <Text style={styles.jobTitle} numberOfLines={2}>
                                {job?.jobTitle}
                            </Text>
                        </View>

                        {/* Company Name with icon background */}
                        <View style={styles.detailItem}>
                            <View style={[styles.iconWrapper, { backgroundColor: '#F5F3FF' }]}>
                                <MaterialIcons name="business" size={12} color="#7C3AED" />
                            </View>
                            <Text style={styles.detailText} numberOfLines={1}>
                                {job?.companyName}
                            </Text>
                        </View>

                        {/* Location and Time in a row */}
                        <View style={styles.infoRow}>
                            <View style={styles.detailItem}>
                                <View style={[styles.iconWrapper, { backgroundColor: '#EDE9FE' }]}>
                                    <MaterialIcons name="location-on" size={12} color="#7C3AED" />
                                </View>
                                <Text style={styles.detailText}>Qatar</Text>
                            </View>

                            <View style={styles.detailItem}>
                                <View style={[styles.iconWrapper, { backgroundColor: '#DBEAFE' }]}>
                                    <MaterialIcons name="access-time" size={12} color="#7C3AED" />
                                </View>
                                <Text style={styles.detailText}>
                                    {formatDate(job?.createdAt ?? null)}
                                </Text>
                            </View>
                        </View>

                        {/* Job Description (only on home screen) */}
                        {screen === "home" && job?.jobDescription && (
                            <Text style={styles.jobDescription} numberOfLines={2}>
                                {job.jobDescription}
                            </Text>
                        )}

                        {/* Footer with job type and action */}
                        <View style={styles.cardFooter}>
                            <View style={styles.jobTypeBadge}>
                                <LinearGradient
                                    colors={['#EDE9FE', '#DDD6FE']}
                                    style={StyleSheet.absoluteFill}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                />
                                <Text style={styles.jobTypeText}>{job?.jobType}</Text>
                            </View>

                            <View style={styles.actionContainer}>
                                <Text style={styles.viewDetailsText}>Details</Text>
                                <MaterialIcons name="arrow-forward" size={16} color="#7C3AED" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Save Button - Absolutely positioned */}
                {screen === "home" && (
                    <TouchableOpacity
                        onPress={() => handleSaved(job?.saved ?? false)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles.saveButton}
                    >
                        <View style={styles.saveButtonInner}>
                            <MaterialIcons
                                name={job?.saved ? "favorite" : "favorite-border"}
                                size={20}
                                color={job?.saved ? "#EF4444" : "#6B7280"}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    jobCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: "#8B5CF6",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,

    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 14,
        overflow: 'hidden',
    },
    jobCardContent: {
        flexDirection: 'row',
    },
    logoWrapper: {
        marginRight: 10,
    },
    logoContainer: {
        width: 48,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    jobInfoContainer: {
        flex: 1,
    },
    titleContainer: {
        marginBottom: 6,
    },
    jobTitle: {
        fontSize: getWidth(22),
        fontWeight: '700',
        color: '#111827',
        lineHeight: getWidth(22) * 1.25,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    iconWrapper: {
        width: 18,
        height: 18,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    detailText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 8,
    },
    jobDescription: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    jobTypeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#C4B5FD',
        overflow: 'hidden',
    },
    jobTypeText: {
        color: '#7C3AED',
        fontSize: 11,
        fontWeight: '600',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewDetailsText: {
        color: '#7C3AED',
        fontSize: 12,
        fontWeight: '600',
    },
    saveButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
    },
    saveButtonInner: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
});

export default React.memo(JobCard);