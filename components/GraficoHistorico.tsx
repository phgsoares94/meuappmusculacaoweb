"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RegistroCarga } from "@/lib/data";

interface GraficoHistoricoProps {
  historico: RegistroCarga[];
}

interface PontoGrafico {
  indice: number;
  dataLabel: string;
  dataISO: string;
  cargaKg: number;
}

function formatarDataCurta(dataISO: string): string {
  const [, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}`;
}

function formatarDataLonga(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function GraficoHistorico({
  historico,
}: GraficoHistoricoProps) {
  if (historico.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-[#222222]/10 bg-white p-5 text-sm text-[#222222]/60 shadow-sm">
        Sem registros ainda
      </div>
    );
  }

  const dados: PontoGrafico[] = historico.map((registro, index) => ({
    indice: index,
    dataLabel: formatarDataCurta(registro.data),
    dataISO: registro.data,
    cargaKg: registro.cargaKg,
  }));

  return (
    <div className="mt-6 rounded-2xl border border-[#222222]/10 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-[#222222]">
        Histórico de Carga
      </h2>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dados}
            margin={{ top: 8, right: 16, left: -12, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#22222220" />
            <XAxis
              dataKey="indice"
              type="number"
              domain={[0, dados.length - 1]}
              ticks={dados.map((ponto) => ponto.indice)}
              tickFormatter={(valor: number) =>
                dados[valor]?.dataLabel ?? ""
              }
              tick={{ fontSize: 12, fill: "#222222" }}
              stroke="#22222240"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#222222" }}
              stroke="#22222240"
              unit="kg"
              width={48}
            />
            <Tooltip
              formatter={(valor) => [`${valor} kg`, "Carga"]}
              labelFormatter={(valor) =>
                formatarDataLonga(dados[Number(valor)]?.dataISO ?? "")
              }
              contentStyle={{ borderRadius: 12, borderColor: "#22222220" }}
            />
            <Line
              type="monotone"
              dataKey="cargaKg"
              stroke="#ac1a1a"
              strokeWidth={2}
              dot={{ r: 4, fill: "#ac1a1a" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
