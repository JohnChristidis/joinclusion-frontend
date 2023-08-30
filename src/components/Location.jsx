import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { CharacterModal } from './CharacterModal.jsx';
import { TopicModal } from './TopicModal.jsx';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Location({ areaId, name, img, interactibleAreas, handleMod, mod }) {
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [currentPosition, setPosition] = useState(100);
  const [characterForTopic, setCharacterForTopic] = useState(100);

  const handlePosition = (id) => {
    setPosition(id);
  };

  const handleCharacterForTopic = (id) => {
    setCharacterForTopic(id);
  };
  const handleCharacterSelect = (newCharacter) => {
    handleMod((prevMod) => {
      const updatedMod = prevMod.map((entry) => {
        if (entry.location.id === areaId) {
          const updatedInteractibleAreas = entry.location.interactibleAreas.map((ia) => {
            if (ia.interactibleArea.id === currentPosition) {
              return {
                ...ia,
                interactibleArea: {
                  ...ia.interactibleArea,
                  character: {
                    id: newCharacter.id,         // Update id
                    name: newCharacter.name,     // Update name
                    img: newCharacter.img,       // Update img
                  },
                },
              };
            }
            return ia;
          });

          return {
            ...entry,
            location: {
              ...entry.location,
              interactibleAreas: updatedInteractibleAreas,
            },
          };
        }
        return entry;
      });

      return updatedMod;
    });

    setIsCharacterModalOpen(false); // Close the modal
  };

  const handleCharacterRemove = (interactibleAreaId) => {
    handleMod((prevMod) => {
      const updatedMod = prevMod.map((entry) => {
        if (entry.location.id === areaId) {
          const updatedInteractibleAreas = entry.location.interactibleAreas.map((ia) => {
          // Compare the interactible area's id with the provided interactibleAreaId
            if (ia.interactibleArea.id === interactibleAreaId) {
              return {
                ...ia,
                interactibleArea: {
                  ...ia.interactibleArea,
                  character: "none",
                },
              };
            }
            return ia;
          });

          return {
            ...entry,
            location: {
              ...entry.location,
              interactibleAreas: updatedInteractibleAreas,
            },
          };
        }
        return entry;
      });

      return updatedMod;
    });

    setIsCharacterModalOpen(false); // Close the modal
  };

  const handleTopicSelect = (selectedTopic) => {
   // Find the interactibleArea with the provided characterId
   const targetCharacter = interactibleAreas.find(
     (ia) => ia.interactibleArea.character.id === characterForTopic
   );

   if (targetCharacter) {
     // Update the topic for the selected interactibleArea
     targetCharacter.interactibleArea.character.topic = {
       id: selectedTopic.id,
       src: selectedTopic.src,
       header: selectedTopic.header,
       // Add other properties as needed
     };

     // Update the mod state
     handleMod((prevMod) => {
       const updatedMod = prevMod.map((entry) => {
         if (entry.location.id === areaId) {
           return {
             ...entry,
             location: {
               ...entry.location,
               interactibleAreas: [...interactibleAreas],
             },
           };
         }
         return entry;
       });
       return updatedMod;
     });
   }
     setIsTopicModalOpen(false); // Close the modal
 };



  const openCharacterModal = () => {
    setIsCharacterModalOpen(true);
  };

  const closeCharacterModal = () => {
    setIsCharacterModalOpen(false);
  };

  const handlePositionAndOpenCharacterModal = (id) => {
    handlePosition(id);
    openCharacterModal();
  };

  ////TOPIC MODAL///

  const openTopicModal = () => {
    setIsTopicModalOpen(true);
  };

  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  const handleCharacterForTopicAndOpenTopicModal = (id) => {
    handleCharacterForTopic(id);
    openTopicModal();
  };




  return (
  <Card className="rounded-none h-100 md:h-128 xl:h-160 border-b-8 border-l-4 border-r-4">
    <CardHeader floated={false} className="h-96 md:h-128 xl:h-160 ">
      <div className="relative rounded-none overflow-hidden">
        <div
          className="bg-cover bg-center h-96 md:h-128 xl:h-160"
          style={{ backgroundImage: `url(/assets/areas/${img}.jpg)` }}
        >
          {interactibleAreas.map((interactibleArea) => (
            <div key={interactibleArea.interactibleArea.id} className={`absolute ${interactibleArea.interactibleArea.position}`}>
              {interactibleArea.interactibleArea.character !== "none" ? (
                <div className="flex flex-col items-center relative">
                  {/* Character image */}
                  {interactibleArea.interactibleArea.character.img ? (
                    <button
                      className="px-9 text-white px-3 py-1 rounded mt-6 relative"
                      onClick={() => handlePositionAndOpenCharacterModal(interactibleArea.interactibleArea.id)}
                    >
                      <img
                        src={`/assets/characters/${interactibleArea.interactibleArea.character.img}.png`}
                        alt={`Button ${interactibleArea.interactibleArea.id}`}
                        className="w-30 h-40"
                      />
                      <div className="w-0 h-0 border-t-2 border-white border-solid transform -rotate-45 absolute -top-2 right-1/2"></div>
                    </button>
                  ) : (
                    <button
                      className="bg-white bg-opacity-50 hover:bg-opacity-70 px-9 py-20 text-white px-3 py-1 rounded transition duration-300"
                      onClick={() => handlePositionAndOpenCharacterModal(interactibleArea.interactibleArea.id)}
                    >
                      <FaPlusCircle className="w-6 h-6" />
                    </button>
                  )}
                  {/* Speech bubble */}
                  {interactibleArea.interactibleArea.character.img && (
                    <div className="absolute -top-10 transform flex flex-col items-center">
                    {interactibleArea.interactibleArea.character.topic && (

                      <div className="text-center -top-20 text-sm mb-2 bg-white bg-opacity-90 rounded-md p-2 shadow-md relative ">
                        {interactibleArea.interactibleArea.character.topic.header}
                      </div>
                    )}

                  <div className="absolute -top-5 transform">

                    <div className="bg-white bg-opacity-90 rounded-md p-2 shadow-md relative">
                      <div className="flex flex-col items-center">

                        {/* Buttons for actions */}
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full overflow-hidden"
                          onClick={() => handleCharacterForTopicAndOpenTopicModal(interactibleArea.interactibleArea.character.id)}
                        >
                        Topic  </button>

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-lg transition duration-300 w-full"
                          onClick={() => handleCharacterRemove(interactibleArea.interactibleArea.id)}
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                  </div>
                )}

                </div>
              ) : (
                <button
                  className="bg-white bg-opacity-50 hover:bg-opacity-70 px-9 py-20 text-white px-3 py-1 rounded transition duration-300"
                  onClick={() => handlePositionAndOpenCharacterModal(interactibleArea.interactibleArea.id)}
                >
                  <FaPlusCircle className="w-6 h-6" />
                </button>
              )}
              <CharacterModal isOpenCharacter={isCharacterModalOpen} onCloseCharacter={closeCharacterModal} handleCharacterSelect={handleCharacterSelect} mod={mod} />
               <TopicModal isOpenTopic={isTopicModalOpen} onCloseTopic={closeTopicModal} handleTopicSelect={handleTopicSelect} mod={mod} handleMod={handleMod}/>
          </div>
          ))}
        </div>
      </div>
    </CardHeader>
    <CardBody className="text-center">
      <Typography variant="h3" color="blue-gray" className="mb-2">
        {name}
      </Typography>
    </CardBody>
  </Card>
);

  }
