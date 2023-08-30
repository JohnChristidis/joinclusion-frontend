import React, { useState } from 'react';



export function DEPModal({ isOpen, onClose, chosenId, utility, onPublish, onUnpublish, onDelete, onEdit}) {

  const getTitleText = () => {
   switch (utility) {
     case 'publish':
       return 'publish';
    case 'unpublish':
      return 'unpublish'
     case 'delete':
       return 'delete';
     case 'edit':
       return 'edit';
     default:
       return 'perform this action on';
   }
 };

 const handleAction = () => {
   switch (utility) {
     case 'publish':
       onPublish(chosenId); // Call the provided onPublish function
       break;
     case 'delete':
       onDelete(chosenId); // Call the provided onDelete function
       break;
     case 'edit':
       onEdit(chosenId); // Call the provided onEdit function
       break;
    case 'unpublish':
        onUnpublish(chosenId);
      break;
     default:
       // Handle other cases here
       break;
   }
   onClose(); // Close the modal after performing the action
 };

  if (!isOpen) {
    return null;
  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white rounded-lg p-4 w-100 md:h-128 xl:h-160 max-w-lg">
        <h2 className="text-2xl mb-2 font-semibold">Do you want to {getTitleText()} this mod?</h2>
          <div className="flex flex-col items-center justify-center h-full">

  <div className="flex">
    <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded" onClick={handleAction}>
      Yes
    </button>
    <button className="flex-1 ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
      No
    </button>
  </div>
</div>


      </div>
    </div>
  );
}
