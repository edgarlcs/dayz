"use client";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Music, UserRound } from "lucide-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Unmixed from "./Unmixed";
import Mixed from "./Mixed";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { useMusicPlayer } from "./MusicPlayerContext";

interface MusicPlayerProps {
  mixedSong: string;
  rawSong: string;
  cover: StaticImageData;
  songName: string;
  artist: string;
}

const MusicPlayer = ({
  mixedSong,
  rawSong,
  cover,
  songName,
  artist,
}: MusicPlayerProps) => {
  const song1Ref = useRef<HTMLAudioElement>(null);
  const song2Ref = useRef<HTMLAudioElement>(null);
  const [mixValue, setMixValue] = useState<number>(0); // Default mix value set to 0 for equal mix
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60 * 3 + 27);
  const [isManuallySeeking, setIsManuallySeeking] = useState<boolean>(false);
  const { playingId, setPlayingId } = useMusicPlayer();

  useEffect(() => {
    const song1 = song1Ref.current;
    const song2 = song2Ref.current;
    const setAudioData = () => {
      let duration = song1?.duration || 0;
      if (!isMobile) {
        duration = Math.max(duration, song2?.duration || 0);
      }
      setDuration(duration);
    };

    song1?.addEventListener("loadedmetadata", setAudioData);
    if (!isMobile) {
      song2?.addEventListener("loadedmetadata", setAudioData);
    }

    return () => {
      song1?.removeEventListener("loadedmetadata", setAudioData);
      if (!isMobile) {
        song2?.removeEventListener("loadedmetadata", setAudioData);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const song1Volume = isMobile ? 1 : mixValue / 100;
    const song2Volume = 1 - song1Volume;

    if (song1Ref.current) {
      song1Ref.current.volume = song1Volume;
    }
    if (!isMobile && song2Ref.current) {
      song2Ref.current.volume = song2Volume;
    }
  }, [mixValue, isMobile]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (song1Ref.current && isPlaying && !isManuallySeeking) {
        setCurrentTime(song1Ref.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isManuallySeeking]);

  const handleTimeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(e.target.value);
    const newTime = (duration * percentage) / 100; // Calculate the new time based on the percentage
    setCurrentTime(newTime);

    if (song1Ref.current) {
      song1Ref.current.currentTime = newTime;
    }
    if (!isMobile && song2Ref.current) {
      song2Ref.current.currentTime = newTime;
    }
  };

  const playSongs = async () => {
    const song1 = song1Ref.current;
    const song2 = song2Ref.current;

    try {
      // Play the first song
      if (song1) {
        await song1.play();
      }
      // Sync and play the second song if not mobile
      if (!isMobile && song1 && song2) {
        song2.currentTime = song1.currentTime;
        await song2.play();
      }
    } catch (error) {
      console.error("Error playing songs:", error);
    }
  };

  // Modify togglePlay
  useEffect(() => {
    if (playingId !== songName) {
      setIsPlaying(false);
    }
    if (playingId === songName) {
      setIsPlaying(true);
    }
  }, [isPlaying, playingId]);
  const togglePlay = () => {
    const song1 = song1Ref.current;
    const song2 = song2Ref.current;

    if (song1) {
      if (isPlaying) {
        song1.pause();
      } else {
        playSongs();
      }
    }
    if (!isMobile && song2) {
      if (isPlaying) {
        song2.pause();
      }
    }
    setIsPlaying((prev) => {
      if (prev) {
        setPlayingId(null);
      } else {
        setPlayingId(songName);
      }
      return prev;
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <motion.div
      className="grid grid-cols-3 w-full gap-3 p-4 rounded-lg border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Image
        src={cover}
        alt="Adrian Dayz logo"
        height={128}
        className=" col-span-1"
      />
      <div className="flex flex-col col-span-2 justify-between">
        <audio ref={song1Ref} src={mixedSong} />
        <audio ref={song2Ref} src={rawSong} />
        <div>
          <section className="flex flex-row gap-2 items-center">
            <Music />
            <p className="text-xl font-bold">{songName}</p>
          </section>
          <section className="flex flex-row gap-2 items-center">
            <UserRound />
            <p className="text-lg">{artist}</p>
          </section>
        </div>

        <div className="flex flex-row items-center gap-1">
          <button onClick={togglePlay} className="play-button ">
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <input
            id="time-slider"
            type="range"
            min="0"
            step={"0.1"}
            max={100} // Set max to 100 for percentage
            value={(currentTime / duration) * 100} // Set the value as a percentage of the duration
            onChange={handleTimeSliderChange}
            className="slider"
            style={{
              background: `linear-gradient(to right, #555 ${
                (currentTime / duration) * 100
              }%, #d3d3d3 ${(currentTime / duration) * 100}% )`,
            }}
          />
          <div className=" w-[50px] text-center">{formatTime(currentTime)}</div>
        </div>
      </div>

      <div className="hidden md:block col-span-3">
        <Slider
          defaultValue={[0]}
          max={100}
          step={1}
          value={[mixValue]}
          onValueChange={(value) => {
            setMixValue(Number(value[0]));
          }}
        />
      </div>
      <div className="hidden  col-span-3 md:flex flex-row justify-between">
        <Unmixed />
        <Mixed />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
