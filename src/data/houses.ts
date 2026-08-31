/*
 * Casas de la Legion Lunari: datos del quiz "Ascenso a Targon".
 * 4 casas (Febe, Rea, Dione, Jano) y 13 preguntas. Cada opción suma 1 punto a
 * una casa; gana la de mayor puntaje.
 */

export interface House {
  id: string;
  nombre: string;
  epiteto: string;
  lema: string;
  descripcion: string[]; // párrafos
  rasgos: string[];
  color: string; // variable de la paleta
  simbolo: string; // fase lunar / emoji
  campeonas: HouseChampion[];
}

export interface HouseChampion {
  nombre: string;
  titulo: string;
  imagen: string;
}

export const houses: House[] = [
  {
    id: "febe",
    nombre: "Casa Febe",
    epiteto: "Las Valientes",
    lema: "El coraje de quienes hacen historia.",
    rasgos: ["Valentía", "Tenacidad", "Iniciativa"],
    color: "#ff6a2e",
    simbolo: "🌕",
    campeonas: [
      {
        nombre: "Leona",
        titulo: "La Radiante Aurora",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg",
      },
      {
        nombre: "Riven",
        titulo: "La Desterrada",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Riven_0.jpg",
      },
      {
        nombre: "Shyvana",
        titulo: "La Hija del Dragón",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shyvana_0.jpg",
      },
    ],
    descripcion: [
      "Hija de Febe, en tu espíritu arde una llama indomable. Eres valiente, competitiva y desafiante, alguien que no conoce el significado de rendirse. Mientras otros se detienen ante el miedo, tú lo enfrentas. Esa fuerza interior te vuelve adaptable: no importa qué tan grande sea el reto, encuentras la manera de seguir adelante.",
      "Las hijas de Febe se caracterizan por su energía, su impulso hacia lo desconocido y su necesidad constante de probarse a sí mismas. Te entusiasma superar obstáculos, incluso aquellos que parecen imposibles, y tu tenacidad inspira a otros a salir de su zona de confort. Sin embargo, tu arrojo puede volverte impaciente o impulsiva, lanzándote de cabeza antes de analizar todas las consecuencias.",
      "Tu esencia es la del coraje. Eres quien da el primer paso en la batalla, quien levanta la voz cuando nadie más se atreve, quien defiende a sus aliadas aun cuando el precio sea alto. La luna te bendijo con la fuerza de quienes hacen historia: tu huella siempre queda marcada en los caminos que recorres.",
    ],
  },
  {
    id: "rea",
    nombre: "Casa Rea",
    epiteto: "Las Amables",
    lema: "Incluso en la noche más oscura, enciende la esperanza.",
    rasgos: ["Empatía", "Altruismo", "Lealtad"],
    color: "#f5b942",
    simbolo: "🌙",
    campeonas: [
      {
        nombre: "Soraka",
        titulo: "La Hija de las Estrellas",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Soraka_0.jpg",
      },
      {
        nombre: "Lux",
        titulo: "La Dama Luminosa",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
      },
      {
        nombre: "Taliyah",
        titulo: "La Tejedora de Piedra",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taliyah_0.jpg",
      },
    ],
    descripcion: [
      "Hija de Rea, tu corazón es tu fuerza y tu brújula. Eres empática, altruista y protectora; sientes profundamente el dolor de los demás y tu instinto natural es dar refugio, apoyo y calma. Prefieres trabajar en equipo antes que en solitario, y casi siempre pones las necesidades de otros por encima de las tuyas.",
      "Las hijas de Rea son pacíficas, confiables y compasivas, capaces de sostener vínculos que otros habrían dejado atrás. Eres perseverante, cuidadosa y atenta a los pequeños detalles que hacen sentir a los demás queridos y acompañados. Tu bondad no significa debilidad: tu entrega es tan fuerte que, cuando se trata de proteger a quienes amas, puedes resistir tormentas enteras.",
      "A veces puedes sacrificarte más de lo necesario o quedar atrapada en los problemas de otros, pero tu verdadera virtud es que, incluso en la noche más oscura, logras encender un rastro de esperanza. Eres un faro de confianza y amor, alguien a quien se recurre en busca de consuelo y compañía verdadera.",
    ],
  },
  {
    id: "dione",
    nombre: "Casa Dione",
    epiteto: "Las Inteligentes",
    lema: "Nunca camina a ciegas: ya pensó todos los caminos.",
    rasgos: ["Análisis", "Estrategia", "Lógica"],
    color: "#4fc8f0",
    simbolo: "🌑",
    campeonas: [
      {
        nombre: "Caitlyn",
        titulo: "La Sheriff de Piltover",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_0.jpg",
      },
      {
        nombre: "Camille",
        titulo: "La Sombra de Acero",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Camille_0.jpg",
      },
      {
        nombre: "LeBlanc",
        titulo: "La Maquiavélica",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leblanc_0.jpg",
      },
    ],
    descripcion: [
      "Hija de Dione, tu esencia es la de quien nunca deja de cuestionar. Eres observadora, analítica y calculadora; rara vez te dejas llevar solo por las emociones, prefieres entender los hechos, los patrones y la lógica detrás de todo. Te caracteriza una ambición tranquila: no buscas brillar por vanidad, sino por la necesidad de comprender y crecer.",
      "Tu fortaleza está en tu mente aguda y en tu capacidad de ver soluciones donde otros solo ven problemas. Eres detallista, paciente y racional, pero también exigente contigo misma y con quienes te rodean. Puedes parecer distante, pues tu sabiduría es fría como la luz lunar, pero en realidad tu forma de cuidar es guiar y advertir, evitando que los demás tropiecen donde tú ya has visto el peligro.",
      "Las hijas de Dione suelen ser estrategas, líderes naturales en la toma de decisiones difíciles, personas que nunca caminan a ciegas porque antes ya han pensado todos los caminos posibles. A veces se les acusa de duras, pero esa dureza es el escudo que protege a quienes aún no saben mirar más allá.",
    ],
  },
  {
    id: "jano",
    nombre: "Casa Jano",
    epiteto: "Las Creativas",
    lema: "Sueña futuros donde nadie más los ve.",
    rasgos: ["Imaginación", "Originalidad", "Ingenio"],
    color: "#9b7cf0",
    simbolo: "🌗",
    campeonas: [
      {
        nombre: "Seraphine",
        titulo: "La Cantante Soñadora",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Seraphine_0.jpg",
      },
      {
        nombre: "Neeko",
        titulo: "La Camaleón Curiosa",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Neeko_0.jpg",
      },
      {
        nombre: "Gwen",
        titulo: "La Costurera Sagrada",
        imagen:
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
      },
    ],
    descripcion: [
      "Hija de Jano, tu don es la imaginación. Eres soñadora, idealista y apasionada, capaz de ver posibilidades donde otros solo ven límites. No te basta con lo que existe: necesitas inventar, transformar y dar vida a nuevas ideas. Vives con un pie en la realidad y otro en el mundo de los sueños, y de esa dualidad nace tu magia.",
      "Las hijas de Jano son compañeras alegres y carismáticas, siempre buscando aportar belleza, ingenio y originalidad. Te entusiasma crear, ya sea en palabras, gestos o proyectos, y tu creatividad inspira a los demás a atreverse a imaginar más allá de lo cotidiano. Tu energía suele ser contagiosa: donde tú estás, el ambiente se siente más ligero, divertido y lleno de posibilidades.",
      "A veces puedes perderte en tus propias ideas o dejar proyectos a medias, pues tu mente ya está ocupada soñando el siguiente. Sin embargo, tu verdadero poder está en tu capacidad de ver futuros donde nadie más los percibe. Tu visión interior es una chispa que alumbra no solo tu camino, sino el de quienes se dejan guiar por tu luz.",
    ],
  },
];

