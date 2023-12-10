"use client";
import Image from "next/image";
import logo from "@/public/images/ass.png";
import logoLight from "@/public/images/logo_light.svg";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <motion.div
      className=" flex  w-full h-16 justify-between items-center bg-white dark:bg-black pl-0 pr-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Image src={logo} alt="Adrian Dayz logo" height={64} priority />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-full md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground"></p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <a href="/docs" title="Introduction">
                  Re-usable components
                </a>
                <a href="/docs/installation" title="Installation">
                  How to install
                </a>
                <a href="/docs/primitives/typography" title="Typography">
                  Styles for headings
                </a>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <DarkModeToggleButton />
    </motion.div>
  );
};

export default Navbar;
