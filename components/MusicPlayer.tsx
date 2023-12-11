"use client";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider-hover";
import { Pause, Play, Music, UserRound } from "lucide-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Unmixed from "./Unmixed";
import Mixed from "./Mixed";
import { motion } from "framer-motion";
import { isIOS } from "react-device-detect";
import { useMusicPlayer } from "./MusicPlayerContext";
import Spotify from "./Spotify";
import { Button } from "./ui/button";

interface MusicPlayerProps {
  mixedSong: string;
  rawSong: string;
  cover: StaticImageData;
  songName: string;
  artist: string;
  duration: number;
  backgroundColor?: string;
  spotifyLink?: string;
}
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
const MusicPlayer = ({
  mixedSong,
  rawSong,
  cover,
  songName,
  artist,
  duration,
  spotifyLink,
  backgroundColor,
}: MusicPlayerProps) => {
  const song1Ref = useRef<HTMLAudioElement>(null);
  const song2Ref = useRef<HTMLAudioElement>(null);
  const [mixValue, setMixValue] = useState<number>(0); // Default mix value set to 0 for equal mix
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isManuallySeeking, setIsManuallySeeking] = useState<boolean>(false);
  const [showMixer, setShowMixer] = useState<boolean>(true);
  const [background, setBackground] = useState<string>("bg-white");

  const { playingId, setPlayingId } = useMusicPlayer();
  useEffect(() => {
    setShowMixer(!isIOS);
  }, [isIOS]);

  useEffect(() => {
    if (backgroundColor) {
      setBackground(backgroundColor);
    }
  }, [backgroundColor]);

  useEffect(() => {
    const song1Volume = isIOS ? 1 : mixValue / 100;
    const song2Volume = 1 - song1Volume;

    if (song1Ref.current) {
      song1Ref.current.volume = song1Volume;
    }
    if (!isIOS && song2Ref.current) {
      song2Ref.current.volume = song2Volume;
    }
  }, [mixValue, isIOS]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (song1Ref.current && isPlaying && !isManuallySeeking) {
        setCurrentTime(song1Ref.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isManuallySeeking]);

  const handleTimeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManuallySeeking(true);
    const percentage = Number(e.target.value);
    const newTime = (duration * percentage) / 100; // Calculate the new time based on the percentage
    setCurrentTime(newTime);

    if (song1Ref.current) {
      song1Ref.current.currentTime = newTime;
    }
    if (!isIOS && song2Ref.current) {
      song2Ref.current.currentTime = newTime;
    }
    setIsManuallySeeking(false);
  };

  const playSongs = () => {
    const song1 = song1Ref.current;
    const song2 = song2Ref.current;

    if (song1 && song2 && !isIOS) {
      // Sync the current time of both songs before playing
      song2.currentTime = song1.currentTime;
      song1.currentTime = song2.currentTime;

      // Use a single play promise to play both songs simultaneously
      const playPromise = song1.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            song2.play().catch((error) => {
              console.error("Error playing second song:", error);
            });
          })
          .catch((error) => {
            console.error("Error playing first song:", error);
          });
      }
    } else if (song1) {
      // If only one song (or on mobile), just play the first song
      song1.play().catch((error) => {
        console.error("Error playing song:", error);
      });
    }
    setPlayingId(songName);
  };
  const pauseSongs = () => {
    const song1 = song1Ref.current;
    const song2 = song2Ref.current;

    if (song1) {
      if (isPlaying) {
        song1.pause();
      } else {
        playSongs();
      }
    }
    if (!isIOS && song2) {
      if (isPlaying) {
        song2.pause();
      }
    }
    setIsPlaying(false);
  };
  // Modify togglePlay
  useEffect(() => {
    // Pause the player if it's not the current playing one
    if (playingId !== songName && isPlaying) {
      pauseSongs();
    }
  }, [playingId, songName, isPlaying]);

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
    if (!isIOS && song2) {
      if (isPlaying) {
        song2.pause();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <motion.div
      className={`grid grid-cols-3 w-full md:w-[600px] gap-3 p-4 rounded-lg  shadow-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center gap-2"
      >
        <Image
          src={cover}
          alt={`${songName} cover`}
          height={128}
          width={128}
          className=" col-span-1 rounded-md shadow-lg"
          priority
        />
        <motion.a
          whileHover={{ scale: 1.2 }}
          href={spotifyLink}
          target="_blank"
        >
          <Spotify />
        </motion.a>
      </motion.div>

      <div className="flex flex-col col-span-2 justify-between">
        <audio ref={song1Ref} src={mixedSong} preload="auto" />
        <audio ref={song2Ref} src={rawSong} preload="auto" />
        <motion.div
          initial={{ x: -5 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <section className="flex flex-row gap-2 items-center">
            <Music />
            <p className="text-xl md:text-2xl font-bold">{songName}</p>
          </section>
          <section className="flex flex-row gap-2 items-center">
            <UserRound />
            <p className="text-lg md:text-xl">{artist}</p>
          </section>
        </motion.div>

        <div className="flex flex-row items-center gap-1">
          <motion.button
            onClick={togglePlay}
            className="play-button "
            whileHover={{ scale: 1.2 }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </motion.button>
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

      <div className={`${!showMixer ? "hidden" : ""} col-span-3`}>
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
      <div
        className={`${
          !showMixer ? "hidden" : ""
        } col-span-3 flex flex-row justify-between items-center`}
      >
        <Unmixed />
        <Mixed />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
