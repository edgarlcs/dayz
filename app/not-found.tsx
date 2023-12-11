"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
// import Lottie from "react-lottie-player";
// import animation from "@/public/json/not-found.lottie"
const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center px-12 h-[calc(100dvh-80px)]">
      <h1 className="text-3xl font-bold">404</h1>
      <h2 className="text-2xl">Página no encontrada</h2>
      <div className=" w-11/12 lg:w-1/2">
        <DotLottiePlayer src={"/json/not-found.lottie"} />
      </div>
    </div>
  );
};

export default NotFound;
