const sources = {
  simpleQuiz: [
    {
      id: 1,
      question:
        'Quale dei seguenti è uno dei cinque momenti dell’igiene delle mani?',
      options: [
        [1, 'Prima del contatto con il paziente', {}],
        [2, 'Dopo il contatto con il paziente', {}],
        [3, 'Dopo il contatto con ciò che sta attorno al paziente', {}],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 4,
    },
    {
      id: 2,
      question: 'Quale affermazione circa l’igiene delle mani è corretta?',
      options: [
        [1, 'La frizione alcolica è efficace e dura 20-30 secondi', {}],
        [
          2,
          'Il lavaggio sociale (acqua e sapone) è efficace e dura 40-60 secondi',
          {},
        ],
        [3, 'La corretta procedura d’igiene delle mani prevede sei fasi', {}],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 4,
    },
    {
      id: 3,
      question: 'Quale affermazione circa l’igiene delle mani è corretta?',
      options: [
        [1, 'La frizione alcolica è efficace e dura 40-60 secondi', {}],
        [
          2,
          'Il lavaggio sociale (acqua e sapone) è efficace e dura 20-30 secondi',
          {},
        ],
        [3, 'La corretta procedura d’igiene delle mani prevede sei fasi', {}],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 3,
    },
    {
      id: 4,
      question: 'L’igiene delle mani:',
      options: [
        [
          1,
          'è la misura di base e più efficace per prevenire la trasmissione dei patogeni e delle infezioni',
          {},
        ],
        [2, 'è applicabile solo in ambiente sanitario', {}],
        [3, 'può essere fatta solo con soluzioni alcoliche', {}],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 1,
    },
    {
      id: 5,
      question: 'L’igiene delle mani:',
      options: [
        [1, 'è la misura più efficace nel controllo delle infezioni', {}],
        [
          2,
          'se applicata correttamente, può prevenire tutte le infezioni nel 100% dei casi',
          {},
        ],
        [
          3,
          'è di regola oggetto di elevata adesione tra gli operatori sanitari',
          {},
        ],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 1,
    },
    {
      id: 6,
      question: 'La trasmissione dei microrganismi è maggiore in caso di:',
      options: [
        [1, 'stretta di mano', {}],
        [2, 'Dare il cinque', {}],
        [3, 'fist bump - battere il pugno', {}],
        [4, 'elbow bump - battere il gomito', {}],
      ],
      answer: 1,
    },
    {
      id: 7,
      question:
        'Da quante “fasi” è composta la tecnica di igiene delle mani proposta dall’OMS?',
      options: [
        [1, 'Quattro', {}],
        [2, 'Cinque', {}],
        [3, 'Sei', {}],
        [4, 'Sette', {}],
      ],
      answer: 3,
    },
    {
      id: 8,
      question:
        'Quale dei seguenti momenti di igiene delle mani NON fa parte delle indicazioni OMS?',
      options: [
        [1, 'Prima del contatto con il paziente', {}],
        [2, 'Prima del contatto con l’ambiente circostante il paziente', {}],
        [3, 'Dopo il contatto con il paziente', {}],
        [4, 'Dopo il contatto con l’ambiente circostante il paziente', {}],
      ],
      answer: 2,
    },
    {
      id: 9,
      question:
        'Qual è una controindicazione all’uso di prodotti a base alcolica per l’igiene delle mani?',
      options: [
        [1, 'Assistenza a pazienti con infezioni', {}],
        [2, 'Assistenza a pazienti immunocompromessi', {}],
        [3, 'Mani visibilmente sporche', {}],
        [4, 'Tutte le precedenti risposte sono corrette', {}],
      ],
      answer: 3,
    },
  ],
  advancedQuiz: [
    {
      id: 10,
      question: 'Test difficile?',
      options: [
        [1, 'Risposta impossibile', {}],
        [2, 'Ciao', {}],
        [3, 'Test2', {}],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 4,
    },
  ],
};

let _ids = [];
Object.values(sources).forEach((quiz) => {
  quiz.forEach((q) => {
    if (_ids.includes(q.id))
      throw new Error(`Duplicated question with id ${q.id}, please fix it`);
    _ids.push(q.id);
  });
});

export const selectQuizForJob = (job) => {
  switch (job) {
    case 0:
      return [];
    case 1:
      return sources.advancedQuiz;
    case 2:
      return sources.advancedQuiz;
    case 3:
      return sources.advancedQuiz;
    case 4:
      return sources.advancedQuiz;
    case 5:
      return sources.advancedQuiz;
    case 6:
      return sources.simpleQuiz;
    default:
      throw new Error(`Job ${job} not found`);
  }
};

const evaluationsFn = {
  simpleQuiz: (marks) => {
    const texts = [
      [
        'Puzzola incallita',
        'Oops, sei una PUZZOLA INCALLITA!',
        'Hai bisogno di migliorare le tue abitudini di igiene delle mani. Continua a lavorare per mantenere le mani pulite come una puzzola più attenta alla sua igiene.',
      ],
      [
        'Gatto consapevole',
        'Sei un GATTO CONSAPEVOLE, ma puoi ancora fare meglio!',
        "Stai facendo progressi nell'adozione di un'igiene delle mani adeguata. Continua a mettere in pratica le buone abitudini per mantenere le mani pulite come un gatto che è consapevole dell'importanza dell'igiene.",
      ],
      [
        'Koala pulito',
        'Sei un KOALA PULITO ma puoi fare di meglio!',
        "Hai raggiunto un livello avanzato nell'igiene delle mani. Continua a mostrare la tua dedizione nell'adottare le migliori pratiche igieniche per mantenere le mani pulite come un koala che mantiene il suo morbido pelo impeccabile.",
      ],
      [
        'Orsetto lavatore impeccabile',
        'Stupendo, sei un ORSETTO LAVATORE IMPECCABILE!',
        "Sei un vero maestro dell'igiene delle mani! La tua conoscenza e le tue abitudini sono impeccabili come un orsetto lavatore che si prende cura del suo aspetto. Continua a brillare come un esempio di igiene delle mani.",
      ],
    ];
    if (marks < 4) return texts[0];
    if (marks < 7) return texts[1];
    if (marks < 9) return texts[2];
    return texts[3];
  },
  advancedQuiz: (marks) => {
    const texts = [
      ['Prova1', 'Prova1!', 'Description1'],
      ['Prova2', 'Prova2!', 'Description2'],
      ['Prova3', 'Prova3!', 'Description3'],
      ['Prova4', 'Prova4!', 'Description4'],
    ];
    if (marks < 4) return texts[0];
    if (marks < 7) return texts[1];
    if (marks < 9) return texts[2];
    return texts[3];
  },
};

export const selectEvalutationForJob = (job, marks) => {
  switch (job) {
    case 0:
      return ['', '', ''];
    case 1:
      return evaluationsFn.advancedQuiz(marks);
    case 2:
      return evaluationsFn.advancedQuiz(marks);
    case 3:
      return evaluationsFn.advancedQuiz(marks);
    case 4:
      return evaluationsFn.advancedQuiz(marks);
    case 5:
      return evaluationsFn.advancedQuiz(marks);
    case 6:
      return evaluationsFn.simpleQuiz(marks);
    default:
      throw new Error(`Job ${job} not found`);
  }
};
