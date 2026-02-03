import { type ReactNode } from "react";

interface ButtonProps {
  SVGIcon: ReactNode;
  Text: String;
}

const NavigationSidebarButton = ({ SVGIcon, Text }: ButtonProps) => {
  return (
    <button className="flex items-center justify-start gap-2">
      <div>{SVGIcon}</div>
      <div className="text-xl">{Text}</div>
    </button>
  );
};

export default NavigationSidebarButton;
