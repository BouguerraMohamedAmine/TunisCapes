import React from 'react';

const SeasDetails = (props) => {
  // Limit description to two lines
  const descriptionStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 2, // Limit to two lines
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={props.element.pictures[0]} />
        </a>
        <div className="mt-4">
          <h2 className="text-gray-500 text-xl capitalize tracking-widest title-font mb-1">{props.element.name}</h2>
          <div className='py-3'>
          <p style={descriptionStyle} className="text-gray-900 title-font text-sm font-medium">{props.element.description}</p>
          </div>
        </div>
        <div className='flex justify-between'>
        <a href="#_" class="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-center text-indigo-100 border border-blue-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-slate-500 via-blue-500 to-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill mr-2" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg><span class="relative text-xs">Edit</span>
</a>
<a href="#_" class="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-center text-indigo-100 border border-red-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-orange-500 via-red-500 to-red-500">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill mr-2" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg>
<span class="relative text-xs">Delete</span>
</a>
        </div>
      </div>
    </>
  );
};

export default SeasDetails;
