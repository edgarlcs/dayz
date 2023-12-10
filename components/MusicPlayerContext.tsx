"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext({
  playingId: null,
  setPlayingId: (id: any) => {},
});

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playingId, setPlayingId] = useState(null);

  return (
    <MusicPlayerContext.Provider value={{ playingId, setPlayingId }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
