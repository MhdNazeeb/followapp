// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { JobData } from '../types/JobData'
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navgation/navigation.types';
// import { useNavigation } from '@react-navigation/native';
// import { routeNames } from '../navgation/Screens';
// import { formatDate } from '../utils/formateDate';
// import Company from '../assets/icons/Company';
// import LocationIcon from '../assets/icons/LocationIcon';
// import MoneyIcon from '../assets/icons/MoneyIcon';
// import { getItem } from '../utils/storage';
// import useSavedJobs from '../services/api/useSavedJobs';
// import Saved from '../assets/icons/Saved';
// import ColorSaved from '../assets/icons/ColorSaved';
// import { getHeight } from '../Theme/constens';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, {
//     useSharedValue,
//     useAnimatedStyle,
//     withTiming,
//     withRepeat,
//     withSequence,
//     withDelay,
//     Easing,
//     interpolateColor,
//     runOnJS,
//     withSpring,
//     FadeIn,
//     SlideInUp,
//     useAnimatedProps,
//     SlideInDown
// } from 'react-native-reanimated';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// // const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const JobCard = ({ job, screen = '' }: { job: JobData, screen: string }) => {
//     // Sample job data - replace with actual props
//     // const jobData = job || {
//     //     title: 'Junior Graphic Designer (Web)',
//     //     company: 'Qatar Airways',
//     //     location: 'New York',
//     //     salary: '$150 - $180 / week',
//     //     type: 'Full Time',
//     //     posted: '26-02-25'
//     // };
//     const navigation = useNavigation<NavigationProp>()
//     const { saved_jobs, isError, isPending } = useSavedJobs()
//     const handleSaved = async () => {

//         const userid = await getItem<string>('userId')

//         const jobid = job?._id

//         if (userid && jobid) {

//             const data = await saved_jobs({ userid, jobid })

//         }

//     }


//     // Use Reanimated shared values for animations
//     const colorProgress = useSharedValue(0);
//     const scale = useSharedValue(1);
//     const rotation = useSharedValue(0);
//     const heartScale = useSharedValue(1);
//     const tagScale = useSharedValue(1);

//     // Store the current animated colors
//     const [gradientColors, setGradientColors] = useState([
//         '#FF69B4', // First color - Hot Pink
//         '#1E90FF', // Second color - Dodger Blue
//         '#FFFFFF'  // Third color - White
//     ]);

//     // Setup animations
//     useEffect(() => {
//         // Continuous color animation
//         colorProgress.value = withRepeat(
//             withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
//             -1, // Infinite repetitions
//             true // Reverse
//         );

//         // Pulsing effect for logo
//         scale.value = withRepeat(
//             withSequence(
//                 withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
//                 withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
//             ),
//             -1,
//             true
//         );

//         // Subtle rotation effect
//         rotation.value = withRepeat(
//             withSequence(
//                 withTiming(0.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
//                 withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
//             ),
//             -1,
//             true
//         );

//         // Subtle scale effect for heart icon and tags
//         heartScale.value = withRepeat(
//             withSequence(
//                 withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
//                 withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
//             ),
//             -1,
//             true
//         );

//         // Different timing for tags to create visual interest
//         tagScale.value = withDelay(
//             400,
//             withRepeat(
//                 withSequence(
//                     withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//                     withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
//                 ),
//                 -1,
//                 true
//             )
//         );
//     }, []);

//     // Create animated styles
//     const logoContainerStyle = useAnimatedStyle(() => {
//         return {
//             transform: [
//                 { scale: scale.value },
//                 { rotate: `${rotation.value * 360}deg` }
//             ]
//         };
//     });

//     const heartStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ scale: heartScale.value }]
//         };
//     });

//     const tagStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ scale: tagScale.value }]
//         };
//     });

//     // Use useAnimatedProps for the gradient colors
//     const animatedGradientProps = useAnimatedProps(() => {
//         const firstColor = interpolateColor(
//             colorProgress.value,
//             [0, 0.2, 0.4, 0.6, 0.8, 1],
//             [
//                 '#FF69B4', // Hot Pink
//                 '#FF1493', // Deep Pink
//                 '#FF9ACD', // Light Pink
//                 '#DA70D6', // Orchid
//                 '#FF6EB4', // Hot Pink variant
//                 '#FF69B4'  // Back to start
//             ]
//         );

