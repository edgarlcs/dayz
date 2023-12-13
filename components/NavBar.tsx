"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import DarkModeToggleButton from "./DarkModeToggleButton";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className=" flex  w-full h-16 justify-between items-center bg-transparent dark:bg-black pl-0 pr-2"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 2 }}
    >
      <motion.div whileHover={{ scale: 1.2 }}>
        <Link href={"/"}>
          <Image src={logo} alt="Adrian Dayz logo" height={64} priority />
        </Link>
      </motion.div>

      <NavigationMenu>
        <NavigationMenuList className="">
          <NavigationMenuItem>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link href={"/"}>
                <Home />
              </Link>
            </motion.div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-1 ml-2 hover:underline hover:bg-transparent focus:bg-transparent">
              Servicios
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-full md:w-[400px]">
                <Link
                  className="w-full h-full"
                  href="/grabacion"
                  title="Grabación"
                >
                  <li className="flex items-center w-full hover:bg-gray-200gm dark:hover:bg-gray-800 p-2 rounded-md">
                    Grabación{" "}
                  </li>
                </Link>
                <Link
                  className="w-full h-full"
                  href="/mixing"
                  title="Mezcla y Masterización"
                >
                  <li className="flex items-center w-full hover:bg-gray-200gm dark:hover:bg-gray-800 p-2 rounded-md">
                    Mezcla y Masterización{" "}
                  </li>
                </Link>
                <Link
                  className="w-full h-full"
                  href="/produccion"
                  title="Producción Instrumental"
                >
                  <li className="flex items-center w-full hover:bg-gray-200gm dark:hover:bg-gray-800 p-2 rounded-md">
                    Producción Instrumental{" "}
                  </li>
                </Link>
                <Link className="w-full h-full" href="/clases" title="Clases">
                  <li className="flex items-center w-full hover:bg-gray-200gm dark:hover:bg-gray-800 p-2 rounded-md">
                    Clases{" "}
                  </li>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contacto">
              <div
                className={cn(
                  `bg-transparent px-1 text-sm font-medium hover:underline`
                )}
              >
                Contacto
              </div>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <DarkModeToggleButton />
    </div>
  );
};

export default Navbar;
