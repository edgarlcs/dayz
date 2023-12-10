import DarkModeToggleButton from "@/components/DarkModeToggleButton";
import MusicPlayer from "@/components/MusicPlayer";
import Image from "next/image";
import secuelas from "@/public/images/secuelas.jpg";
import plebes from "@/public/images/asi_son_mis_plebes.jpg";
import { MusicPlayerProvider } from "@/components/MusicPlayerContext";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center p-2 gap-4">
      <MusicPlayerProvider>
        <MusicPlayer
          mixedSong="/music/secuelas_fx.mp3"
          rawSong="/music/secuelas_raw.mp3"
          cover={secuelas}
          songName="Secuelas de amor"
          artist="Eduardo Cadena"
          duration={60 * 3 + 27}
          spotifyLink="https://open.spotify.com/track/40VPsCnOdYumiFNa16GnLw?si=2597df5515f54adb"
        />
        <MusicPlayer
          mixedSong="/music/plebes_fx.mp3"
          rawSong="/music/plebes_raw.mp3"
          cover={plebes}
          songName="Asi son mis plebes"
          artist="Sexta Zona"
          duration={60 * 2 + 55}
          spotifyLink="https://open.spotify.com/track/35HWyTECUU720n7wKKGxxJ?si=4b3c274b7ae34417"
        />
      </MusicPlayerProvider>
      {/* <iframe
        className="rounded-lg w-[600px]"
        src="https://open.spotify.com/embed/track/40VPsCnOdYumiFNa16GnLw?utm_source=generator"
        width="100%"
        height="352"
      
        // frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe> */}
    </main>
  );
}
