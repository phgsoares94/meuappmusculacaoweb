import Link from "next/link";
import { getSessaoByData } from "@/lib/data";

interface CalendarioProps {
  ano: number;
  mes: number;
}

const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

interface CelulaDia {
  dia: number;
  dataISO: string;
}

function formatarDataISO(ano: number, mes: number, dia: number): string {
  return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

function gerarSemanas(ano: number, mes: number): (CelulaDia | null)[][] {
  const primeiroDiaSemana = (new Date(ano, mes - 1, 1).getDay() + 6) % 7;
  const totalDias = new Date(ano, mes, 0).getDate();

  const celulas: (CelulaDia | null)[] = [
    ...Array.from({ length: primeiroDiaSemana }, () => null),
    ...Array.from({ length: totalDias }, (_, i) => ({
      dia: i + 1,
      dataISO: formatarDataISO(ano, mes, i + 1),
    })),
  ];

  while (celulas.length % 7 !== 0) {
    celulas.push(null);
  }

  const semanas: (CelulaDia | null)[][] = [];
  for (let i = 0; i < celulas.length; i += 7) {
    semanas.push(celulas.slice(i, i + 7));
  }
  return semanas;
}

export default function Calendario({ ano, mes }: CalendarioProps) {
  const semanas = gerarSemanas(ano, mes);
  const hoje = new Date();
  const hojeISO = formatarDataISO(
    hoje.getFullYear(),
    hoje.getMonth() + 1,
    hoje.getDate()
  );

  return (
    <div className="rounded-2xl border border-[#222222]/10 bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#222222]/60 sm:gap-2">
        {DIAS_SEMANA.map((dia) => (
          <div key={dia} className="py-1">
            {dia}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-2">
        {semanas.map((semana, semanaIndex) =>
          semana.map((celula, diaIndex) => {
            if (!celula) {
              return (
                <div
                  key={`vazio-${semanaIndex}-${diaIndex}`}
                  className="aspect-square"
                />
              );
            }

            const sessao = getSessaoByData(celula.dataISO);
            const isHoje = celula.dataISO === hojeISO;
            const classeBase = `aspect-square flex flex-col items-center justify-center rounded-lg text-xs sm:text-sm ${
              isHoje ? "ring-2 ring-[#222222]" : ""
            }`;

            if (sessao) {
              return (
                <Link
                  key={celula.dataISO}
                  href={`/treinos/${sessao.treinoId}`}
                  className={`${classeBase} bg-[#ac1a1a] text-white transition-transform active:scale-95 hover:brightness-110`}
                >
                  <span className="font-medium">{celula.dia}</span>
                  <span className="text-sm font-bold sm:text-base">
                    {sessao.treinoId.toUpperCase()}
                  </span>
                </Link>
              );
            }

            return (
              <div
                key={celula.dataISO}
                className={`${classeBase} bg-[#F7F7F7] text-[#222222]/70`}
              >
                <span>{celula.dia}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
