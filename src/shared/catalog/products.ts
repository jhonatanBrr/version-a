import type { Category, CourseProduct, Product, ProductEdition, TestProduct } from "./types";

/**
 * Mock catalog. Every test and course is fictional (no real test names),
 * but the content follows how psychological assessment products are sold:
 * age ranges, administration time, qualification level, kits and refills.
 */

export const CATEGORIES: Category[] = [
  { id: "clinica", label: { it: "Clinica e Neuropsicologia", es: "Clínica y Neuropsicología" } },
  { id: "scuola", label: { it: "Scuola ed Età evolutiva", es: "Escuela y Edad evolutiva" } },
  { id: "lavoro", label: { it: "Lavoro e Organizzazioni", es: "Trabajo y Organizaciones" } },
  { id: "formazione", label: { it: "Formazione", es: "Formación" } },
];

type PricePair = [price: number, salePrice: number];

/** Standard editions for a test: full kit, refill pack and manual. */
function testEditions(kit: PricePair, refill: PricePair, manual: PricePair, refillLabel: TestRefill): ProductEdition[] {
  return [
    {
      id: "kit",
      label: { it: "Kit completo", es: "Kit completo" },
      detail: { it: "Manuale, materiali di somministrazione e griglie", es: "Manual, materiales de aplicación y plantillas" },
      price: kit[0],
      salePrice: kit[1],
    },
    {
      id: "refill",
      label: refillLabel,
      detail: { it: "Confezione di ricambio", es: "Paquete de reposición" },
      price: refill[0],
      salePrice: refill[1],
    },
    {
      id: "manual",
      label: { it: "Manuale", es: "Manual" },
      detail: { it: "Norme, procedure e casi clinici", es: "Normas, procedimientos y casos clínicos" },
      price: manual[0],
      salePrice: manual[1],
    },
  ];
}

type TestRefill = ProductEdition["label"];

function courseEdition(price: number, salePrice: number): ProductEdition[] {
  return [
    {
      id: "seat",
      label: { it: "Iscrizione", es: "Inscripción" },
      detail: { it: "Accesso al corso, materiali e attestato", es: "Acceso al curso, materiales y certificado" },
      price,
      salePrice,
    },
  ];
}

const QUESTIONNAIRES_25 = { it: "Questionari (25)", es: "Cuestionarios (25)" };
const PROTOCOLS_25 = { it: "Protocolli di notazione (25)", es: "Protocolos de registro (25)" };
const ONLINE_25 = { it: "25 somministrazioni online", es: "25 aplicaciones online" };

