// SearchResultsComponent.js

import React from 'react';
import { View, Text } from 'react-native';

const SearchResultsComponent = ({ searchResults }) => {
  return (
    <View>
      {searchResults && searchResults.cities.map(city => (
        <View key={city._id}>
          <Text>{city.name}</Text>
          <Text>{city.description}</Text>
          {/* Add more logic to display other city data */}
        </View>
      ))}

      {searchResults && searchResults.deserts.map(desert => (
        <View key={desert._id}>
          <Text>{desert.name}</Text>
          <Text>{desert.description}</Text>
          {/* Add more logic to display desert data */}
        </View>
      ))}

      {searchResults && searchResults.events.map(event => (
        <View key={event._id}>
          <Text>{event.name}</Text>
          <Text>Time: {event.time}</Text>
          <Text>Contact: {event.contact}</Text>
          {/* Add more logic to display event data */}
        </View>
      ))}

      {searchResults && searchResults.hotels.map(hotel => (
        <View key={hotel._id}>
          <Text>{hotel.name}</Text>
          <Text>{hotel.description}</Text>
          {/* Add more logic to display hotel data */}
        </View>
      ))}

      {searchResults && searchResults.monuments.map(monument => (
        <View key={monument._id}>
          <Text>{monument.name}</Text>
          <Text>{monument.description}</Text>
          {/* Add more logic to display monument data */}
        </View>
      ))}

      {searchResults && searchResults.mountains.map(mountain => (
        <View key={mountain._id}>
          <Text>{mountain.name}</Text>
          <Text>{mountain.description}</Text>
          {/* Add more logic to display mountain data */}
        </View>
      ))}

      {searchResults && searchResults.museums.map(museum => (
        <View key={museum._id}>
          <Text>{museum.name}</Text>
          <Text>{museum.description}</Text>
          {/* Add more logic to display museum data */}
        </View>
      ))}

      {searchResults && searchResults.seas.map(sea => (
        <View key={sea._id}>
          <Text>{sea.name}</Text>
          <Text>{sea.description}</Text>
          {/* Add more logic to display sea data */}
        </View>
      ))}

      {searchResults && searchResults.restaurants.map(restaurant => (
        <View key={restaurant._id}>
          <Text>{restaurant.name}</Text>
          <Text>Cuisine: {restaurant.cuisine}</Text>
          <Text>Price: {restaurant.price}</Text>
          <Text>{restaurant.description}</Text>
          {/* Add more logic to display restaurant data */}
        </View>
      ))}
    </View>
  );
};

export default SearchResultsComponent;
