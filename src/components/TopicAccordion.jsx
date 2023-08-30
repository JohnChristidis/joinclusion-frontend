import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { topicsData } from '../utils/topics.js';

export function TopicAccordion({mod, handleMod, handleTopicSelect}) {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const assignedTopicIds = mod.flatMap((entry) =>
    entry.location.interactibleAreas
      .filter((ia) => ia.interactibleArea.character.topic)
      .map((ia) => ia.interactibleArea.character.topic.id)
  );

  // Filter out topics that are already assigned to characters
  const filteredTopics = topicsData.topics.filter(
    (topic) => !assignedTopicIds.includes(topic.topic.id)
  );

  return (
   <>
     {filteredTopics.map((topic) => (
       <Accordion key={topic.topic.id} open={open === topic.topic.id}>
         <AccordionHeader onClick={() => handleOpen(topic.topic.id)}>
            {topic.topic.header}

          </AccordionHeader>
         <AccordionBody>
           <div className="text-left">
             <p className="text-base mb-2 font-medium">{topic.topic.desc}</p>
             <hr className="my-4" />
             <p className="text-lg mb-3 font-semibold underline">Question: {topic.topic.question}</p>
             {topic.topic.choices.map((choice) => (
               <p
                 key={choice.choice.id}
                 className={`mb-2 text-base ${choice.choice.answer ? "text-green-500" : ""}`}
               >
                 {choice.choice.text}
               </p>

             ))}
             <button
               className="ml-auto bg-blue-500 text-white text-base px-2 py-1 rounded"
               onClick={() => {handleTopicSelect(topic.topic)}}>
               Choose
             </button>
           </div>
         </AccordionBody>
       </Accordion>
     ))}
   </>
 );
}
