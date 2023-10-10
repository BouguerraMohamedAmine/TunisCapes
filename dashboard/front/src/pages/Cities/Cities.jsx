import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming you have a CitiesDetail component defined somewhere
import CitiesDetail from './CitiesDetail.jsx';

 const Cities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request
    axios.get('http://192.168.10.4:3000/cities')
      .then((response) => {
        // Update the state with the data received
        setData(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data.map((element, i) => (
            // Assuming CitiesDetail is a component that you've imported
            <CitiesDetail element={element} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default Cities