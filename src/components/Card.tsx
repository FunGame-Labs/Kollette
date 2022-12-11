import { MediaRenderer } from "@thirdweb-dev/react";
import type { FC } from "react";

export interface CardProps {
  title: string;
  description: string;
  image: string;
  btnText: string;
  disabled?: boolean;
  btnAction: () => void;
}

const Card: FC<CardProps> = ({ title, description, image, btnAction }) => {
  return (
    <div className="group card w-auto border border-neutral-medium bg-neutral-dark transition duration-300 hover:bg-neutral-medium">
      <figure>
        <MediaRenderer
          className="w-full scale-100 duration-200 ease-in group-hover:scale-125"
          src={image}
          alt={"nft"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{title}</h2>
        <p className="truncate text-neutral-light">{description}</p>
        {/* <div className="card-actions justify-end"></div> */}
      </div>
      <div className="rounded-b-lg border-t border-t-slate-500 bg-neutral-medium p-2">
        <button onClick={() => btnAction()} className="w-full font-bold">
          BUY
        </button>
      </div>
    </div>
  );
};

export default Card;
