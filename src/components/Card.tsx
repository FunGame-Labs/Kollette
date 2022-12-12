import { MediaRenderer } from "@thirdweb-dev/react";
import type { FC } from "react";

export interface CardProps {
  title: string | number;
  subtitle: string;
  description: string;
  image: string;
  disabled?: boolean;
  btnAction: () => void;
}

const Card: FC<CardProps> = ({
  title,
  subtitle,
  description,
  image,
  btnAction,
}) => {
  return (
    <div className="group card w-auto h-[480px] border border-neutral-medium bg-neutral-dark transition duration-300 hover:bg-neutral-medium">
      <figure>
        <MediaRenderer
          className="w-full scale-100 duration-200 ease-in group-hover:scale-125"
          src={image}
          alt={"nft"}
        />
      </figure>
      <div className="card-body">
        <p>
          <b>{subtitle}</b>
        </p>
        <h2 className="card-title text-white">{title}</h2>
        <p className="truncate text-neutral-light">{description}</p>
      </div>
      <div className="rounded-b-lg border-t border-t-slate-500 bg-neutral-medium p-2 invisible group-hover:visible">
        <button onClick={() => btnAction()} className="w-full font-bold">
          BUY
        </button>
      </div>
    </div>
  );
};

export default Card;
