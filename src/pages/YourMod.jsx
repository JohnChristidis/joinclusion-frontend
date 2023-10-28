import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography
} from "@material-tailwind/react";

import { Location } from '../components/Location.jsx'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { config } from "../utils/config";
import { useParams } from 'react-router-dom';



export function YourMod({id}) {
  const [mod, setMod] = useState([
   {
     location: {
       id: 0,
       name: "Lockers",
       img: "lockers",
       interactibleAreas: [
         {
           interactibleArea: {
             id: 0,
             position: "bottom-4 left-10",
             character: "none",
           },
         },
         {
           interactibleArea: {
             id: 1,
             position: "bottom-4 right-4",
             character: "none",
           },
         },
       ],
       gemInteractibleAreas: [
           {
               gemInteractibleArea: {
                   id: 0,
                   position: "left-60 bottom-20 top-48",
                   gem: "none",
               },
           },
           {
               gemInteractibleArea: {
                   id: 1,
                   position: "bottom-20 right-60 top-48",
                   gem: "none",
               },
           },

       ],
     },
   },
   {
     location: {
       id: 1,
       name: "Math Class",
       img: "math_class",
       interactibleAreas: [
         {
           interactibleArea: {
             id: 0,
             position: "bottom-4 left-10",
             character: "none",
           },
         },
         {
           interactibleArea: {
             id: 1,
             position: "bottom-4 right-4",
             character: "none",
           },
         },
       ],
       gemInteractibleAreas: [
           {
               gemInteractibleArea: {
                   id: 0,
                   position: "left-60 bottom-20 top-48",
                   gem: "none",
               },
           },
           {
               gemInteractibleArea: {
                   id: 1,
                   position: "bottom-20 right-60 top-48",
                   gem: "none",
               },
           },
       ],
     },
   },
   {
     location: {
       id: 2,
       name: "Computer Class",
       img: "computer_class",
       interactibleAreas: [
         {
           interactibleArea: {
             id: 0,
             position: "bottom-4 left-10",
             character: "none",
           },
         },
         {
           interactibleArea: {
             id: 1,
             position: "bottom-4 right-4",
             character: "none",
           },
         },
       ],
       gemInteractibleAreas: [
           {
               gemInteractibleArea: {
                   id: 0,
                   position: "left-60 bottom-20 top-48",
                   gem: "none",
               },
           },
           {
               gemInteractibleArea: {
                   id: 1,
                   position: "bottom-20 right-60 top-48",
                   gem: "none",
               },
           },
       ],
     },
   },
   {
     location: {
       id: 3,
       name: "Literature Class",
       img: "literature_class",
       interactibleAreas: [
         {
           interactibleArea: {
             id: 0,
             position: "bottom-4 left-10",
             character: "none",
           },
         },
         {
           interactibleArea: {
             id: 1,
             position: "bottom-4 right-4",
             character: "none",
           },
         },
       ],
       gemInteractibleAreas: [
           {
               gemInteractibleArea: {
                   id: 0,
                   position: "left-60 bottom-20 top-48",
                   gem: "none",
               },
           },
           {
               gemInteractibleArea: {
                   id: 1,
                   position: "bottom-20 right-60 top-48",
                   gem: "none",
               },
           },

       ],
     },
   },

   // Add similar entries for other locations
 ]);
const [excistingMod, setExcistingMod] = useState([])

 const [info, setInfo] = useState({
   name: '',
   numberOfPlayers: 1,
   timer: {
     active: false,
     time: 3,
   },
   code: '',
 });
 const [errorMessage, setErrorMessage] = useState('');

 const { modId } = useParams();

   useEffect(() => {
    async function fetchModData() {
      //console.log(modId);
      try {
        const response = await axios.get(`${config.backendUrl}/mod/${modId}`);
        const fetchedModData = response.data[0];
        console.log(response);

        // Update the info state using the fetched mod data
        setInfo({
          name: fetchedModData.mod_name,
          numberOfPlayers: fetchedModData.number_of_players,
          timer: {
            active: fetchedModData.mod_timer_active,
            time: fetchedModData.mod_timer_time,
          },
          code: fetchedModData.mode_code,
        });

        const jsonString = fetchedModData.mod_json; // Your JSON string here


        const jsonData = JSON.parse(jsonString);

        // Function to remove double quotation marks from property names
        function removeQuotes(obj) {
          const newObj = {};
          for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
              const newKey = key.replace(/"/g, '');
              newObj[newKey] = typeof obj[key] === 'object' ? removeQuotes(obj[key]) : obj[key];
            }
          }
          return newObj;
        }

        // Clean the JSON data
        const cleanedData = removeQuotes(jsonData);
        const cleanedDataArray = Object.values(cleanedData);
        cleanedDataArray.forEach(entry => {
          entry.location.interactibleAreas = Object.values(entry.location.interactibleAreas);
          entry.location.gemInteractibleAreas = Object.values(entry.location.gemInteractibleAreas);
        })

        console.log("cleaned data : ",cleanedDataArray);
        console.log("mod : ",mod);
        setMod(cleanedDataArray);

      } catch (error) {
        console.error('Error fetching mod data:', error);
      }
    }

    fetchModData();
  }, [id]);


 const generateJsonContent = () => {
  const formattedMod = mod.map((entry) => {
    const formattedLocation = {
      id: entry.location.id,
      name: entry.location.name,
      img: entry.location.img,
      interactibleAreas: entry.location.interactibleAreas,
      gemInteractibleAreas: entry.location.gemInteractibleAreas,
    };

    return {
      location: formattedLocation,
    };
  });


  return JSON.stringify(formattedMod, null, 2); // Indent with 2 spaces for readability
};


 const handleMod = (updatedMod) => {
    setMod(updatedMod);
  };

  const handleNameChange = (event) => {
   setInfo({ ...info, name: event.target.value });
 };

 const handleNumberOfPlayersChange = (event) => {
   const newNumberOfPlayers = Math.min(Math.max(1, event.target.value), 10);
   setInfo({ ...info, numberOfPlayers: newNumberOfPlayers });
 };

 const handleTimerToggle = () => {
   setInfo((prevInfo) => ({
     ...prevInfo,
     timer: {
       active: !prevInfo.timer.active,
       time: prevInfo.timer.active ? 3 : prevInfo.timer.time,
     },
   }));
 };

 const handleTimerChange = (event) => {
   setInfo({ ...info, timer: { ...info.timer, time: event.target.value } });
 };


 const generateRandomCode = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
    setInfo({ ...info, code: randomCode.toString() });
  };


 const isFormValid = () => {
   return (
     info.name.trim() !== '' &&
     info.code.trim() !== '' &&
     info.numberOfPlayers >= 1 &&
     info.numberOfPlayers <= 10
   );
 };



 const isSaveButtonDisabled = () => {
   const hasCharacterWithoutTopic = mod.some((entry) =>
     entry.location.interactibleAreas.some(
       (ia) =>
         ia.interactibleArea.character !== 'none' &&
         !ia.interactibleArea.character.topic
     )
   );
   const hasGemWithoutTopic = mod.some((entry) =>
     entry.location.gemInteractibleAreas.some(
       (ia) =>
         ia.gemInteractibleArea.gem !== 'none' &&
         !ia.gemInteractibleArea.gem.gemTopic
     )
   );
   return (
     !info.name ||
     !info.code ||
     info.numberOfPlayers < 1 ||
     info.numberOfPlayers > 10 ||
     !info.numberOfPlayers ||
    // info.timer.time > 0 ||
    //  info.timer.time < 15||
     mod.every((entry) =>
       entry.location.interactibleAreas.every(
         (ia) => ia.interactibleArea.character === 'none'
       )
     ) ||
     hasCharacterWithoutTopic ||
     mod.every((entry) =>
      entry.location.gemInteractibleAreas.every(
        (ia) => ia.gemInteractibleArea.gem === 'none'
      )
    ) ||
    hasGemWithoutTopic
   );
 };


  const handleUpdateMod = async () => {
     console.log("Current id state", id);
     console.log("Current mod state", mod);
     console.log("Current info state:", info);
     try {
         const jsonData = generateJsonContent();
         console.log("Json Format:", jsonData);
         // Send a PUT request to the server
         const response = await axios.put(`${config.backendUrl}/update-mod/${modId}`, {
             teachers_id: id,
             mod_name: info.name,
             number_of_players: info.numberOfPlayers,
             mod_timer_active: info.timer.active,
             mod_timer_time: info.timer.time,
             mode_code: info.code,
             mod_json: jsonData,
             published: false, // Set published to false
         });

         console.log('Mod updated successfully:', response.data);
         setErrorMessage(''); // Clear any previous error messages
         window.location.href = '/';
         // Perform any necessary actions after successfully updating the mod
     } catch (error) {
         console.error('Error updating mod:', error);
         setErrorMessage('An error occurred while updating the mod. Please try again.');
     }
 };

  return (
    <div className="flex flex-col gap-4">
     <div className="bg-white p-6 shadow-md">
       <h2 className="text-2xl mb-4 font-semibold">Mod Configuration</h2>
       <div className="mb-3">
         <label className="block font-semibold mb-1">Name</label>
         <input
           type="text"
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
           placeholder="Mod Name"
           value={info.name}
           onChange={(e) => setInfo({ ...info, name: e.target.value })}
         />
       </div>
       <div className="mb-3">
         <label className="block font-semibold mb-1">Number of Players</label>
         <input
           type="number"
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
           placeholder="Number of Players"
           min="1"
           max="10"
           value={info.numberOfPlayers}
           onChange={(e) => setInfo({ ...info, numberOfPlayers: parseInt(e.target.value) })}
         />
       </div>
       <div className="mb-3">
         <label className="block font-semibold mb-1">Timer</label>
         <div className="flex items-center">
           <input
             type="checkbox"
             className="mr-2"
             checked={info.timer.active}
             onChange={() => setInfo({ ...info, timer: { ...info.timer, active: !info.timer.active } })}
           />
           <input
             type="number"
             className={`flex-grow px-3 py-2 border rounded-lg focus:outline-none ${info.timer.active ? 'border-blue-500' : 'border-gray-300'}`}
             placeholder="Time (minutes)"
             min="3"
             value={info.timer.active ? info.timer.time : ''}
             onChange={(e) => setInfo({ ...info, timer: { ...info.timer, time: parseInt(e.target.value) } })}
             disabled={!info.timer.active}
           />
         </div>
       </div>
       <div>
         <label className="block font-semibold mb-1">Code</label>
         <div className="flex items-center">
           <input
             type="text"
             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
             placeholder="Mod Code (4 digits)"
             pattern="\d{4}"
             maxLength="4"
             value={info.code}
             onChange={(e) => setInfo({ ...info, code: e.target.value })}
             readOnly  
           />
           <button
             className="bg-blue-500 text-white px-3 py-2 ml-2 rounded"
             onClick={generateRandomCode}
           >
             Generate Random Code
           </button>
         </div>
       </div>
       <button
         className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded ${isSaveButtonDisabled() ? 'opacity-50 pointer-events-none' : ''}`}
         onClick={handleUpdateMod}
         disabled={isSaveButtonDisabled()}
       >
         Update Mod Configuration
       </button>
       {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
     </div>
      {mod.map((entry, index) => (
    <div key={index} className="relative rounded-lg overflow-hidden mb-6">
      {/*<Location
        areaId={entry.location.id}
        name={entry.location.name}
        img={entry.location.img}
        interactibleAreas={entry.location.interactibleAreas}
        handleMod={handleMod}
        mod = {mod}
      /> */}

        <Location
          areaId={entry.location.id}
          name={entry.location.name}
          img={entry.location.img}
          interactibleAreas={entry.location.interactibleAreas}
          gemInteractibleAreas={entry.location.gemInteractibleAreas}
          handleMod={handleMod}
          mod = {mod}
        />

    </div>
  ))}
    </div>
  );
}
