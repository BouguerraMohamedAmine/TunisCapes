// import React, { useState } from 'react';
// import { View, TextInput, Button, Image, FlatList, Text, StyleSheet } from 'react-native';
// import SearchResultsComponent from './SearchResultsComponent'; 
// import Lightbox from 'react-native-lightbox';
// import { useNavigation } from '@react-navigation/native';

// const SearchComponent = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState(null);

//   const navigation = useNavigation(); // Access the navigation object

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://192.168.10.2:3000/search/${query}`);
//       const data = await response.json();
//       setResults(data);

//       // Navigate to SearchResultComponent with the search results
//       navigation.navigate('SearchResultsComponent', { searchResults: data });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Search..."
//         value={query}
//         onChangeText={setQuery}
//       />
//       <Button title="Search" onPress={handleSearch} />

//       {/* Rest of your JSX code for displaying results */}
//       {/* ... */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 16, 
//     paddingLeft: 16, 
//     fontSize: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8, 
//   },
//   // Rest of your styles...
// });

// export default Search;
