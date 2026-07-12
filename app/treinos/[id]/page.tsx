import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ExercicioCard from "@/components/ExercicioCard";
import { getTreinoById, treinos } from "@/lib/data";

interface TreinoPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return treinos.map((treino) => ({ id: treino.id }));
}

export async function generateMetadata({
  params,
}: TreinoPageProps): Promise<Metadata> {
  const { id } = await params;
  const treino = getTreinoById(id);
  return { title: treino ? `${treino.nome} — Meus Treinos ABCD` : "Treino" };
}

export default async function TreinoPage({ params }: TreinoPageProps) {
  const { id } = await params;
  const treino = getTreinoById(id);

  if (!treino) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <Header
        title={treino.nome}
        subtitle={`${treino.grupoMuscular} · ${treino.diaAbrev} (${treino.diaSemana})`}
        backHref="/"
      />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3">
          {treino.exercicios.map((exercicio, index) => (
            <ExercicioCard
              key={exercicio.id}
              exercicio={exercicio}
              ordem={index + 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
