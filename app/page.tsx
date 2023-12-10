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
        />
        <MusicPlayer
          mixedSong="/music/plebes_fx.mp3"
          rawSong="/music/plebes_raw.mp3"
          cover={plebes}
          songName="Asi son mis plebes"
          artist="Sexta Zona"
          duration={60 * 2 + 55}
        />
      </MusicPlayerProvider>
    </main>
  );
}
