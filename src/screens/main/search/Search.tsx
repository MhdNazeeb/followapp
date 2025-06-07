// import { View, Text, StyleSheet, TextInput } from 'react-native'
// import React, { useEffect, useState, useRef } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { FlatList } from 'react-native-gesture-handler'
// import JobCard from '../../../components/JobCard'
// import { getHeight, getWidth } from '../../../Theme/constens'
// import SearchIcon from '../../../assets/icons/SearchIcon'
// import ArrowComponent from '../../../components/ArrowComponent'
// import { useNavigation } from '@react-navigation/native'
// import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { RootStackParamList } from '../../../navgation/navigation.types'
// import { useSearchJob } from '../../../services/api/useSearchJob'

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const Search = () => {
//     const navigation = useNavigation<NavigationProp>();
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
//     const [searchResults, setSearchResults] = useState<any[]>([]);
//     const [hasInteracted, setHasInteracted] = useState<boolean>(false);
//     const initialRender = useRef(true);
    
//     // Use the hook with debounced search term, but only after user has interacted
//     const { 
//         data: jobData, 
//         refetch: searchRefetch, 
//         isLoading,
//         isError,
//         error
//     } = useSearchJob(debouncedSearchTerm, hasInteracted && !!debouncedSearchTerm);

//     // Debounce the search term
//     useEffect(() => {
//         // Mark that the user has interacted when they type
//         if (searchTerm !== '') {
//             setHasInteracted(true);
//         }

//         const debounceTimeout = setTimeout(() => {
//             if (searchTerm.trim()) {
//                 setDebouncedSearchTerm(searchTerm);
//             } else {
//                 setDebouncedSearchTerm('');
//                 setSearchResults([]);
//             }
//         }, 500);

//         return () => clearTimeout(debounceTimeout);
//     }, [searchTerm]);

//     // Update search results when job data changes
//     useEffect(() => {
//         if (initialRender.current) {
//             initialRender.current = false;
//             return;
//         }

//         if (jobData) {
//             setSearchResults(Array.isArray(jobData) ? jobData : []);
//         }
//     }, [jobData]);

//     // Handle search input change
//     const handleTextChange = (text: string) => {
//         setSearchTerm(text);
//     };

//     // Manually trigger search
//     const handleSearch = async () => {
//         if (!debouncedSearchTerm || isLoading) return;
//         setHasInteracted(true);
        
//         try {
//             const response = await searchRefetch();
            
//             if (response.data) {
//                 setSearchResults(Array.isArray(response.data) ? response.data : []);
//             }
//         } catch (error) {
//             console.error('Search error:', error);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.searchHeader}>
//                 <View>
//                     <ArrowComponent onPress={() => navigation?.goBack()} />
//                 </View>
//                 <View>
//                     <SearchIcon width={30} height={20} />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.searchInput}
//                         value={searchTerm}
//                         onChangeText={handleTextChange}
//                         placeholder="Search your job title"
//                         placeholderTextColor="black"
//                         onSubmitEditing={handleSearch}
//                         returnKeyType="search"
//                     />
//                 </View>
//             </View>

//             {/* Status and results section */}
//             {!hasInteracted ? (
//                 <Text style={styles.instructionText}>Enter a job title to search</Text>
//             ) : isLoading ? (
//                 <Text style={styles.loadingText}>Searching...</Text>
//             ) : isError ? (
//                 <Text style={styles.errorText}>Error searching jobs: {error?.message || 'Unknown error'}</Text>
//             ) : debouncedSearchTerm && searchResults.length === 0 ? (
//                 <Text style={styles.noResultsText}>No jobs found matching "{debouncedSearchTerm}"</Text>
//             ) : searchResults.length > 0 ? (
//                 <FlatList
//                     data={searchResults}
//                     keyExtractor={(item: any) => item?._id || Math.random().toString()}
//                     renderItem={({ item }) => <JobCard job={item} screen='' />}
//                     contentContainerStyle={styles.listContainer}
//                 />
//             ) : (
//                 <Text style={styles.instructionText}>Enter a job title to search</Text>
//             )}
//         </SafeAreaView>
//     );
// };

// export default Search;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     searchHeader: {
//         flexDirection: "row",
//         borderBottomColor: "black",
//         borderBottomWidth: 1,
//         alignItems: "center",
//         width: getWidth(1),
//         height: getHeight(15),
//         paddingHorizontal: 10,
//     },
//     inputContainer: {
//         flex: 1,
//     },
//     searchInput: {
//         flex: 1,
//         paddingVertical: 8,
//         paddingHorizontal: 10,
//         fontSize: 16,
//     },
//     loadingText: {
//         textAlign: 'center',
//         padding: 20,
//         color: '#666',
//     },
//     noResultsText: {
//         textAlign: 'center',
//         padding: 20,
//         color: '#666',
//     },
//     errorText: {
//         textAlign: 'center',
//         padding: 20,
//         color: 'red',
//     },
//     instructionText: {
//         textAlign: 'center',
//         padding: 20,
//         color: '#666',
//     },
//     listContainer: {
//         padding: 10,
//     }
// });


import { View, Text, StyleSheet, TextInput, FlatList, Platform } from 'react-native'
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

const Search = () => {
    const navigation = useNavigation<NavigationProp>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [hasInteracted, setHasInteracted] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const initialRender = useRef(true);
    
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

    // Platform-specific styles
    const platformStyles = {
        inputContainer: Platform.OS === 'ios' ? {
            flex: 1,
            borderRadius: 10,
            backgroundColor: '#f5f5f5',
            marginLeft: 10,
            height: 40,
            justifyContent: 'center'
        } : {
            flex: 1,
        },
        searchInput: Platform.OS === 'ios' ? {
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            fontSize: 16,
            height: 40,
        } : {
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            fontSize: 16,
        }
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.searchHeader}>
                <View>
                    <ArrowComponent onPress={() => navigation?.goBack()} />
                </View>
                <View>
                    <SearchIcon width={30} height={20} />
                </View>
                <View style={platformStyles.inputContainer}>
                    <TextInput
                        style={platformStyles.searchInput}
                        value={searchTerm}
                        onChangeText={handleTextChange}
                        placeholder="Search your job title"
                        placeholderTextColor="#666"
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                    />
                </View>
            </View>

            {/* Status and results section */}
            {!hasInteracted ? (
                <Text style={styles.instructionText}>Enter a job title to search</Text>
            ) : isLoading || isSearching ? (
                <Text style={styles.loadingText}>Searching...</Text>
            ) : isError ? (
                <Text style={styles.errorText}>Error searching jobs: {error?.message || 'Unknown error'}</Text>
            ) : searchTerm && searchResults.length === 0 ? (
                <Text style={styles.noResultsText}>No jobs found matching "{searchTerm}"</Text>
            ) : searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => <JobCard job={item} screen='' />}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.instructionText}>Enter a job title to search</Text>
            )}
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
        borderBottomColor: "black",
        borderBottomWidth: 1,
        alignItems: "center",
        width: getWidth(1),
        height: Platform.OS === 'ios' ? 60 : getHeight(15),
        paddingHorizontal: 10,
    },
    loadingText: {
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    noResultsText: {
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        padding: 20,
        color: 'red',
    },
    instructionText: {
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    listContainer: {
        padding: 10,
    }
});