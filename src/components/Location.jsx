import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { CharacterModal } from './CharacterModal.jsx';
import { TopicModal } from './TopicModal.jsx';
 import {GemModal} from './GemModal.jsx';
 import {GemTopicModal} from './GemTopicModal.jsx';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Location({ areaId, name, img, interactibleAreas, gemInteractibleAreas, handleMod, mod }) {
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  const [isGemModalOpen, setIsGemModalOpen] = useState(false);
  const [isGemTopicModalOpen, setIsGemTopicModalOpen] = useState(false);

  const [currentPosition, setPosition] = useState(100);
  const [gemCurrentPosition, setGemPosition] = useState(100);

  const [characterForTopic, setCharacterForTopic] = useState(100);
  const [gemForTopic, setGemForTopic] = useState(100);

  const handlePosition = (id) => {
    setPosition(id);
  };

  const handleGemPosition = (id) => {
    setGemPosition(id);
  };

  const handleCharacterForTopic = (id) => {
    setCharacterForTopic(id);
  };

  const handleGemForTopic = (id) => {
    setGemForTopic(id);
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

  const handleGemSelect = (newGem) => {
    handleMod((prevMod) => {
      const updatedMod = prevMod.map((entry) => {
        if (entry.location.id === areaId) {
          const updatedGemInteractibleAreas = entry.location.gemInteractibleAreas.map((ia) => {
            if (ia.gemInteractibleArea.id === gemCurrentPosition) {
              return {
                ...ia,
                gemInteractibleArea: {
                  ...ia.gemInteractibleArea,
                  gem: {
                    id: newGem.id,         // Update id
                    name: newGem.name,     // Update name
                    img: newGem.img,       // Update img
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
              gemInteractibleAreas: updatedGemInteractibleAreas,
            },
          };
        }
        return entry;
      });

      return updatedMod;
    });

    setIsGemModalOpen(false); // Close the modal
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

  const handleGemRemove = (gemInteractibleAreaId) => {
    handleMod((prevMod) => {
      const updatedMod = prevMod.map((entry) => {
        if (entry.location.id === areaId) {
          const updatedGemInteractibleAreas = entry.location.gemInteractibleAreas.map((ia) => {
          // Compare the interactible area's id with the provided interactibleAreaId
            if (ia.gemInteractibleArea.id === gemInteractibleAreaId) {
              return {
                ...ia,
                gemInteractibleArea: {
                  ...ia.gemInteractibleArea,
                  gem: "none",
                },
              };
            }
            return ia;
          });

          return {
            ...entry,
            location: {
              ...entry.location,
              gemInteractibleAreas: updatedGemInteractibleAreas,
            },
          };
        }
        return entry;
      });

      return updatedMod;
    });

    setIsGemModalOpen(false); // Close the modal
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

 const handleGemTopicSelect = (selectedGemTopic) => {
  // Find the interactibleArea with the provided characterId
  const targetGem = gemInteractibleAreas.find(
    (ia) => ia.gemInteractibleArea.gem.id === gemForTopic
  );

  if (targetGem) {
    // Update the topic for the selected interactibleArea
    targetGem.gemInteractibleArea.gem.gemTopic = {
      id: selectedGemTopic.id,
      src: selectedGemTopic.src,
      header: selectedGemTopic.header,
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
              gemInteractibleAreas: [...gemInteractibleAreas],
            },
          };
        }
        return entry;
      });
      return updatedMod;
    });
  }
    setIsGemTopicModalOpen(false); // Close the modal
};



  const openCharacterModal = () => {
    setIsCharacterModalOpen(true);
  };

  const openGemModal = () => {
    setIsGemModalOpen(true);
  };

  const closeCharacterModal = () => {
    setIsCharacterModalOpen(false);
  };

  const closeGemModal = () => {
    setIsGemModalOpen(false);
  };

  const handlePositionAndOpenCharacterModal = (id) => {
    handlePosition(id);
    openCharacterModal();
  };

  const handleGemPositionAndOpenGemModal = (id) => {
    handleGemPosition(id);
    openGemModal();
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

  const openGemTopicModal = () => {
    setIsGemTopicModalOpen(true);
  };

  const closeGemTopicModal = () => {
    setIsGemTopicModalOpen(false);
  };

  const handleGemForGemTopicAndOpenGemTopicModal = (id) => {
    handleGemForTopic(id);
    openGemTopicModal();
  };




  return (
  <Card className="rounded-none h-100 md:h-128 xl:h-160 border-b-8 border-l-4 border-r-4">
    <CardHeader floated={false} className="h-96 md:h-128 xl:h-160 ">
      <div className="relative rounded-none overflow-hidden">
        <div
          className="bg-cover bg-center h-96 md:h-128 xl:h-160"
          style={{ backgroundImage: `url(/assets/areas/${img}.jpg)` }}
        >
        {gemInteractibleAreas.map((gemInteractibleArea) => (
          <div key={gemInteractibleArea.gemInteractibleArea.id} className={`absolute  ${gemInteractibleArea.gemInteractibleArea.position}`}>
            {gemInteractibleArea.gemInteractibleArea.gem !== "none" ? (
              <div className="flex flex-col items-center relative">

                {gemInteractibleArea.gemInteractibleArea.gem.img ? (
                  <button
                    className="px-9 text-white px-3 py-1 rounded mt-6 relative"
                    onClick={() => handleGemPositionAndOpenGemModal(gemInteractibleArea.gemInteractibleArea.id)}
                  >
                    <img
                      src={`/assets/gems/${gemInteractibleArea.gemInteractibleArea.gem.img}.png`}
                      alt={`Button ${gemInteractibleArea.gemInteractibleArea.id}`}
                      className="w-7 h-10"
                    />
                    <div className="w-0 h-0 border-t-2 border-white border-solid transform -rotate-45 absolute -top-2 right-1/2"></div>
                  </button>
                ) : (
                  <button
                    className="bg-white bg-opacity-50 hover:bg-opacity-70 px-5 py-5 text-white px-3 py-1 rounded transition duration-300"
                    onClick={() => handleGemPositionAndOpenGemModal(gemInteractibleArea.gemInteractibleArea.id)}
                  >
                    <FaPlusCircle className="w-5 h-5" />
                  </button>
                )}

                {gemInteractibleArea.gemInteractibleArea.gem.img && (
                  <div className="absolute -top-10 transform flex flex-col items-center">
                {/*  {gemInteractibleArea.gemInteractibleArea.gem.gemTopic && (

                    <div className="text-center -top-20 text-sm mb-2 bg-white bg-opacity-90 rounded-md p-2 shadow-md relative ">
                      {gemInteractibleArea.gemInteractibleArea.gem.gemTopic.header}
                    </div>
                  )}
*/}
                <div className="absolute -top-5 transform">

                  <div className="w-[6rem] bg-white bg-opacity-90 rounded-md p-2 shadow-md relative">
                    <div className="flex flex-col items-center">

                      {gemInteractibleArea.gemInteractibleArea.gem.gemTopic ?(
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full text-ellipsis overflow-hidden truncate"
                          onClick={() => handleGemForGemTopicAndOpenGemTopicModal(gemInteractibleArea.gemInteractibleArea.gem.id)}
                        >
                        {gemInteractibleArea.gemInteractibleArea.gem.gemTopic.header} </button>):
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full overflow-hidden"
                          onClick={() => handleGemForGemTopicAndOpenGemTopicModal(gemInteractibleArea.gemInteractibleArea.gem.id)}
                        >
                        Topic </button>

                      }
                      {/*
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full overflow-hidden"
                        onClick={() => handleGemForGemTopicAndOpenGemTopicModal(gemInteractibleArea.gemInteractibleArea.gem.id)}
                      >
                      Topic </button>
                      */}
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-lg transition duration-300 w-full"
                        onClick={() => handleGemRemove(gemInteractibleArea.gemInteractibleArea.id)}
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
                className="bg-white bg-opacity-50 hover:bg-opacity-70 px-5 py-5 text-white px-3 py-1 rounded transition duration-300"
                onClick={() => handleGemPositionAndOpenGemModal(gemInteractibleArea.gemInteractibleArea.id)}
              >
                <FaPlusCircle className="w-4 h-4" />
              </button>
            )}
            <GemModal isOpenGem={isGemModalOpen} onCloseGem={closeGemModal} handleGemSelect={handleGemSelect} mod={mod} />
             <GemTopicModal isOpenGemTopic={isGemTopicModalOpen} onCloseGemTopic={closeGemTopicModal} handleGemTopicSelect={handleGemTopicSelect} mod={mod} handleMod={handleMod}/>
        </div>
        ))}
          {interactibleAreas.map((interactibleArea) => (
            <div key={interactibleArea.interactibleArea.id} className={`absolute ${interactibleArea.interactibleArea.position}`}>
              {interactibleArea.interactibleArea.character !== "none" ? (
                <div className="flex flex-col items-center relative">

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

                  {interactibleArea.interactibleArea.character.img && (
                    <div className="absolute -top-10 transform flex flex-col items-center">
                  {/*  {interactibleArea.interactibleArea.character.topic && (

                      <div className="text-center -top-20 text-sm mb-2 bg-white bg-opacity-90 rounded-md p-2 shadow-md relative ">
                        {interactibleArea.interactibleArea.character.topic.header}
                      </div>
                    )}
*/}
                  <div className="absolute -top-5 transform">

                    <div className="w-[6rem] bg-white bg-opacity-90 rounded-md p-2 shadow-md relative">
                      <div className="flex flex-col items-center">

                        {interactibleArea.interactibleArea.character.topic ?(
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full text-ellipsis overflow-hidden truncate"
                            onClick={() =>handleCharacterForTopicAndOpenTopicModal(interactibleArea.interactibleArea.character.id)}
                          >
                          {interactibleArea.interactibleArea.character.topic.header} </button>):
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full overflow-hidden"
                            onClick={() =>handleCharacterForTopicAndOpenTopicModal(interactibleArea.interactibleArea.character.id)}
                          >
                          Topic </button>

                        }
                        {/*
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg transition duration-300 mb-1 w-full overflow-hidden"
                          onClick={() => handleCharacterForTopicAndOpenTopicModal(interactibleArea.interactibleArea.character.id)}
                        >
                        Topic  </button>
                        */}
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

        {/*--------> NEW GEM <--------*/}



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
