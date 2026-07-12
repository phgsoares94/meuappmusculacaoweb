import { slugify } from "./utils";

export type TipoExercicio = "forca" | "normal" | "finalizador";

export interface RegistroCarga {
  data: string; // ISO YYYY-MM-DD
  cargaKg: number;
}

export interface Exercicio {
  id: string;
  nome: string;
  series: number;
  repeticoes: string;
  tipo: TipoExercicio;
  dicas: string[];
  historico: RegistroCarga[];
}

export interface Treino {
  id: string;
  nome: string;
  grupoMuscular: string;
  diaSemana: string;
  diaAbrev: string;
  exercicios: Exercicio[];
}

interface ExercicioInput {
  nome: string;
  series: number;
  repeticoes: string;
  tipo?: TipoExercicio;
  dicas: string[];
  historico?: RegistroCarga[];
}

function criarExercicio(treinoId: string, input: ExercicioInput): Exercicio {
  return {
    id: `${treinoId}-${slugify(input.nome)}`,
    nome: input.nome,
    series: input.series,
    repeticoes: input.repeticoes,
    tipo: input.tipo ?? "normal",
    dicas: input.dicas,
    historico: input.historico ?? [],
  };
}

function criarTreino(
  id: string,
  nome: string,
  grupoMuscular: string,
  diaSemana: string,
  diaAbrev: string,
  exerciciosInput: ExercicioInput[]
): Treino {
  return {
    id,
    nome,
    grupoMuscular,
    diaSemana,
    diaAbrev,
    exercicios: exerciciosInput.map((input) => criarExercicio(id, input)),
  };
}

