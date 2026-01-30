import React from "react";
import { type LucideIcon } from "lucide-react";

type ButtonColor = "blue" | "green" | "pink" | "white" | "default";

interface TweetButtonProps {
  Icon: LucideIcon;
  // ZMIANA 1: Typ musi akceptować MouseEvent, aby pasował do tego, co przekazujesz w rodzicu
  action: (e: React.MouseEvent<HTMLButtonElement>) => void; 
  color?: ButtonColor;
  size?: number;
  counter?: number;
}

const colorVariants = {
  blue: {
    wrapper: "group-hover:bg-sky-500/10",
    icon: "group-hover:text-sky-500",
  },
  green: {
    wrapper: "group-hover:bg-green-500/10",
    icon: "group-hover:text-green-500",
  },
  pink: {
    wrapper: "group-hover:bg-pink-600/10",
    icon: "group-hover:text-pink-600",
  },
  white: {
    wrapper: "group-hover:bg-white/10",
    icon: "group-hover:text-white text-white",
  },
  default: {
    wrapper: "group-hover:bg-gray-500/10",
    icon: "group-hover:text-gray-600",
  },
};

const TweetButton = ({
  Icon,
  action,
  color = "blue",
  size = 18.75,
  counter,
}: TweetButtonProps) => {
  const styles = colorVariants[color] || colorVariants.default;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // To jest super - blokuje nawigację rodzica
        action(e); // ZMIANA 2: Musimy przekazać 'e' do funkcji action, żeby rodzic go odebrał
      }}
      className="group flex items-center transition-transform outline-none active:scale-90"
    >
      <div
        className={`flex items-center justify-center rounded-full p-2 transition-colors duration-200 ${styles.wrapper}`}
      >
        <Icon
          size={size}
          className={`text-gray-500 transition-colors duration-200 ${styles.icon}`}
        />
      </div>

      {counter !== undefined && counter > 0 && (
        <p className="font-chirp text-twitterDarkFont text-[13px] ml-1">{counter}</p>
      )}
    </button>
  );
};

export default TweetButton;