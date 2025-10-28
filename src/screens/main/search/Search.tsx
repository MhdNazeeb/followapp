import { View, Text, StyleSheet, TextInput, FlatList, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JobCard from '../../../components/JobCard'
import { getHeight, getWidth } from '../../../Theme/constens'
import SearchIcon from '../../../assets/icons/SearchIcon'
import ArrowComponent from '../../../components/ArrowComponent'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navgation/navigation.types'
import { useSearchJob } from '../../../services/api/useSearchJob'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive breakpoints
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 360;
const isLargeScreen = screenWidth >= 414;

// Responsive scaling functions
const scale = (size: number) => (screenWidth / 375) * size;
const verticalScale = (size: number) => (screenHeight / 812) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const Search = () => {
    const navigation = useNavigation<NavigationProp>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [hasInteracted, setHasInteracted] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const initialRender = useRef(true);
    
    // Listen for dimension changes
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });

        return () => subscription?.remove();
    }, []);
    
    // Use the hook with search term directly, but only after user has interacted
    const { 
        data: jobData, 
        refetch: searchRefetch, 
        isLoading,
        isError,
        error
    } = useSearchJob(searchTerm, hasInteracted && !!searchTerm);

    // Update search results when job data changes
    useEffect(() => {
        if (initialRender.current) {
            console.log('Skipping initial render effect');
            initialRender.current = false;
            return;
        }

        console.log('Job data updated:', jobData);
        
        if (jobData) {
            try {
                const parsedData = Array.isArray(jobData) ? jobData : [];
                console.log('Setting search results:', parsedData.length);
                setSearchResults(parsedData);
            } catch (err) {
                console.error('Error parsing job data:', err);
                setSearchResults([]);
            }
        }
    }, [jobData]);

    // Handle search input change
    const handleTextChange = (text: string) => {
        console.log('Search term changed:', text);
        setSearchTerm(text);
        
        if (text !== '') {
            setHasInteracted(true);
        } else {
            setSearchResults([]);
        }
    };

    // Manually trigger search
    const handleSearch = async () => {
        if (!searchTerm || isLoading) {
            console.log('Search aborted - empty term or already loading');
            return;
        }
        
        setHasInteracted(true);
        setIsSearching(true);
        
        try {
            console.log('Performing search for:', searchTerm);
            const response = await searchRefetch();
            
            if (response && response.data) {
                const parsedData = Array.isArray(response.data) ? response.data : [];
                console.log('Search results received:', parsedData.length);
                setSearchResults(parsedData);
            } else {
                console.log('No search results or invalid response');
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.searchHeader}>
                <View style={styles.backButtonContainer}>
                    <ArrowComponent onPress={() => navigation?.goBack()} />
                </View>
                
                <View style={styles.searchIconContainer}>
                    <SearchIcon 
                        width={moderateScale(isTablet ? 35 : 25)} 
                        height={moderateScale(isTablet ? 25 : 20)} 
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={handleTextChange}
                        placeholder="Search your job title"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        numberOfLines={1}
                        multiline={false}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>

            {/* Status and results section */}
            <View style={styles.contentContainer}>
                {!hasInteracted ? (
                    <Text style={styles.instructionText}>Enter a job title to search</Text>
                ) : isLoading || isSearching ? (
                    <Text style={styles.loadingText}>Searching...</Text>
                ) : isError ? (
                    <Text style={styles.errorText}>
                        Error searching jobs: {error?.message || 'Unknown error'}
                    </Text>
                ) : searchTerm && searchResults.length === 0 ? (
                    <Text style={styles.noResultsText}>
                        No jobs found matching "{searchTerm}"
                    </Text>
                ) : searchResults.length > 0 ? (
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
                        renderItem={({ item }) => <JobCard job={item} screen='search' />}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        initialNumToRender={isTablet ? 8 : 5}
                        maxToRenderPerBatch={isTablet ? 8 : 5}
                        windowSize={isTablet ? 10 : 8}
                        removeClippedSubviews={true}
                    />
                ) : (
                    <Text style={styles.instructionText}>Enter a job title to search</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchHeader: {
        flexDirection: "row",
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1,
        alignItems: "center",
        width: '100%',
        minHeight: verticalScale(isTablet ? 70 : 60),
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backButtonContainer: {
        marginRight: scale(12),
        padding: moderateScale(4),
        minWidth: moderateScale(40),
        minHeight: moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIconContainer: {
        marginRight: scale(12),
        padding: moderateScale(isTablet ? 8 : 6),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: moderateScale(8),
        minWidth: moderateScale(isTablet ? 45 : 40),
        minHeight: moderateScale(isTablet ? 45 : 40),
    },
    inputContainer: {
        flex: 1,
        borderRadius: moderateScale(10),
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: scale(12),
        minHeight: verticalScale(isTablet ? 50 : 45),
        justifyContent: 'center',
    },
    searchInput: {
        flex: 1,
        fontSize: moderateScale(isTablet ? 18 : isSmallScreen ? 14 : 16),
        color: '#000',
        paddingVertical: verticalScale(Platform.OS === 'ios' ? 12 : 8),
        textAlignVertical: 'center',
        includeFontPadding: false,
        lineHeight: moderateScale(isTablet ? 24 : 20),
    },
    contentContainer: {
        flex: 1,
        paddingTop: verticalScale(16),
    },
    loadingText: {
        textAlign: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
        color: '#666',
        fontSize: moderateScale(isTablet ? 18 : 16),
        fontWeight: '500',
    },
    noResultsText: {
        textAlign: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
        color: '#666',
        fontSize: moderateScale(isTablet ? 18 : 16),
        lineHeight: moderateScale(isTablet ? 26 : 22),
    },
    errorText: {
        textAlign: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
        color: '#ff4444',
        fontSize: moderateScale(isTablet ? 18 : 16),
        lineHeight: moderateScale(isTablet ? 26 : 22),
        fontWeight: '500',
    },
    instructionText: {
        textAlign: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
        color: '#999',
        fontSize: moderateScale(isTablet ? 18 : 16),
        fontStyle: 'italic',
    },
    listContainer: {
        paddingHorizontal: scale(12),
        paddingBottom: verticalScale(20),
        paddingTop: verticalScale(8)
    }
})