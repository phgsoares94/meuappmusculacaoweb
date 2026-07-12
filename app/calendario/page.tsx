import type { Metadata } from "next";
import Header from "@/components/Header";
import Calendario from "@/components/Calendario";

export const metadata: Metadata = {
  title: "Calendário — Meus Treinos ABCD",
};

export default function CalendarioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <Header title="Calendário" subtitle="Julho de 2026" backHref="/" />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6">
        <Calendario ano={2026} mes={7} />
      </main>
    </div>
  );
}
