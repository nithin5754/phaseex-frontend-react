import { WobbleCard } from "../aceternityuI/cards/wobble-card";

import SpaceOne from '../../../public/png/space1.png'
import spaceTwo  from '../../../public/png/folder.png'







export function ImageHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full ">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] opacity-70"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Improve collaboration
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          Get your teams working together more closely, even if they’re far apart. Centralize project-related communications in one place, brainstorm ideas with Whiteboards, and draft plans together with collaborative Docs.
          </p>
        </div>

        <img
          src={SpaceOne}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-6 object-contain rounded-2xl"
        />

      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] opacity-70">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        View work your way
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Instantly switch  views including list 
        board view coming
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] opacity-70">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Search everything
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Find any file in ClickUp, a connected app, or your local drive, from one place.
          </p>
        </div>

        <img
          src={spaceTwo}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-6 object-contain rounded-2xl"
        />

      </WobbleCard>
    </div>
  );
}