const tests: TestProduct[] = [
  {
    id: "p01",
    slug: "bva-2-batteria-valutazione-attentiva",
    name: "BVA-2 · Batteria di Valutazione Attentiva",
    kind: "test",
    category: "clinica",
    format: "cartaceo",
    people: ["M. Ferraris", "L. Conti"],
    summary: {
      it: "Valuta attenzione selettiva, sostenuta e divisa in bambini e adolescenti.",
      es: "Evalúa la atención selectiva, sostenida y dividida en niños y adolescentes.",
    },
    description: {
      it: "Batteria di prove carta-matita per l'assessment dei processi attentivi in età evolutiva. Utile nell'inquadramento di difficoltà di concentrazione a scuola e nel percorso diagnostico dei disturbi del neurosviluppo, con norme per fascia d'età e profilo grafico dei punteggi.",
      es: "Batería de pruebas de lápiz y papel para evaluar los procesos atencionales en la edad evolutiva. Útil para encuadrar dificultades de concentración escolar y en el proceso diagnóstico de los trastornos del neurodesarrollo, con normas por edad y perfil gráfico de puntuaciones.",
    },
    highlights: {
      it: ["Attenzione selettiva, sostenuta e divisa", "Norme italiane per fascia d'età", "Profilo grafico dei punteggi"],
      es: ["Atención selectiva, sostenida y dividida", "Normas italianas por edad", "Perfil gráfico de puntuaciones"],
    },
    image: { photoId: "1516534775068-ba3e7458af70", alt: { it: "Ragazza concentrata mentre lavora al computer", es: "Chica concentrada trabajando con el ordenador" } },
    price: 320,
    salePrice: 272,
    editions: testEditions([320, 272], [95, 80.75], [110, 93.5], PROTOCOLS_25),
    ageRange: { min: 6, max: 16 },
    durationMinutes: { min: 30, max: 40 },
    administration: "individual",
    qualification: "B",
    includes: {
      it: ["Manuale con dati normativi", "Fascicoli stimolo", "25 protocolli di notazione", "Griglie di correzione"],
      es: ["Manual con datos normativos", "Cuadernillos de estímulos", "25 protocolos de registro", "Plantillas de corrección"],
    },
  },
  {
    id: "p02",
    slug: "sca-2-screening-cognitivo-adulti",
    name: "SCA-2 · Scala di Screening Cognitivo per Adulti",
    kind: "test",
    category: "clinica",
    format: "digitale",
    people: ["R. Bianchi", "S. Greco"],
    summary: {
      it: "Screening breve di memoria, attenzione, linguaggio e funzioni esecutive negli adulti.",
      es: "Cribado breve de memoria, atención, lenguaje y funciones ejecutivas en adultos.",
    },
    description: {
      it: "In meno di 20 minuti offre un quadro sintetico delle principali funzioni cognitive e aiuta a decidere se approfondire con una valutazione neuropsicologica completa. La nuova edizione aggiorna i dati normativi e introduce la somministrazione digitale con report automatico.",
      es: "En menos de 20 minutos ofrece una visión sintética de las principales funciones cognitivas y ayuda a decidir si profundizar con una evaluación neuropsicológica completa. La nueva edición actualiza los datos normativos e introduce la aplicación digital con informe automático.",
    },
    highlights: {
      it: ["Memoria, attenzione, linguaggio e funzioni esecutive", "Report automatico", "Norme aggiornate 2026"],
      es: ["Memoria, atención, lenguaje y funciones ejecutivas", "Informe automático", "Normas actualizadas 2026"],
    },
    image: { photoId: "1559757148-5c350d0d3c56", alt: { it: "Modello anatomico di cervello umano", es: "Modelo anatómico de cerebro humano" } },
    price: 1250,
    salePrice: 1062.5,
    editions: testEditions([1250, 1062.5], [160, 136], [95, 80.75], ONLINE_25),
    ageRange: { min: 18, max: 90 },
    durationMinutes: { min: 15, max: 20 },
    administration: "individual",
    qualification: "B",
    includes: {
      it: ["Manuale con dati normativi italiani", "25 somministrazioni su piattaforma", "Report automatico del profilo"],
      es: ["Manual con datos normativos italianos", "25 aplicaciones en la plataforma", "Informe automático del perfil"],
    },
    isNew: true,
  },
  {
    id: "p03",
    slug: "pal-profilo-abilita-lettura",
    name: "PAL · Profilo delle Abilità di Lettura",
    kind: "test",
    category: "scuola",
    format: "cartaceo",
    people: ["C. Moretti"],
    summary: {
      it: "Rapidità e correttezza di lettura e comprensione del testo nella scuola primaria e secondaria.",
      es: "Velocidad y precisión lectora y comprensión de textos en primaria y secundaria.",
    },
    description: {
      it: "Prove di lettura di brano, parole e non-parole con compiti di comprensione. Supporta l'individuazione precoce delle difficoltà di apprendimento e il monitoraggio dei progressi durante l'anno scolastico.",
      es: "Pruebas de lectura de texto, palabras y pseudopalabras con tareas de comprensión. Apoya la detección temprana de dificultades de aprendizaje y el seguimiento de los progresos durante el curso escolar.",
    },
    highlights: {
      it: ["Brano, parole e non-parole", "Comprensione del testo", "Uso in classe e in ambulatorio"],
      es: ["Texto, palabras y pseudopalabras", "Comprensión lectora", "Uso en aula y en consulta"],
    },
    image: { photoId: "1588072432836-e10032774350", alt: { it: "Bambini che leggono e scrivono in classe", es: "Niños leyendo y escribiendo en clase" } },
    price: 185,
    salePrice: 157.25,
    editions: testEditions([185, 157.25], [60, 51], [70, 59.5], PROTOCOLS_25),
    ageRange: { min: 7, max: 14 },
    durationMinutes: { min: 20, max: 30 },
    administration: "individual-or-group",
    qualification: "A",
    includes: {
      it: ["Manuale", "Fascicoli di lettura", "25 protocolli", "Tabelle normative per classe"],
      es: ["Manual", "Cuadernillos de lectura", "25 protocolos", "Tablas normativas por curso"],
    },
  },
  {
    id: "p04",
    slug: "qeri-questionario-emotivo-relazionale-infanzia",
    name: "QERI · Questionario Emotivo-Relazionale per l'Infanzia",
    kind: "test",
    category: "scuola",
    format: "digitale",
    people: ["A. Rinaldi", "F. Gallo"],
    summary: {
      it: "Rileva benessere emotivo e competenze relazionali con versioni per genitori e insegnanti.",
      es: "Detecta bienestar emocional y competencias relacionales con versiones para padres y docentes.",
    },
    description: {
      it: "Questionario multi-informatore che descrive regolazione emotiva, relazioni con i pari e comportamenti prosociali. Le versioni per genitori e insegnanti permettono di confrontare i contesti di vita del bambino.",
      es: "Cuestionario multiinformante que describe la regulación emocional, las relaciones con los pares y las conductas prosociales. Las versiones para padres y docentes permiten comparar los contextos de vida del niño.",
    },
    highlights: {
      it: ["Versioni genitori e insegnanti", "Regolazione emotiva e relazioni", "Confronto tra informatori"],
      es: ["Versiones para padres y docentes", "Regulación emocional y relaciones", "Comparación entre informantes"],
    },
    image: { photoId: "1503676260728-1c00da094a0b", alt: { it: "Libri, matite colorate e cubi dell'alfabeto su un banco", es: "Libros, lápices de colores y cubos del alfabeto sobre un pupitre" } },
    price: 240,
    salePrice: 204,
    editions: testEditions([240, 204], [120, 102], [80, 68], ONLINE_25),
    ageRange: { min: 4, max: 11 },
    durationMinutes: { min: 10, max: 15 },
    administration: "individual",
    qualification: "B",
    includes: {
      it: ["Manuale", "25 somministrazioni online", "Report di confronto tra informatori"],
      es: ["Manual", "25 aplicaciones online", "Informe de comparación entre informantes"],
    },
  },
  {
    id: "p05",
    slug: "ict-inventario-competenze-trasversali",
    name: "ICT · Inventario delle Competenze Trasversali",
    kind: "test",
    category: "lavoro",
    format: "digitale",
    people: ["P. Lombardi"],
    summary: {
      it: "Misura le soft skill per selezione, sviluppo del personale e orientamento professionale.",
      es: "Mide las competencias transversales para selección, desarrollo de personas y orientación profesional.",
    },
    description: {
      it: "Inventario self-report su comunicazione, problem solving, gestione dello stress e lavoro in team. Il report restituisce punti di forza e aree di sviluppo, pronto per il colloquio di feedback.",
      es: "Inventario de autoinforme sobre comunicación, resolución de problemas, gestión del estrés y trabajo en equipo. El informe devuelve fortalezas y áreas de mejora, listo para la entrevista de feedback.",
    },
    highlights: {
      it: ["Comunicazione e problem solving", "Gestione dello stress", "Report pronto per il feedback"],
      es: ["Comunicación y resolución de problemas", "Gestión del estrés", "Informe listo para el feedback"],
    },
    image: { photoId: "1552664730-d307ca884978", alt: { it: "Team in riunione davanti a una lavagna con post-it", es: "Equipo reunido frente a una pizarra con notas adhesivas" } },
    price: 890,
    salePrice: 756.5,
    editions: testEditions([890, 756.5], [210, 178.5], [90, 76.5], ONLINE_25),
    ageRange: { min: 18 },
    durationMinutes: { min: 25, max: 35 },
    administration: "individual-or-group",
    qualification: "A",
    includes: {
      it: ["Manuale", "25 somministrazioni online", "Report individuale di sviluppo"],
      es: ["Manual", "25 aplicaciones online", "Informe individual de desarrollo"],
    },
  },
  {
    id: "p06",
    slug: "amt-assessment-motivazionale-team",
    name: "AMT · Assessment Motivazionale per Team",
    kind: "test",
    category: "lavoro",
    format: "cartaceo",
    people: ["E. Costa", "D. Villa"],
    summary: {
      it: "Analizza motivazione e clima nei gruppi di lavoro per orientare gli interventi organizzativi.",
      es: "Analiza la motivación y el clima en los equipos de trabajo para orientar las intervenciones organizacionales.",
    },
    description: {
      it: "Questionario di gruppo che esplora fattori motivazionali, senso di appartenenza e qualità della collaborazione. Pensato per psicologi del lavoro e consulenti HR che progettano percorsi di team building e benessere organizzativo.",
      es: "Cuestionario grupal que explora factores motivacionales, sentido de pertenencia y calidad de la colaboración. Pensado para psicólogos del trabajo y consultores de RR. HH. que diseñan programas de team building y bienestar organizacional.",
    },
    highlights: {
      it: ["Motivazione e clima di gruppo", "Somministrazione collettiva", "Indicazioni per l'intervento"],
      es: ["Motivación y clima grupal", "Aplicación colectiva", "Pautas para la intervención"],
    },
    image: { photoId: "1600880292203-757bb62b4baf", alt: { it: "Due colleghi si danno il cinque in ufficio", es: "Dos compañeros chocan las manos en la oficina" } },
    price: 410,
    salePrice: 348.5,
    editions: testEditions([410, 348.5], [130, 110.5], [85, 72.25], QUESTIONNAIRES_25),
    ageRange: { min: 18 },
    durationMinutes: { min: 20, max: 25 },
    administration: "group",
    qualification: "A",
    includes: {
      it: ["Manuale", "25 questionari", "Fogli di profilo di gruppo"],
      es: ["Manual", "25 cuestionarios", "Hojas de perfil grupal"],
    },
  },
  {
    id: "p07",
    slug: "sbl-scala-benessere-lavorativo",
    name: "SBL · Scala di Benessere Lavorativo",
    kind: "test",
    category: "lavoro",
    format: "digitale",
    people: ["G. Ricci", "M. Sala"],
    summary: {
      it: "Valuta stress lavoro-correlato, carico emotivo e risorse personali dei collaboratori.",
      es: "Evalúa el estrés laboral, la carga emocional y los recursos personales de los colaboradores.",
    },
    description: {
      it: "Scala breve per il monitoraggio del benessere psicologico in azienda: stress percepito, recupero, supporto sociale e rischio di burnout. Risultati aggregati e anonimi per la valutazione dei rischi psicosociali.",
      es: "Escala breve para monitorear el bienestar psicológico en la empresa: estrés percibido, recuperación, apoyo social y riesgo de burnout. Resultados agregados y anónimos para la evaluación de riesgos psicosociales.",
    },
    highlights: {
      it: ["Stress percepito e rischio burnout", "Report aggregati anonimi", "Somministrazione in 10 minuti"],
      es: ["Estrés percibido y riesgo de burnout", "Informes agregados anónimos", "Aplicación en 10 minutos"],
    },
    image: { photoId: "1531482615713-2afd69097998", alt: { it: "Colleghi che lavorano insieme al computer", es: "Compañeros trabajando juntos frente al ordenador" } },
    price: 290,
    salePrice: 246.5,
    editions: testEditions([290, 246.5], [140, 119], [70, 59.5], ONLINE_25),
    ageRange: { min: 18 },
    durationMinutes: { min: 8, max: 10 },
    administration: "individual-or-group",
    qualification: "A",
    includes: {
      it: ["Manuale", "25 somministrazioni online", "Report di gruppo anonimo"],
      es: ["Manual", "25 aplicaciones online", "Informe grupal anónimo"],
    },
  },
];

