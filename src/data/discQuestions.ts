export interface DiscOption {
  text: string;
  type: 'D' | 'I' | 'S' | 'C';
}

export interface DiscQuestion {
  id: number;
  question: string;
  options: DiscOption[];
}

export const discQuestions: DiscQuestion[] = [
  {
    id: 1,
    question: "Cuando te enfrentas a un problema difcil, tu primera reaccin es:",
    options: [
      { text: "Tomar el mando y resolverlo rǭpidamente sin dudar.", type: "D" },
      { text: "Hablar con otros para encontrar una solucin creativa.", type: "I" },
      { text: "Mantener la calma y seguir los pasos establecidos para no alterar el orden.", type: "S" },
      { text: "Analizar todos los datos minuciosamente antes de actuar.", type: "C" }
    ]
  },
  {
    id: 2,
    question: "En una reunin de equipo, lo que mǭs disfrutas es:",
    options: [
      { text: "Establecer metas claras y delegar responsabilidades.", type: "D" },
      { text: "Inspirar a los demǭs y compartir ideas emocionantes.", type: "I" },
      { text: "Escuchar a todos y asegurar que el ambiente sea armonioso.", type: "S" },
      { text: "Revisar los informes, verificar la exactitud y el cumplimiento de procesos.", type: "C" }
    ]
  },
  {
    id: 3,
    question: "Lo que mǭs te motiva en el trabajo es:",
    options: [
      { text: "Ganar, tener autoridad y superar retos constantes.", type: "D" },
      { text: "El reconocimiento social, la popularidad y el entusiasmo.", type: "I" },
      { text: "La estabilidad, la lealtad y el sentido de pertenencia.", type: "S" },
      { text: "La precisin, la calidad y hacer las cosas correctamente.", type: "C" }
    ]
  },
  {
    id: 4,
    question: "Si alguien te interrumpe mientras estǭs concentrado, sueles:",
    options: [
      { text: "Ser directo y decir que estǭs ocupado.", type: "D" },
      { text: "Aprovechar para platicar un momento y distraerte.", type: "I" },
      { text: "Atenderlo con amabilidad, aunque te desvíe de tus tareas.", type: "S" },
      { text: "Sentirte molesto porque rompe tu esquema de trabajo meticuloso.", type: "C" }
    ]
  },
  {
    id: 5,
    question: "Tu mayor fortaleza es probablemente:",
    options: [
      { text: "Tu determinacin y enfoque en resultados.", type: "D" },
      { text: "Tu capacidad de persuasión y optimismo.", type: "I" },
      { text: "Tu paciencia y espritu de colaboracin.", type: "S" },
      { text: "Tu atencin al detalle y pensamiento lgico.", type: "C" }
    ]
  },
  {
    id: 6,
    question: "Al tomar una decisin importante, confas mǭs en:",
    options: [
      { text: "Tu instinto y la necesidad de actuar ya.", type: "D" },
      { text: "Cmo afectarǭ a la motivacin del grupo.", type: "I" },
      { text: "La experiencia previa y el consenso del equipo.", type: "S" },
      { text: "Los hechos comprobables y las evidencias fras.", type: "C" }
    ]
  },
  {
    id: 7,
    question: "Cuando alguien no estǭ de acuerdo contigo, tǧ:",
    options: [
      { text: "Argumentas con fuerza para demostrar tu punto de vista.", type: "D" },
      { text: "Intentas convencerlos con entusiasmo y carisma.", type: "I" },
      { text: "Cedes para evitar un conflicto innecesario.", type: "S" },
      { text: "Buscas pruebas lgicas para sustentar tu postura.", type: "C" }
    ]
  },
  {
    id: 8,
    question: "Prefieres trabajar en un entorno que sea:",
    options: [
      { text: "Competitivo y con metas de alto impacto.", type: "D" },
      { text: "Social, divertido y lleno de interaccin.", type: "I" },
      { text: "Predecible, seguro y sin cambios bruscos.", type: "S" },
      { text: "Estructurado, formal y orientado a la calidad.", type: "C" }
    ]
  },
  {
    id: 9,
    question: "Tu estilo de comunicacin es mǭs bien:",
    options: [
      { text: "Rǭpido, directo y al punto.", type: "D" },
      { text: "Animoso, gestual y anecdtico.", type: "I" },
      { text: "Suave, pausado y atento.", type: "S" },
      { text: "Preciso, formal y basado en datos.", type: "C" }
    ]
  },
  {
    id: 10,
    question: "Lo que mǭs te irrita de los demǭs es:",
    options: [
      { text: "La indecisin y la lentitud.", type: "D" },
      { text: "El pesimismo y la falta de entusiasmo.", type: "I" },
      { text: "La agresividad y la falta de consideracin.", type: "S" },
      { text: "La falta de rigor y los errores descuidados.", type: "C" }
    ]
  },
  {
    id: 11,
    question: "En un proyecto nuevo, prefieres estar a cargo de:",
    options: [
      { text: "La ejecucin y el cumplimiento de los plazos.", type: "D" },
      { text: "La promocin y la venta de la idea.", type: "I" },
      { text: "El soporte al equipo y la coordinacin interna.", type: "S" },
      { text: "La planificacin tǸcnica y el control de calidad.", type: "C" }
    ]
  },
  {
    id: 12,
    question: "Cuando estǭs bajo presin, sueles:",
    options: [
      { text: "Volverte mǭs exigente y autoritario.", type: "D" },
      { text: "Hablar mǭs de lo normal o tratar de bromear.", type: "I" },
      { text: "Hacerte mǭs reservado y evitar el choque.", type: "S" },
      { text: "Encerrarte en los detalles para evitar errores.", type: "C" }
    ]
  },
  {
    id: 13,
    question: "Tu objetivo principal en una conversacin es:",
    options: [
      { text: "Llegar a una conclusin o accin clara.", type: "D" },
      { text: "Hacer que la otra persona se sienta bien y conectada contigo.", type: "I" },
      { text: "Lograr seguridad, armona y ser apreciado genuinamente por el equipo.", type: "S" },
      { text: "Ser reconocido como un experto absoluto en tu ǭrea.", type: "C" }
    ]
  },
  {
    id: 14,
    question: "Cuando explicas un concepto nuevo a alguien, sueles:",
    options: [
      { text: "Dar solo el resumen ejecutivo y lo que necesitan hacer.", type: "D" },
      { text: "Usar historias, anǸcdotas y un tono muy dinǭmico.", type: "I" },
      { text: "Explicarlo con paciencia, paso a paso, comprobando si entienden.", type: "S" },
      { text: "Proporcionar todos los detalles tǸcnicos, grǭficos y documentacin.", type: "C" }
    ]
  },
  {
    id: 15,
    question: "Tu mayor miedo en el entorno laboral es:",
    options: [
      { text: "Perder el control o ser visto como vulnerable.", type: "D" },
      { text: "El rechazo social o perder influencia sobre los demǭs.", type: "I" },
      { text: "La pǸrdida de seguridad o enfrentarse a cambios sǧbitos.", type: "S" },
      { text: "Que se critique tu trabajo o equivocarte pǧblicamente.", type: "C" }
    ]
  },
  {
    id: 16,
    question: "Al recibir retroalimentacin (feedback) crtica:",
    options: [
      { text: "Te pones a la defensiva o la usas como un resto para mejorar rǭpidamente.", type: "D" },
      { text: "Lo tomas muy a pecho personal y buscas reafirmacin inmediata.", type: "I" },
      { text: "Lo aceptas calladamente pero puede que te sientas herido en silencio.", type: "S" },
      { text: "Pides ejemplos concretos, datos y analizas si la crtica es lgicamente vǭlida.", type: "C" }
    ]
  },
  {
    id: 17,
    question: "En situaciones de crisis, tǧ aporta:",
    options: [
      { text: "Direccin clara y accin inmediata.", type: "D" },
      { text: "Optimismo y capacidad para aliviar la tensin.", type: "I" },
      { text: "Calma, estabilidad y apoyo emocional.", type: "S" },
      { text: "Perspectiva objetiva y soluciones racionales.", type: "C" }
    ]
  },
  {
    id: 18,
    question: "Prefieres ser evaluado por:",
    options: [
      { text: "Los resultados finales y objetivos alcanzados.", type: "D" },
      { text: "Tus contribuciones creativas y tu habilidad para interactuar.", type: "I" },
      { text: "Tu lealtad, tu consistencia y cmo ayudas al equipo.", type: "S" },
      { text: "La exactitud, calidad tǸcnica y el rigor de tu trabajo.", type: "C" }
    ]
  },
  {
    id: 19,
    question: "Tu espacio de trabajo o escritorio suele ser:",
    options: [
      { text: "Funcional; solo lo necesario para ser productivo, a menudo con proyectos amontonados.", type: "D" },
      { text: "Desordenado, colorido, con fotos y recuerdos personales.", type: "I" },
      { text: "Acogedor, organizado y con toques personales amigables.", type: "S" },
      { text: "Impecable, muy organizado, con sistemas de archivo claros.", type: "C" }
    ]
  },
  {
    id: 20,
    question: "Al planificar tu semana laboral:",
    options: [
      { text: "Haces una lista de los grandes objetivos a vencer.", type: "D" },
      { text: "Tu agenda es flexible; prefieres ver quǸ reuniones o eventos surgen.", type: "I" },
      { text: "Te gusta tener una rutina clara y predecible de lunes a viernes.", type: "S" },
      { text: "Planificas cada bloque de tiempo al detalle para maximizar la eficiencia.", type: "C" }
    ]
  },
  {
    id: 21,
    question: "En una negociacin con un cliente difcil, tǧ:",
    options: [
      { text: "Presionas firmemente para obtener las mejores condiciones posibles.", type: "D" },
      { text: "Intentas ganarte su simpata y buscar una conexin personal.", type: "I" },
      { text: "Buscas un compromiso pacfico donde ambas partes estǸn cmodas.", type: "S" },
      { text: "Le presentas datos, clǭusulas y lgica irrefutable para convencerlo.", type: "C" }
    ]
  },
  {
    id: 22,
    question: "Si alguien de tu equipo comete un error, sueles:",
    options: [
      { text: "Sealarlo rǭpidamente para que no afecte el resultado.", type: "D" },
      { text: "Quitarle importancia para que la persona no se sienta mal.", type: "I" },
      { text: "Ayudarle a corregirlo en privado de forma empǭtica.", type: "S" },
      { text: "Revisar por quǸ fall el proceso y cmo evitarlo en el futuro.", type: "C" }
    ]
  },
  {
    id: 23,
    question: "Lo que mǭs te enorgullece en tu carrera es:",
    options: [
      { text: "Los obstǭculos que superaste y las metas agresivas que lograste.", type: "D" },
      { text: "Las relaciones que construiste y las ideas innovadoras que propusiste.", type: "I" },
      { text: "El apoyo que diste a tu equipo durante aos y tu confiabilidad.", type: "S" },
      { text: "La calidad impecable de tu trabajo y tu experiencia tǸcnica.", type: "C" }
    ]
  },
  {
    id: 24,
    question: "Bajo mucho estrǸs, es probable que te vuelvas:",
    options: [
      { text: "Autoritario, exigente e impaciente.", type: "D" },
      { text: "Desorganizado, emocional y hablador en exceso.", type: "I" },
      { text: "Inseguro, excesivamente complaciente y resistente a actuar.", type: "S" },
      { text: "Aislado, crtico y paralizado por el anǭlisis.", type: "C" }
    ]
  },
  {
    id: 25,
    question: "Cuando lideras un equipo, tu estilo es:",
    options: [
      { text: "Directivo: marcas el rumbo y esperas que te sigan sin dudar.", type: "D" },
      { text: "Carismǭtico: inspiras con una visin y mucha energa.", type: "I" },
      { text: "Participativo: creas consensos y te aseguras de que todos estǸn bien.", type: "S" },
      { text: "Estructurado: defines reglas claras, procesos y estǭndares de calidad.", type: "C" }
    ]
  },
  {
    id: 26,
    question: "En una sesin de capacitacin tǸcnica, prefieres:",
    options: [
      { text: "Que vayan al grano rǭpido; solo quieres saber cmo te sirve esto.", type: "D" },
      { text: "Dinǭmicas de grupo interactivo y participacin.", type: "I" },
      { text: "Tener tiempo suficiente para practicar sin sentirte presionado.", type: "S" },
      { text: "Material detallado, manuales escritos y un instructor experto que responda dudas tǸcnicas.", type: "C" }
    ]
  },
  {
    id: 27,
    question: "Lo que mǭs valoras en un colega es:",
    options: [
      { text: "Su capacidad de dar resultados rǭpidos y eficaces.", type: "D" },
      { text: "Su sentido del humor y actitud positiva.", type: "I" },
      { text: "Su lealtad, disposicin a ayudar y sinceridad.", type: "S" },
      { text: "Su nivel de conocimiento, precisin y orden.", type: "C" }
    ]
  },
  {
    id: 28,
    question: "Cuando lees un correo electrnico largo:",
    options: [
      { text: "Lees solo la primera lnea y vas directo a lo que te piden.", type: "D" },
      { text: "Lees por encima y respondes rǭpidamente o prefieres hacer una llamada.", type: "I" },
      { text: "Lo lees con calma y preparas una respuesta amable.", type: "S" },
      { text: "Lo lees detalladamente, analizas los datos y respondes punto por punto.", type: "C" }
    ]
  },
  {
    id: 29,
    question: "Tu ritmo de trabajo ideal es:",
    options: [
      { text: "Acelerado, siempre moviǸndote a la siguiente meta.", type: "D" },
      { text: "Dinǭmico, con interacciones constantes y tareas variadas.", type: "I" },
      { text: "Relajado pero constante, prefieres hacer una cosa a la vez.", type: "S" },
      { text: "Metdico, pausado y con tiempo para revisar cada detalle.", type: "C" }
    ]
  },
  {
    id: 30,
    question: "La frase que mejor te define es:",
    options: [
      { text: "Vamos a hacerlo rǭpido y a mi manera.", type: "D" },
      { text: "Vamos a hacerlo juntos y que sea divertido.", type: "I" },
      { text: "Vamos a hacerlo sin presiones y ayudǭndonos.", type: "S" },
      { text: "Vamos a hacerlo de la manera correcta y sin errores.", type: "C" }
    ]
  }
];