export const treinos: Treino[] = [
  criarTreino("a", "Treino A", "Peito, Tríceps, Anterior", "Segunda-feira", "2ª", [
    {
      nome: "Supino Reto",
      series: 4,
      repeticoes: "6-8",
      tipo: "forca",
      dicas: [
        "Mantenha os pés firmes no chão e a lombar levemente arqueada.",
        "Desça a barra até tocar levemente o peito, na altura dos mamilos.",
        "Cotovelos a cerca de 45° do tronco, evite abrir a 90°, para proteger o ombro.",
        "Não tire o quadril do banco durante a execução.",
        "Controle a descida (2-3s) e empurre com força na subida.",
        "Use um parceiro de apoio (spotter) em cargas próximas ao máximo.",
      ],
      historico: [
        { data: "2026-07-06", cargaKg: 15 },
        { data: "2026-07-06", cargaKg: 10 },
      ],
    },
    {
      nome: "Supino Inclinado",
      series: 3,
      repeticoes: "8-10",
      dicas: [
        "Ajuste o banco entre 30° e 45° para focar a porção superior do peitoral.",
        "A barra desce até a parte superior do peito, próximo à clavícula.",
        "Evite inclinação excessiva do banco, que transfere carga para o ombro.",
        "Mantenha as escápulas retraídas durante todo o movimento.",
        "Não trave os cotovelos com força no topo do movimento.",
      ],
      historico: [{ data: "2026-07-06", cargaKg: 10 }],
    },
    {
      nome: "Crucifixo",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Mantenha uma leve flexão nos cotovelos durante todo o movimento.",
        "Abra os braços em arco, sentindo o alongamento no peitoral.",
        "Não desça demais os halteres, para não sobrecarregar o ombro.",
        "Contraia o peito ao juntar os halteres no topo.",
        "Use carga moderada — esse exercício prioriza a conexão mente-músculo.",
      ],
    },
    {
      nome: "Tríceps Francês",
      series: 3,
      repeticoes: "8-10",
      dicas: [
        "Mantenha os cotovelos fixos e próximos à cabeça durante o movimento.",
        "Desça a barra ou halter atrás da cabeça de forma controlada.",
        "Evite abrir os cotovelos para os lados.",
        "Estenda completamente os braços sem travar bruscamente.",
        "Pode ser feito sentado ou em pé, mantendo o tronco estável.",
      ],
      historico: [{ data: "2026-07-06", cargaKg: 14 }],
    },
    {
      nome: "Tríceps Corda",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Mantenha os cotovelos colados ao corpo durante toda a execução.",
        "Abra a corda no final do movimento para maior contração.",
        "Não deixe o tronco balançar para ajudar no movimento.",
        "Controle a fase de volta (excêntrica) do movimento.",
        "Mantenha os ombros para trás e o peito aberto.",
      ],
    },
    {
      nome: "Elevação Frontal",
      series: 2,
      repeticoes: "12-15",
      tipo: "finalizador",
      dicas: [
        "Eleve os braços até a altura dos ombros, sem ultrapassar.",
        "Evite usar impulso do corpo (balanço) para levantar o peso.",
        "Pode ser feito com halteres, barra ou anilha, alternando os braços.",
        "Mantenha uma leve flexão nos cotovelos.",
        "Controle a descida do peso, não deixe cair.",
      ],
      historico: [{ data: "2026-07-06", cargaKg: 8 }],
    },
  ]),
  criarTreino("b", "Treino B", "Costas, Bíceps", "Terça-feira", "3ª", [
    {
      nome: "Puxada na Frente",
      series: 4,
      repeticoes: "6-8",
      tipo: "forca",
      dicas: [
        "Puxe a barra até a altura do queixo/peito superior, sem jogar o tronco para trás.",
        "Foque em levar os cotovelos para baixo, não em puxar apenas com os braços.",
        "Mantenha o peito aberto e as escápulas em movimento.",
        "Evite balançar o corpo para gerar impulso.",
        "Controle a fase de subida da barra (excêntrica).",
      ],
      historico: [
        { data: "2026-07-09", cargaKg: 52 },
        { data: "2026-07-09", cargaKg: 45 },
      ],
    },
    {
      nome: "Remada Baixa",
      series: 3,
      repeticoes: "8-10",
      dicas: [
        "Mantenha a coluna neutra, sem arredondar as costas.",
        "Puxe o cabo em direção ao abdômen, levando os cotovelos para trás.",
        "Evite usar o balanço do tronco para puxar o peso.",
        "Aperte as escápulas no final do movimento.",
        "Mantenha os ombros longe das orelhas.",
      ],
      historico: [{ data: "2026-07-09", cargaKg: 32 }],
    },
    {
      nome: "Pulldown Cross Over",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Posicione-se de frente para o cabo, com a barra em cruz.",
        "Puxe os cabos para baixo e para trás, levando os cotovelos para baixo.",
        "Mantenha o tronco estável, sem balançar.",
        "Contraia as costas e o peito no final do movimento.",
        "Controle a volta dos cabos até o alongamento completo.",
      ],
    },
    {
      nome: "Rosca Inversa",
      series: 3,
      repeticoes: "8-10",
      dicas: [
        "Use pegada pronada (palmas voltadas para baixo).",
        "Mantenha os cotovelos fixos ao lado do corpo.",
        "Foque no antebraço e bíceps, sem balançar o tronco.",
        "Não é necessário usar cargas altas — priorize a técnica.",
        "Suba e desça o peso de forma controlada.",
      ],
      historico: [{ data: "2026-07-09", cargaKg: 14 }],
    },
    {
      nome: "Rosca Scott",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Apoie bem os braços no banco Scott, sem levantar os cotovelos.",
        "Não estenda o cotovelo de forma brusca no fim do movimento.",
        "Controle a descida para evitar lesões no cotovelo.",
        "Contraia o bíceps no topo do movimento.",
        "Evite usar impulso do ombro para completar a repetição.",
      ],
      historico: [{ data: "2026-07-09", cargaKg: 8 }],
    },
    {
      nome: "Encolhimento",
      series: 2,
      repeticoes: "12-15",
      dicas: [
        "Eleve os ombros em direção às orelhas, sem rodar.",
        "Segure a contração no topo por 1-2 segundos.",
        "Evite usar os braços para ajudar no movimento.",
        "Controle a descida do peso.",
        "Mantenha os braços estendidos e relaxados durante o movimento.",
      ],
    },
  ]),
  criarTreino("c", "Treino C", "Ombros", "Quinta-feira", "5ª", [
    {
      nome: "Desenvolvimento Militar",
      series: 4,
      repeticoes: "6-8",
      tipo: "forca",
      dicas: [
        "Mantenha o abdômen contraído para proteger a lombar.",
        "Empurre a barra ou halteres em linha reta acima da cabeça.",
        "Evite arquear excessivamente as costas.",
        "Desça até a altura dos ombros, de forma controlada.",
        "Não trave os cotovelos com força no topo.",
      ],
    },
    {
      nome: "Desenvolvimento com Halteres",
      series: 3,
      repeticoes: "8-10",
      dicas: [
        "Mantenha os punhos alinhados com os cotovelos.",
        "Não desça demais os halteres para não sobrecarregar o ombro.",
        "Empurre os halteres para cima sem bater um no outro.",
        "Mantenha o tronco estável, sem balançar.",
        "Controle a fase de descida do movimento.",
      ],
    },
    {
      nome: "Elevação Lateral",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Eleve os braços lateralmente até a altura dos ombros.",
        "Mantenha uma leve flexão nos cotovelos durante o movimento.",
        "Evite usar impulso do tronco (balanço).",
        "Controle a descida do peso, não deixe cair.",
        "Use cargas moderadas para manter a técnica correta.",
      ],
    },
    {
      nome: "Elevação Frontal",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Eleve os braços até a altura dos ombros, sem ultrapassar.",
        "Evite usar impulso do corpo (balanço) para levantar o peso.",
        "Pode ser feito com halteres, barra ou anilha, alternando os braços.",
        "Mantenha uma leve flexão nos cotovelos.",
        "Controle a descida do peso, não deixe cair.",
      ],
    },
    {
      nome: "Encolhimento",
      series: 2,
      repeticoes: "12-15",
      tipo: "finalizador",
      dicas: [
        "Eleve os ombros em direção às orelhas, sem rodar.",
        "Segure a contração no topo por 1-2 segundos.",
        "Evite usar os braços para ajudar no movimento.",
        "Controle a descida do peso.",
        "Mantenha os braços estendidos e relaxados durante o movimento.",
      ],
    },
  ]),
  criarTreino("d", "Treino D", "Pernas", "Sexta-feira", "6ª", [
    {
      nome: "Agachamento Livre",
      series: 4,
      repeticoes: "6-8",
      tipo: "forca",
      dicas: [
        "Mantenha os pés na largura dos ombros, levemente apontados para fora.",
        "Desça controladamente, levando o quadril para trás como se fosse sentar.",
        "Mantenha o peito erguido e a coluna neutra.",
        "Joelhos alinhados com a ponta dos pés, sem colapsar para dentro.",
        "Desça até pelo menos a paralela, se a mobilidade permitir.",
        "Use um cinto de levantamento em cargas altas.",
      ],
    },
    {
      nome: "Leg Press",
      series: 3,
      repeticoes: "8-10",
      dicas: [
        "Posicione os pés na largura dos ombros na plataforma.",
        "Não trave os joelhos completamente no topo do movimento.",
        "Desça até formar um ângulo de 90° nos joelhos.",
        "Mantenha a lombar apoiada no banco durante todo o movimento.",
        "Evite levantar o quadril do assento.",
      ],
    },
    {
      nome: "Extensora",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Ajuste o encosto para alinhar o joelho ao eixo do aparelho.",
        "Estenda as pernas sem jogar o tronco para trás.",
        "Controle a descida do peso.",
        "Evite travar o joelho com força no topo.",
        "Use cargas moderadas para não sobrecarregar a articulação.",
      ],
    },
    {
      nome: "Leg Curl",
      series: 3,
      repeticoes: "10-12",
      dicas: [
        "Ajuste o aparelho para alinhar o joelho ao eixo de rotação.",
        "Flexione as pernas de forma controlada, sem impulso.",
        "Contraia o posterior de coxa no topo do movimento.",
        "Evite levantar o quadril do banco.",
        "Controle a fase de retorno do peso.",
      ],
    },
    {
      nome: "Leg Press Fechado",
      series: 3,
      repeticoes: "15-20",
      dicas: [
        "Aproxime os pés na plataforma para focar mais no quadríceps.",
        "Mantenha a lombar apoiada durante toda a execução.",
        "Desça controladamente sem tirar o quadril do banco.",
        "Não trave os joelhos no topo do movimento.",
        "Use amplitude completa dentro do seu limite de mobilidade.",
      ],
    },
    {
      nome: "Panturrilha na Máquina",
      series: 2,
      repeticoes: "15-20",
      dicas: [
        "Desça o calcanhar o máximo possível para alongar a panturrilha.",
        "Suba na ponta dos pés, contraindo bem no topo.",
        "Controle o movimento, evite usar impulso.",
        "Mantenha os joelhos levemente flexionados ou travados conforme o aparelho.",
        "Faça repetições completas, sem cortar a amplitude.",
      ],
    },
  ]),
];

export interface SessaoTreino {
  data: string; // ISO YYYY-MM-DD
  treinoId: string;
}

export const sessoes: SessaoTreino[] = [
  { data: "2026-07-06", treinoId: "a" },
  { data: "2026-07-09", treinoId: "b" },
];

export function getSessaoByData(data: string): SessaoTreino | undefined {
  return sessoes.find((sessao) => sessao.data === data);
}

export function getTreinoById(id: string): Treino | undefined {
  return treinos.find((treino) => treino.id === id);
}

export function getExercicioById(
  id: string
): { exercicio: Exercicio; treino: Treino } | undefined {
  for (const treino of treinos) {
    const exercicio = treino.exercicios.find((item) => item.id === id);
    if (exercicio) {
      return { exercicio, treino };
    }
  }
  return undefined;
}