import React from 'react';
import HotelStars from './HotelStars';

const HotelsDetails = (props) => {
  // Limit description to two lines
  const descriptionStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 2, // Limit to two lines
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  // Extract the first 3 words from the hotel name
  const hotelNameWords = props.element.name.split(' ').slice(0, 3).join(' ');

  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={props.element.pictures[0]} />
        </a>
        <div className="mt-4">
          <h2 className="text-gray-500 text-xl capitalize tracking-widest title-font mb-1">{hotelNameWords}</h2>
          <HotelStars stars={props.element.stars} />
          <div className='py-3'>
          <p style={descriptionStyle} className="text-gray-900 title-font text-sm font-medium">{props.element.description}</p>

          </div>
        </div>
        <div className='flex justify-between'>
          <a href="#_" className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-center text-indigo-100 border border-blue-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-slate-500 via-blue-500 to-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mr-2" viewBox="0 0 16 16">
              {/* Add SVG path for edit icon */}
            </svg>
            <span className="relative text-xs">Edit</span>
          </a>
          <a href="#_" className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-center text-indigo-100 border border-red-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-orange-500 via-red-500 to-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill mr-2" viewBox="0 0 16 16">
              {/* Add SVG path for delete icon */}
            </svg>
            <span className="relative text-xs">Delete</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default HotelsDetails;
