import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import jobDescriptions, { JobDescription } from '../../../constance/constents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navgation/navigation.types';
import { JobData } from '../../../types/JobData';
import { formatDate } from '../../../utils/formateDate';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowComponent from '../../../components/ArrowComponent';
import { useNavigation } from '@react-navigation/native';
import { getHeight, getWidth } from '../../../Theme/constens';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobDetails = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();

    const job = route.params?.job
    const filteredJobDetails = jobDescriptions
        .filter((desc) => desc.key in job)
        .map((desc) => ({
            key: desc.key,
            value: job[desc.key as keyof typeof job],
        }));

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: getWidth(10), height: getHeight(20), display: "flex", alignItems: "center" }}>
                <ArrowComponent onPress={() => navigation.goBack()} />
            </View>
            <ScrollView>
                {/* Header Section */}

                <View style={styles.headerContainer}>

                    <View>
                        <Text style={styles.title}>{job?.jobTitle}</Text>

                    </View>
                    <View style={styles.jobTypeBadge}>
                        <Text style={styles.jobTypeText}>{job?.jobType}</Text>
                    </View>

                </View>

                {/* Job Type Badge */}


                {/* Job Overview Section */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Job Overview</Text>
                    <View style={styles.rowContainer}>
                        {filteredJobDetails?.map((item: JobDescription) => {
                            return (
                                <View style={styles.infoItem}>
                                    <Image
                                        // source={require('./assets/calendar.png')} 
                                        style={styles.infoIcon}
                                    />
                                    <View>
                                        <Text style={styles.infoLabel}>{item?.key}</Text>
                                        <Text style={[
                                            styles.infoValue,
                                            item?.key === "email" ? { fontSize: 10 } : {},
                                        ]}>{item?.key === "expirationDate" ? formatDate(item?.value ?? null) : item?.value}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

                {/* Job Description Section */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Job Description</Text>
                    <Text style={styles.descriptionText}>
                        As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data space.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    headerContainer: {
        padding: 20,
        backgroundColor: '#fff',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // backgroundColor:"red"
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: "red"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        flex: 1,
    },
    crownBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',

    },
    crownIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    jobTypeBadge: {
        backgroundColor: '#e8f0fe',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
    },
    jobTypeText: {
        color: '#4285f4',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 15,
        padding: 15,

    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '50%',
        marginBottom: 10,

    },
    infoIcon: {
        width: 22,
        height: 22,
        marginRight: 10,
        tintColor: '#4285f4',
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        color: '#777',
    },
    descriptionContainer: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#666',
    },
});

export default JobDetails;