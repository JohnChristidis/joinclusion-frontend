import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { gemTopicsData } from '../utils/gemTopics.js';

export function GemTopicAccordion({mod, handleMod, handleGemTopicSelect}) {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  ///SOS !!!!!!!!!!!!!!!!!!!!! Check If topics or gemTopics
  const assignedTopicIds = mod.flatMap((entry) =>
    entry.location.gemInteractibleAreas
      .filter((ia) => ia.gemInteractibleArea.gem.gemTopic)
      .map((ia) => ia.gemInteractibleArea.gem.gemTopic.id)
  );
 
  // Filter out topics that are already assigned to characters

  const filteredTopics = gemTopicsData.gemTopics.filter(
    (gemTopic) => !assignedTopicIds.includes(gemTopic.gemTopic.id)
  );

  return (
   <>
     {filteredTopics.map((gemTopic) => (
       <Accordion key={gemTopic.gemTopic.id} open={open === gemTopic.gemTopic.id}>
         <AccordionHeader onClick={() => handleOpen(gemTopic.gemTopic.id)}>
            {gemTopic.gemTopic.header}

          </AccordionHeader>
         <AccordionBody>
           <div className="text-left">
             <p className="text-base mb-2 font-medium">{gemTopic.gemTopic.desc}</p>
             <hr className="my-4" />
             <p className="text-lg mb-3 font-semibold underline">Question: {gemTopic.gemTopic.question}</p>
             {gemTopic.gemTopic.choices.map((choice) => (
               <p
                 key={choice.choice.id}
                 className={`mb-2 text-base ${choice.choice.answer ? "text-green-500" : ""}`}
               >
                 {choice.choice.text}
               </p>

             ))}
             <button
               className="ml-auto bg-blue-500 text-white text-base px-2 py-1 rounded"
               onClick={() => {handleGemTopicSelect(gemTopic.gemTopic)}}>
               Choose
             </button>
           </div>
         </AccordionBody>
       </Accordion>
     ))}
   </>
 );
}
