import DarkModeToggleButton from "@/components/DarkModeToggleButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-between p-24">
      <DarkModeToggleButton />
    </main>
  );
}
