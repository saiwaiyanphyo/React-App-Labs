import React, { useState } from 'react';
import { Button, View, Text, TouchableHighlight, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { searchMovies, OMDbMovie } from './api';

// Define types for navigation parameters
type RootStackParamList = {
  Home: undefined;
  Details: { movieData: OMDbMovie };
};

const ListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<OMDbMovie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Search function using OMDb API
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Search Error',
        text2: 'Please enter a movie title to search',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const results = await searchMovies(searchQuery.trim());
      setSearchResults(results);
      setHasSearched(true);

      // Show toast if no movies found
      if (results.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'No Movies Found',
          text2: `No movies found for "${searchQuery}"`,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Search Complete',
          text2: `Found ${results.length} movie(s)`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      Toast.show({
        type: 'error',
        text1: 'Search Failed',
        text2: error instanceof Error ? error.message : 'Unknown error occurred',
      });
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMovieItem = ({ item }: { item: OMDbMovie }) => (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('Details', {
          movieData: item,
        });
      }}
      style={styles.movieItem}
    >
      <View>
        <Text style={styles.movieTitle}>{item.Title}</Text>
        <Text style={styles.movieDetails}>
          {item.Year} • {item.Type}
        </Text>
        {item.Genre && (
          <Text style={styles.movieGenre}>{item.Genre}</Text>
        )}
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          editable={!isLoading}
        />
        <Button 
          title={isLoading ? "..." : "Search"} 
          onPress={handleSearch} 
          disabled={isLoading}
        />
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="darkred" />
          <Text style={styles.loadingText}>Searching movies...</Text>
        </View>
      )}

      {/* Conditional Rendering */}
      {!hasSearched && !isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Use the search box above to find movies
          </Text>
        </View>
      ) : !isLoading && searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          style={styles.movieList}
        />
      ) : !isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No movies found for "{searchQuery}"
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const DetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { movieData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>{movieData.Title}</Text>
      <Text style={styles.detailInfo}>Year: {movieData.Year}</Text>
      <Text style={styles.detailInfo}>Type: {movieData.Type}</Text>
      {movieData.Genre && (
        <Text style={styles.detailInfo}>Genre: {movieData.Genre}</Text>
      )}
      {movieData.Director && (
        <Text style={styles.detailInfo}>Director: {movieData.Director}</Text>
      )}
      {movieData.Actors && (
        <Text style={styles.detailInfo}>Cast: {movieData.Actors}</Text>
      )}
      {movieData.Plot && (
        <Text style={styles.detailPlot}>{movieData.Plot}</Text>
      )}
      {movieData.imdbRating && (
        <Text style={styles.detailRating}>IMDb Rating: {movieData.imdbRating}/10</Text>
      )}
    </View>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={ListScreen}
            options={{
              title: 'Movie Explorer',
              headerStyle: {
                backgroundColor: 'darkred',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: 'Movie Explorer',
              headerStyle: {
                backgroundColor: 'darkred',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  movieList: {
    flex: 1,
  },
  movieItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  movieDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  movieGenre: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  detailPlot: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  detailRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkred',
    marginTop: 16,
  },
});

export default App;