export type HouseId = (typeof houses)[number]["id"];

export interface QuizOption {
  texto: string;
  puntos: Partial<Record<HouseId, number>>;
}

export interface QuizQuestion {
  pregunta: string;
  opciones: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    pregunta: "Lo que más valoras en una persona es:",
    opciones: [
      { texto: "Cómo no huye de los problemas.", puntos: { febe: 1 } },
      { texto: "La madurez para resolver problemas.", puntos: { dione: 1 } },
      {
        texto: "Cómo siempre tiene una respuesta ocurrente.",
        puntos: { jano: 1 },
      },
      { texto: "La empatía con la que aborda un tema.", puntos: { rea: 1 } },
    ],
  },
  {
    pregunta: "Cuando alguien se rinde fácilmente, tú:",
    opciones: [
      { texto: "Le propones un enfoque diferente.", puntos: { jano: 1 } },
      { texto: "Le das palabras de ánimo.", puntos: { rea: 1 } },
      { texto: "La dejo rendirse.", puntos: { dione: 1 } },
      {
        texto: "Le muestras la manera de cómo continuar.",
        puntos: { febe: 1 },
      },
    ],
  },
  {
    pregunta: "Si fueras un objeto de LoL, serías:",
    opciones: [
      { texto: "Reloj de Zhonya.", puntos: { dione: 1 } },
      { texto: "Robaalmas de Mejai.", puntos: { febe: 1 } },
      { texto: "Redención.", puntos: { rea: 1 } },
      { texto: "Diente de Nashor.", puntos: { jano: 1 } },
    ],
  },
  {
    pregunta: "El error que más detestas en una partida es:",
    opciones: [
      { texto: "No usar visión.", puntos: { dione: 1 } },
      { texto: "No iniciar una jugada.", puntos: { jano: 1 } },
      { texto: "Las personas egoístas.", puntos: { rea: 1 } },
      { texto: "Tener miedo de una teamfight.", puntos: { febe: 1 } },
    ],
  },
  {
    pregunta: "Cuando alguien empieza a flamear, tú respondes:",
    opciones: [
      { texto: "Mute a todos.", puntos: { dione: 1 } },
      { texto: "Lo molesto más.", puntos: { jano: 1 } },
      { texto: "No respondo.", puntos: { rea: 1 } },
      { texto: 'Con un "cállate y juega".', puntos: { febe: 1 } },
    ],
  },
  {
    pregunta: "¿Qué estación del año te gusta más?",
    opciones: [
      { texto: "Invierno.", puntos: { dione: 1 } },
      { texto: "Primavera.", puntos: { rea: 1 } },
      { texto: "Verano.", puntos: { febe: 1 } },
      { texto: "Otoño.", puntos: { jano: 1 } },
    ],
  },
  {
    pregunta: "Cuando sueñas al dormir, la mayoría de tus sueños son:",
    opciones: [
      { texto: "Con situaciones intensas.", puntos: { febe: 1 } },
      { texto: "Con cosas que parecen reales.", puntos: { dione: 1 } },
      { texto: "Con mundos extraños.", puntos: { jano: 1 } },
      { texto: "Con personas del pasado.", puntos: { rea: 1 } },
    ],
  },
  {
    pregunta: "¿Qué te atrae más de la luna?",
    opciones: [
      { texto: "Su presencia enorme en el cielo.", puntos: { febe: 1 } },
      { texto: "Siempre verla brillar.", puntos: { dione: 1 } },
      { texto: "Sus fases cambiantes.", puntos: { jano: 1 } },
      { texto: "Su luz suave.", puntos: { rea: 1 } },
    ],
  },
  {
    pregunta: "Si fueras un material, serías:",
    opciones: [
      { texto: "Cristal.", puntos: { dione: 1 } },
      { texto: "Humo.", puntos: { jano: 1 } },
      { texto: "Agua.", puntos: { rea: 1 } },
      { texto: "Hierro.", puntos: { febe: 1 } },
    ],
  },
  {
    pregunta: "Si fueras parte de una constelación, serías:",
    opciones: [
      { texto: "El trazo que parece moverse.", puntos: { jano: 1 } },
      { texto: "El punto que conecta.", puntos: { rea: 1 } },
      { texto: "La estrella más brillante.", puntos: { febe: 1 } },
      { texto: "La estrella que marca el inicio.", puntos: { dione: 1 } },
    ],
  },
  {
    pregunta: "En un ritual Lunari, ¿cuál sería tu papel?",
    opciones: [
      { texto: "Trazar los símbolos en el suelo.", puntos: { dione: 1 } },
      { texto: "Cantar los himnos sagrados.", puntos: { jano: 1 } },
      { texto: "Encender las antorchas del templo.", puntos: { febe: 1 } },
      { texto: "Recibir a las sacerdotisas con respeto.", puntos: { rea: 1 } },
    ],
  },
  {
    pregunta: "¿Qué reliquia te elegiría la luna?",
    opciones: [
      { texto: "Una piedra con símbolos ocultos.", puntos: { dione: 1 } },
      { texto: "Un espejo de plata cambiante.", puntos: { jano: 1 } },
      { texto: "Un cáliz lleno de agua pura.", puntos: { rea: 1 } },
      { texto: "Un escudo con brillo lunar.", puntos: { febe: 1 } },
    ],
  },
  {
    pregunta:
      "Si caminaras por un bosque bajo la luna, ¿qué guiaría tus pasos?",
    opciones: [
      { texto: "El eco de tus emociones.", puntos: { rea: 1 } },
      { texto: "Las estrellas.", puntos: { dione: 1 } },
      { texto: "Lo alto de los árboles.", puntos: { jano: 1 } },
      { texto: "Tu instinto.", puntos: { febe: 1 } },
    ],
  },
];
