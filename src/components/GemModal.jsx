import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { GemCarousel } from './GemCarousel.jsx'


export function GemModal({ isOpenGem, onCloseGem, handleGemSelect, mod }) {


  if (!isOpenGem) {
    return null;
  }



  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white rounded-lg p-2 w-80 md:h-128 xl:h-160">
        <h2 className="text-2xl mb-2 font-semibold">Select a Gem</h2>
        <GemCarousel handleGemSelect = {handleGemSelect} mod={mod}/>
        <div className="flex justify-end">

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onCloseGem}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
