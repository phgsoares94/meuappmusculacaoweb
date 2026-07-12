import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { getExercicioById, treinos, type Exercicio } from "@/lib/data";

interface ExercicioPageProps {
  params: Promise<{ id: string }>;
}

const TIPO_LABEL: Record<Exercicio["tipo"], string | null> = {
  forca: "Força",
  finalizador: "Finalizador",
  normal: null,
};

export function generateStaticParams() {
  return treinos.flatMap((treino) =>
    treino.exercicios.map((exercicio) => ({ id: exercicio.id }))
  );
}

export async function generateMetadata({
  params,
}: ExercicioPageProps): Promise<Metadata> {
  const { id } = await params;
  const found = getExercicioById(id);
  return { title: found ? `${found.exercicio.nome} — Meus Treinos ABCD` : "Exercício" };
}

export default async function ExercicioPage({ params }: ExercicioPageProps) {
  const { id } = await params;
  const found = getExercicioById(id);

  if (!found) {
    notFound();
  }

  const { exercicio, treino } = found;
  const tipoLabel = TIPO_LABEL[exercicio.tipo];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <Header
        title={exercicio.nome}
        subtitle={treino.nome}
        backHref={`/treinos/${treino.id}`}
      />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#222222] text-sm text-white/50">
          Imagem do exercício
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-full bg-[#ac1a1a] px-4 py-1.5 text-sm font-bold text-white">
            {exercicio.series}x{exercicio.repeticoes}
          </span>
          {tipoLabel && (
            <span className="rounded-full bg-[#ac1a1a]/10 px-4 py-1.5 text-sm font-medium text-[#ac1a1a]">
              {tipoLabel}
            </span>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-[#222222]/10 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#222222]">Dicas de execução</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {exercicio.dicas.map((dica) => (
              <li key={dica} className="flex gap-3 text-sm text-[#222222]/80">
                <span className="mt-0.5 shrink-0 text-[#ac1a1a]">•</span>
                <span>{dica}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/treinos/${treino.id}`}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-[#ac1a1a] px-5 py-3.5 text-base font-bold text-white shadow-sm transition-transform active:scale-[0.98] hover:brightness-110"
        >
          Pronto! Vou começar
        </Link>
      </main>
    </div>
  );
}
