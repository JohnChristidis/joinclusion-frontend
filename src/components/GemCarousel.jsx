import { Carousel, IconButton } from "@material-tailwind/react";
import gemData from '../utils/gems.js'

export function GemCarousel({handleGemSelect, mod}) {

  const selectedGems = mod.flatMap(entry =>
    entry.location.gemInteractibleAreas.map(area => area.gemInteractibleArea.gem)
  );

  // Filter out characters that are already in the mod
  const availableGems = gemData.gems.filter(
    gem => !selectedGems.some(selected => selected && selected.id === gem.id)
  );

  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="gray"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="gray"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
             <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
               {new Array(length).fill("").map((_, i) => (
                 <span
                   key={i}
                   className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                     activeIndex === i ? "w-0 bg-white" : "w-0 bg-white/50"
                   }`}
                   onClick={() => setActiveIndex(i)}
                 />
               ))}
             </div>
           )}
    >
    {availableGems.length > 0 ? (
           availableGems.map((gem, index) => (
             <div key={index}>
               <button
                 className="bg-white bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg transition duration-300"
                 onClick={() => {
                   handleGemSelect(gem);
                 }}
               >
                 <img
                   src={`/assets/gems/${gem.img}.png`}
                   alt={`${gem.name} Image`}
                   className="w-30 h-40 cursor-pointer"
                 />
               </button>
               
             </div>
           ))
         ) : (
           <div className="text-center">
             <p  className="text-2xl mb-2 font-semibold">No available </p>
             <p  className="text-2xl mb-2 font-semibold"> gems left</p>
           </div>
         )}




    </Carousel>
  );
}
