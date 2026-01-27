import React from "react";
import { type LucideIcon } from "lucide-react";

type ButtonColor = "blue" | "green" | "pink" | "default";

interface TweetButtonProps {
  Icon: LucideIcon; // Przekazujemy komponent ikony, a nie JSX
  action: () => void;
  color?: ButtonColor; // Opcjonalny kolor, domyślnie 'blue' lub 'default'
  size?: number;
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
  default: {
    wrapper: "group-hover:bg-gray-500/10",
    icon: "group-hover:text-gray-600",
  },
};

const TweetButton = ({ Icon, action, color = "blue", size = 18.75 }: TweetButtonProps) => {
  const styles = colorVariants[color] || colorVariants.default;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Zapobiega kliknięciu w tweeta, gdy klikasz guzik
        action();
      }}
      className="group flex items-center outline-none transition-transform active:scale-90"
    >
      {/* Kółko tła */}
      <div className={`flex items-center justify-center rounded-full p-2 transition-colors duration-200 ${styles.wrapper}`}>
        {/* Ikona */}
        <Icon
          size={size}
          className={`text-gray-500 transition-colors duration-200 ${styles.icon}`}
        />
      </div>
      
      {/* Tutaj opcjonalnie w przyszłości dodasz licznik (np. liczbę lajków) */}
      {/* <span className={`ml-1 text-xs text-gray-500 ${styles.icon}`}>12</span> */}
    </button>
  );
};

export default TweetButton;