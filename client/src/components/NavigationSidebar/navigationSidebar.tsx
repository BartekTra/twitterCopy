import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { House, Twitter, Search, Bell, Mail, Bookmark, FlaskConical, User, CircleEllipsis} from "lucide-react";
import NavigationSidebarButton from "./NavigationSidebarComponents/NavigationSidebarButton";
const NavigationSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end">
      <div className="grid w-[259px] auto-rows-[60px] justify-start text-left">
        <NavigationSidebarButton
          SVGIcon={<Twitter size={26.25} />}
          Text={""}
        />
        <NavigationSidebarButton
          SVGIcon={<House size={26.25} />}
          Text={"Home"}
        />
        <NavigationSidebarButton
          SVGIcon={<Search size={26.25} />}
          Text={"Explore"}
        />
        <NavigationSidebarButton
          SVGIcon={<Bell size={26.25} />}
          Text={"Notifications"}
        />
        <NavigationSidebarButton
          SVGIcon={<Mail size={26.25} />}
          Text={"Chat"}
        />
        <NavigationSidebarButton
          SVGIcon={<Bookmark size={26.25} />}
          Text={"Bookmarks"}
        />
        <NavigationSidebarButton
          SVGIcon={<FlaskConical size={26.25} />}
          Text={"Creator Studio"}
        />
        <NavigationSidebarButton
          SVGIcon={<Twitter size={26.25} />}
          Text={"Premium"}
        />
        <NavigationSidebarButton
          SVGIcon={<User size={26.25} />}
          Text={"Profile"}
        />
        <NavigationSidebarButton
          SVGIcon={<CircleEllipsis size={26.25} />}
          Text={"More"}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
