import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export default function Spinner() {
  return (
    <div className='w-full h-screen mx-auto grid place-content-center'>
      <BiLoaderAlt className='animate-spin text-6xl text-blue-600' />
    </div>
  );
}
