import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { CharacterCarousel } from './CharacterCarousel.jsx'


export function CharacterModal({ isOpenCharacter, onCloseCharacter, handleCharacterSelect, mod }) {


  if (!isOpenCharacter) {
    return null;
  }



  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white rounded-lg p-2 w-80 md:h-128 xl:h-160">
        <h2 className="text-2xl mb-2 font-semibold">Select a Character</h2>
        <CharacterCarousel handleCharacterSelect = {handleCharacterSelect} mod={mod}/>
        <div className="flex justify-end">

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onCloseCharacter}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
