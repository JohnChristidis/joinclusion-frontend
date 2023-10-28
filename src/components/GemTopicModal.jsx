import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { GemTopicAccordion } from './GemTopicAccordion.jsx'


export function GemTopicModal({ isOpenGemTopic, onCloseGemTopic, handleGemSelect, mod, handleMod, handleGemTopicSelect}) {


  if (!isOpenGemTopic) {
    return null;
  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white rounded-lg p-4 w-100 md:h-128 xl:h-160 max-w-lg">
        <h2 className="text-2xl mb-2 font-semibold">Select a Topic</h2>
        <div className="max-h-96 md:max-h-128 xl:max-h-160 overflow-y-auto"> {/* Added max height and overflow */}
          <GemTopicAccordion mod={mod} handleMod={handleMod} handleGemTopicSelect={handleGemTopicSelect}/>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onCloseGemTopic}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