const courses: CourseProduct[] = [
  {
    id: "p08",
    slug: "corso-valutazione-neuropsicologica-eta-evolutiva",
    name: "Valutazione neuropsicologica in età evolutiva",
    kind: "course",
    category: "formazione",
    format: "corso-online",
    people: ["Dott.ssa Giulia Marchetti"],
    summary: {
      it: "Dalla scelta degli strumenti alla restituzione alla famiglia: un percorso pratico con casi reali.",
      es: "De la elección de los instrumentos a la devolución a la familia: un recorrido práctico con casos reales.",
    },
    description: {
      it: "Corso online in diretta con esercitazioni su protocolli anonimizzati. Si approfondiscono attenzione, memoria e funzioni esecutive nel bambino, l'integrazione dei risultati e la stesura della relazione clinica.",
      es: "Curso online en directo con ejercicios sobre protocolos anonimizados. Se profundiza en la atención, la memoria y las funciones ejecutivas en el niño, la integración de resultados y la redacción del informe clínico.",
    },
    highlights: {
      it: ["16 ore in diretta", "Casi clinici anonimizzati", "Attestato di partecipazione"],
      es: ["16 horas en directo", "Casos clínicos anonimizados", "Certificado de participación"],
    },
    image: { photoId: "1606761568499-6d2451b23c66", alt: { it: "Due professioniste seguono una lezione online al portatile", es: "Dos profesionales siguen una clase online en el portátil" } },
    price: 450,
    salePrice: 360,
    editions: courseEdition(450, 360),
    startDate: "2027-01-15",
    hours: 16,
    ecmCredits: 24,
  },
  {
    id: "p09",
    slug: "corso-somministrazione-scoring-test-personalita",
    name: "Somministrazione e scoring dei test di personalità",
    kind: "course",
    category: "formazione",
    format: "in-presenza",
    people: ["Dott. Luca Fontana"],
    summary: {
      it: "Due giornate in aula per padroneggiare somministrazione, correzione e interpretazione.",
      es: "Dos jornadas presenciales para dominar la aplicación, la corrección y la interpretación.",
    },
    description: {
      it: "Workshop in presenza con esercitazioni a coppie: setting, istruzioni standardizzate, errori frequenti di scoring e lettura integrata dei profili. Posti limitati per favorire la pratica guidata.",
      es: "Taller presencial con ejercicios en parejas: encuadre, instrucciones estandarizadas, errores frecuentes de corrección y lectura integrada de los perfiles. Plazas limitadas para favorecer la práctica guiada.",
    },
    highlights: {
      it: ["2 giornate a Milano", "Esercitazioni a coppie", "Posti limitati"],
      es: ["2 jornadas en Milán", "Ejercicios en parejas", "Plazas limitadas"],
    },
    image: { photoId: "1544717305-2782549b5136", alt: { it: "Aula per conferenze con schermo e sedute", es: "Aula de conferencias con pantalla y asientos" } },
    price: 620,
    salePrice: 527,
    editions: courseEdition(620, 527),
    startDate: "2027-02-06",
    hours: 14,
    ecmCredits: 18,
    location: "Milano",
  },
  {
    id: "p10",
    slug: "corso-psicodiagnostica-clinica-colloquio-report",
    name: "Psicodiagnostica clinica: dal colloquio al report",
    kind: "course",
    category: "formazione",
    format: "corso-online",
    people: ["Dott.ssa Elena Sartori"],
    summary: {
      it: "Integrare colloquio, test e osservazione in una relazione psicodiagnostica chiara ed etica.",
      es: "Integrar entrevista, tests y observación en un informe psicodiagnóstico claro y ético.",
    },
    description: {
      it: "Percorso online in moduli: conduzione del colloquio anamnestico, selezione della batteria, integrazione dei dati e restituzione al paziente. Include modelli di report e supervisione di gruppo finale.",
      es: "Recorrido online por módulos: conducción de la entrevista anamnésica, selección de la batería, integración de datos y devolución al paciente. Incluye modelos de informe y una supervisión grupal final.",
    },
    highlights: {
      it: ["32 ore in moduli", "Modelli di report", "Supervisione di gruppo"],
      es: ["32 horas por módulos", "Modelos de informe", "Supervisión grupal"],
    },
    image: { photoId: "1434030216411-0b793f4b4173", alt: { it: "Professionista che prende appunti a mano", es: "Profesional tomando notas a mano" } },
    price: 980,
    salePrice: 833,
    editions: courseEdition(980, 833),
    startDate: "2027-03-03",
    hours: 32,
    ecmCredits: 40,
  },
];

export const PRODUCTS: Product[] = [...tests, ...courses];
