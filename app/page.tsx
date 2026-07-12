import Header from "@/components/Header";
import TreinoCard from "@/components/TreinoCard";
import { treinos } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <Header title="Meus Treinos ABCD" subtitle="Escolha o treino do dia" />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4">
          {treinos.map((treino) => (
            <TreinoCard key={treino.id} treino={treino} />
          ))}
        </div>
      </main>
    </div>
  );
}