//         const secondColor = interpolateColor(
//             colorProgress.value,
//             [0, 0.2, 0.4, 0.6, 0.8, 1],
//             [
//                 '#1E90FF', // Dodger Blue
//                 '#00BFFF', // Deep Sky Blue
//                 '#0077BE', // Ocean Blue
//                 '#4169E1', // Royal Blue
//                 '#1E90FF', // Dodger Blue
//                 '#1E90FF'  // Back to start
//             ]
//         );

//         const thirdColor = interpolateColor(
//             colorProgress.value,
//             [0, 0.2, 0.4, 0.6, 0.8, 1],
//             [
//                 '#FFFFFF', // White
//                 '#F8F8FF', // Ghost White
//                 '#FFFFFF', // White
//                 '#F0F8FF', // Alice Blue
//                 '#FFFFFF', // White
//                 '#FFFFFF'  // Back to start
//             ]
//         );

//         // Update JS state on each animation frame to pass to LinearGradient
//         runOnJS(setGradientColors)([firstColor, secondColor, thirdColor]);

//         return {};
//     });
//    useEffect(()=>{
//    console.log(job,screen,'both are checking');

//    },[])    

//     return (
//         <Animated.View
//             style={styles.jobCard}
//             entering={FadeIn.duration(400).delay(100).springify()}
//         >
//             <TouchableOpacity onPress={() => navigation.navigate(routeNames.jobDetails, { job })}>
//                 <View style={styles.jobCardContent}>
//                     {/* <View style={[styles.container, { width: 50, height: 50 }]}>
//                         <LinearGradient
//                             colors={currentGradient}
//                             style={styles.gradient}
//                             start={{ x: 0, y: 0 }}
//                             end={{ x: 1, y: 1 }}
//                         >
//                             <Text style={styles.text}>{job?.companyName[0]}</Text>
//                         </LinearGradient>
//                     </View> */}

//                     <Animated.View
//                         style={[
//                             styles.container,
//                             { width: 50, height: 50 },
//                             // logoContainerStyle
//                         ]}
//                         // Apply the animated props to trigger gradient color updates
//                         animatedProps={animatedGradientProps}
//                     >
//                         <LinearGradient
//                             colors={gradientColors}
//                             style={styles.gradient}
//                             start={{ x: 0, y: 0 }}
//                             end={{ x: 1, y: 1 }}
//                         >
//                             <Text style={styles.text}>{job?.companyName[0]}</Text>
//                         </LinearGradient>
//                     </Animated.View>

//                     <View style={styles.jobInfoContainer}>
//                         <View
//                             style={styles.jobDetailsContainer}
//                         >
//                             <View style={styles.detailItem}>
//                                 <Company width={40} height={20} />
//                                 <Text style={styles.detailText}>{job?.jobTitle}</Text>
//                             </View>
//                             <View style={styles.detailItem}>
//                                 <Company width={20} height={10} />
//                                 <Text style={styles.detailText}>{job?.companyName}</Text>
//                             </View>

//                             <View style={styles.detailItem}>
//                                 <LocationIcon width={20} height={10} />
//                                 <Text style={styles.detailText}>{"Qatar"}</Text>
//                             </View>

//                             <View style={styles.detailItem}>
//                                 <MoneyIcon width={20} height={10} />
//                                 <Text style={styles.detailText}>{"statndared"}</Text>
//                             </View>
//                         </View>

//                         <View style={styles.cardFooter}>
//                             {screen == "home" &&
//                                 <TouchableOpacity onPress={handleSaved} hitSlop={50}>
//                                     <View style={heartStyle}>
//                                         {!job?.saved ? <Saved /> : <ColorSaved />}
//                                     </View>
//                                 </TouchableOpacity>
//                             }

//                             <View style={styles.tagsContainer}>
//                                 <View style={[styles.tagType, tagStyle]}>
//                                     <Text style={styles.tagTypeText}>{job?.jobType}</Text>
//                                 </View>
//                                 <View style={[styles.tagPosted, tagStyle]}>
//                                     <Text style={styles.tagPostedText}>{formatDate(job?.createdAt ?? null)}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         </Animated.View>
//     );
// };

