"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <motion.a whileHover={{ scale: 1.2 }} href="/">
        <Image src={logo} alt="Adrian Dayz logo" height={64} priority />
      </motion.a>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-full md:w-[400px]">
                <li className="flex items-center w-full dark:hover:bg-gray-800 p-2 rounded-md">
                  <Link className="" href="/grabacion" title="Grabación">
                    Grabación{" "}
                  </Link>
                </li>
                <li className="flex items-center w-full dark:hover:bg-gray-800 p-2 rounded-md">
                  <Link
                    className=""
                    href="/mixing"
                    title="Mezcla y Masterización"
                  >
                    Mezcla y Masterización{" "}
                  </Link>
                </li>
                <li className="flex items-center w-full dark:hover:bg-gray-800 p-2 rounded-md">
                  <Link
                    className=""
                    href="/produccion"
                    title="Producción Instrumental"
                  >
                    Producción Instrumental{" "}
                  </Link>
                </li>
                <li className="flex items-center w-full dark:hover:bg-gray-800 p-2 rounded-md">
                  <Link className="" href="/clases" title="Clases">
                    Clases{" "}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contacto" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contacto
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <DarkModeToggleButton />
    </div>
  );
};

export default Navbar;