// const styles = StyleSheet.create({
//     jobCard: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: getHeight(60),
//         borderWidth: 1,
//         borderColor: '#eee',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 3.84,
//         elevation: 2,
//     },
//     jobCardContent: {
//         flex: 1,
//         flexDirection: 'row',
//     },
//     companyLogoContainer: {
//         width: 50,
//         height: 50,
//         backgroundColor: '#0f7bc9',
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 12,
//     },
//     companyLogoText: {
//         color: '#fff',
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     jobInfoContainer: {
//         flex: 1,
//     },
//     jobTitleContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: 8,
//     },
//     jobTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#333',
//         flex: 1,
//         marginRight: 8,
//     },
//     jobDetailsContainer: {
//         marginBottom: 12,
//     },
//     detailItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 4,
//     },
//     detailText: {
//         marginLeft: 8,
//         fontSize: 14,
//         color: '#666',
//     },
//     iconText: {
//         fontSize: 20,
//         color: '#777',
//     },
//     cardFooter: {
//         flexDirection: 'row-reverse',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     likeIcon: {
//         fontSize: 24,
//         color: '#777',
//     },
//     tagsContainer: {
//         flexDirection: 'row',
//     },
//     tagType: {
//         backgroundColor: '#e6effe',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 20,
//         marginRight: 8,
//     },
//     tagTypeText: {
//         color: '#0057b8',
//         fontSize: 12,
//         fontWeight: '500',
//     },
//     tagPosted: {
//         backgroundColor: '#fff7e6',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 20,
//     },
//     tagPostedText: {
//         color: '#f5a623',
//         fontSize: 12,
//         fontWeight: '500',
//     },
//     container: {
//         borderRadius: 8,
//         marginRight: 12,
//         overflow: 'hidden',
//     },
//     gradient: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: '100%',
//     },
//     text: {
//         color: '#FFFFFF',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
// });

// export default JobCard;


import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
import { getHeight } from '../Theme/constens';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    withDelay,
    Easing,
    interpolateColor,
    useAnimatedProps,
    FadeIn,
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Remove AnimatedLinearGradient since we're using animated background colors
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const JobCard = ({ job, screen = '' }: { job: JobData, screen: string }) => {
    const navigation = useNavigation<NavigationProp>()
    const { saved_jobs, isError, isPending } = useSavedJobs()

    const handleSaved = async () => {
        const userid = await getItem<string>('userId')
        const jobid = job?._id

        if (userid && jobid) {
            const data = await saved_jobs({ userid, jobid })
        }
    }

    // Use Reanimated shared values for animations
    const colorProgress = useSharedValue(0);
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const heartScale = useSharedValue(1);
    const tagScale = useSharedValue(1);

    // Setup animations
    useEffect(() => {
        // Continuous color animation
        colorProgress.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            -1, // Infinite repetitions
            true // Reverse
        );

        // Pulsing effect for logo
        scale.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        // Subtle rotation effect
        rotation.value = withRepeat(
            withSequence(
                withTiming(0.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        // Subtle scale effect for heart icon and tags
        heartScale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        // Different timing for tags to create visual interest
        tagScale.value = withDelay(
            400,
            withRepeat(
                withSequence(
                    withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                    withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            )
        );
    }, []);

    // Create animated styles
    // const logoContainerStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             { scale: scale.value },
    //             { rotate: `${rotation.value * 360}deg` }
    //         ]
    //     };
    // });

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

    // Create animated background style instead of gradient
    const animatedBackgroundStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            colorProgress.value,
            [0, 0.33, 0.66, 1],
            [
                '#FF69B4', // Hot Pink
                '#1E90FF', // Dodger Blue  
                '#DA70D6', // Orchid
                '#FF69B4'  // Back to start
            ]
        );

        return {
            backgroundColor
        };
    });

    useEffect(() => {
        console.log(job, screen, 'both are checking');
    }, [])

    return (
        <Animated.View
            style={styles.jobCard}
            entering={FadeIn.duration(400).delay(100).springify()}
        >
            <TouchableOpacity onPress={() => navigation.navigate(routeNames.jobDetails, { job })}>
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
                                <Company width={40} height={20} />
                                <Text style={styles.detailText}>{job?.jobTitle}</Text>
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
                                <TouchableOpacity onPress={handleSaved} hitSlop={50}>
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
        </Animated.View>
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
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
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

export default JobCard;