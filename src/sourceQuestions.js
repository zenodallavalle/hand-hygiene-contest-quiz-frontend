import handHygiene from './assets/img/handHygiene.gif';

// Don't use the spread operator here

const questions = [
  {
    id: 1,
    question:
      'Qual è la durata complessiva del lavaggio delle mani con acqua e sapone per ottenere una corretta igiene?',
    options: [
      [1, 'Almeno 40-60 secondi', {}],
      [2, 'Almeno 10 secondi', {}],
      [3, 'Almeno 2 minuti', {}],
      [4, 'Almeno 20-30 secondi', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          Secondo l’Istituto Superiore di Sanità il corretto lavaggio sociale
          (acqua e sapone) dura tra i 40 e i 60 secondi (per l’intero processo
          di lavaggio e asciugatura).
        </div>
      </>
    ),
  },
  {
    id: 2,
    question:
      'Quale tra questi è il modo più rapido per ottenere una corretta igiene delle mani?',
    options: [
      [1, 'Lavare le mani con acqua e sapone', {}],
      [2, 'Usare un prodotto specifico a base di alcol', {}],
      [3, 'Usare la candeggina pura', {}],
      [
        4,
        'Possiamo scegliere noi poiché tutte le modalità hanno la stessa durata',
        {},
      ],
    ],
    answer: 2,
    explaination: (
      <>
        <div>
          Nella maggior parte dei casi il modo più rapido per ottenere una
          corretta igiene delle mani è usare un prodotto a base di alcol,
          efficace nel distruggere batteri, virus e altri agenti patogeni, per
          20-30 secondi.
        </div>
      </>
    ),
  },
  {
    id: 3,
    question: "L'igiene delle mani:",
    options: [
      [
        1,
        'È la misura più efficace per prevenire la trasmissione dei germi patogeni e quindi delle infezioni',
        {},
      ],
      [2, 'Può essere fatta solo con prodotto specifico a base di alcol', {}],
      [
        3,
        'Se applicata correttamente, può prevenire tutte le infezioni nel 100% dei casi',
        {},
      ],
      [4, 'È importante solo in corso di pandemia', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          L’igiene delle mani può essere effettuata con prodotti specifici a
          base di alcol oppure con acqua e sapone; seppur non in grado di
          prevenire il 100% delle infezioni, resta la misura più efficace per
          interrompere la catena di trasmissione delle infezioni.
        </div>
      </>
    ),
  },
  {
    id: 4,
    question:
      'La trasmissione dei germi da persona a persona è maggiore in caso di:',
    options: [
      [1, 'Stretta di mano', {}],
      [2, 'Dare il cinque', {}],
      [3, 'Battere il pugno (fist bump)', {}],
      [4, 'Battere il gomito (elbow bump)', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          Le mani sono spesso in contatto con diverse superfici, inclusi oggetti
          contaminati e parti del corpo che possono essere fonte di
          microrganismi facili poi da trasmettere ad altre persone o a superfici
          ambientali. La durata e la tipologia di contatto tra le mani rende la
          stretta di mano la modalità di saluto più a rischio.
        </div>
      </>
    ),
  },
  {
    id: 5,
    question:
      'La presenza di anelli o bracciali può influire su una corretta igiene delle mani?',
    options: [
      [1, 'Vero', {}],
      [2, 'Falso', {}],
      [
        3,
        'No, ma è consigliato toglierli perché acqua e sapone li rovinano',
        {},
      ],
      [4, 'Influiscono solo se sono di un metallo non prezioso', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          I monili (anelli, bracciali, ecc.) possono accumulare sporco, sudore e
          residui organici, fornendo un ambiente favorevole alla crescita di
          germi e impedire la corretta pulizia di tutta la pelle delle mani.
        </div>
      </>
    ),
  },
  {
    id: 6,
    question:
      'Quale affermazione sulla “flora” batterica delle mani è corretta?',
    options: [
      [
        1,
        'Non esistono batteri sulle mani, altrimenti contamineremmo ogni cosa che tocchiamo',
        {},
      ],
      [
        2,
        'Quella “residente” (cioè stabilmente presente) è la principale responsabile della trasmissione delle infezioni',
        {},
      ],
      [
        3,
        'Quella “transitoria” (cioè acquisita temporaneamente) è la principale responsabile della trasmissione delle infezioni',
        {},
      ],
      [4, 'Lavando le mani eliminiamo tutti i batteri presenti', {}],
    ],
    answer: 3,
    explaination: (
      <>
        <div>
          La “flora batterica residente” è costituita dai germi che risiedono
          negli strati più profondi della pelle e non può essere rimossa con il
          semplice lavaggio delle mani, ma raramente causa infezioni. La “flora
          batterica transitoria” è costituita da germi acquisiti, che facilmente
          sono rimossi, ma che spesso comprende germi patogeni ed è responsabile
          della trasmissione della maggior parte delle infezioni senza una
          adeguata igiene delle mani.
        </div>
      </>
    ),
  },
  {
    id: 7,
    question:
      "Quale fattore può influenzare l'efficacia dell'igiene delle mani?",
    options: [
      [1, 'Il profumo del sapone utilizzato', {}],
      [2, 'La marca del sapone utilizzato', {}],
      [3, 'La durata del lavaggio', {}],
      [4, 'La quantità di bicarbonati nell’acqua', {}],
    ],
    answer: 3,
    explaination: (
      <>
        <div>
          Lavarsi le mani per un tempo sufficiente consente l’adeguata rimozione
          di sporco e germi. Gli altri fattori citati di regola non influiscono
          sull’efficacia dell’igiene delle mani.
        </div>
      </>
    ),
  },
  {
    id: 8,
    question:
      'Quale tra queste affermazioni è vera per una corretta igiene delle mani?',
    options: [
      [1, 'Non serve fare l’igiene delle mani dopo aver rimosso i guanti', {}],
      [
        2,
        'È possibile usare il prodotto specifico a base di alcol in qualsiasi occasione poiché è pratico, efficace e si asciuga subito',
        {},
      ],
      [
        3,
        'Se le mani sono visibilmente sporche, è indicato usare acqua e sapone',
        {},
      ],
      [
        4,
        "L'igiene delle mani non ha alcun impatto sulla prevenzione delle infezioni",
        {},
      ],
    ],
    answer: 3,
    explaination: (
      <>
        <div>
          I prodotti a base di alcol sono pratici ed efficaci, ma non permettono
          la rimozione dello sporco per cui è indicato il lavaggio con acqua e
          sapone. L’igiene delle mani è la misura più efficace per prevenire la
          trasmissione dei germi patogeni.
        </div>
      </>
    ),
  },

  {
    id: 9,
    question:
      'Qual è la durata complessiva del lavaggio delle mani con acqua e sapone per ottenere una corretta igiene?',
    options: [
      [1, 'Almeno 40-60 secondi', {}],
      [2, 'Almeno 10 secondi', {}],
      [3, 'Almeno 2 minuti', {}],
      [4, 'Almeno 20-30 secondi', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          Secondo l’Istituto Superiore di Sanità il corretto lavaggio sociale
          (acqua e sapone) dura tra i 40 e i 60 secondi (per l’intero processo
          di lavaggio e asciugatura).
        </div>
      </>
    ),
  },
  {
    id: 10,
    question:
      'La trasmissione dei microrganismi da persona a persona è maggiore in caso di:',
    options: [
      [1, 'Stretta di mano', {}],
      [2, 'Dare il cinque', {}],
      [3, 'Battere il pugno (fist bump)', {}],
      [4, 'Battere il gomito (elbow bump)', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          Le mani sono spesso in contatto con diverse superfici, inclusi oggetti
          contaminati e parti del corpo che possono essere fonte di
          microrganismi facili poi da trasmettere ad altre persone o a superfici
          ambientali. La durata e la tipologia di contatto tra le mani rendono
          la stretta di mano la modalità di saluto più a rischio.
        </div>
      </>
    ),
  },
  {
    id: 11,
    question:
      "Quali sono gli effetti negativi dell'utilizzo eccessivo di soluzioni antisettiche a base di alcol sulle mani?",
    options: [
      [1, 'Secchezza e irritazione della pelle', {}],
      [2, 'Unghie fragili', {}],
      [3, 'Reazioni allergiche sistemiche', {}],
      [4, 'Nessun effetto negativo noto', {}],
    ],
    answer: 1,
    explaination: (
      <>
        <div>
          L’alcol è un solvente con azione disidratante e può dissolvere gli oli
          naturali e i lipidi che mantengono la pelle integra e idratata, anche
          se nei prodotti specifici sono contenuti emollienti proprio per questo
          motivo. È comunque consigliabile utilizzare spesso creme idratanti.
        </div>
      </>
    ),
  },
  {
    id: 12,
    question:
      'Operativamente da quanti "step" (o fasi) è composta la tecnica di igiene delle mani proposta dall’OMS?',
    options: [
      [1, 'Quattro', {}],
      [2, 'Cinque', {}],
      [3, 'Sei', {}],
      [4, 'Sette', {}],
    ],
    answer: 3,
    explaination: (
      <>
        <div>
          <img
            src={handHygiene}
            alt='Hand Hygiene'
            className='mx-auto pb-1 rounded'
            style={{
              width: '100%',
              maxWidth: '300px',
              display: 'block',
            }}
          />
          Le fasi per una corretta tecnica di lavaggio sono 6:
          <ol>
            <li>Strofinare i palmi tra loro</li>
            <li>
              Strofinare il palmo destro sul dorso sinistro intrecciando le dita
              e viceversa
            </li>
            <li>
              Strofinare gli spazi interdigitali con le mani palmo su palmo
            </li>
            <li>Frizionare il dorso delle dita piegate nei palmi opposti</li>
            <li>
              Eseguire un movimento rotatorio con il palmo destro chiuso sul
              pollice sinistro e viceversa
            </li>
            <li>
              Ruotare la punta delle dita sul palmo della mano opposta e
              viceversa
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 13,
    question:
      'Nel caso di assistenza a pazienti con infezione da C. difficile:',
    options: [
      [1, 'È indifferente praticare o meno l’igiene delle mani', {}],
      [2, 'È consigliata l’igiene delle mani con prodotto a base di alcol', {}],
      [
        3,
        'È consigliata l’igiene delle mani con acqua e sapone/antisettico',
        {},
      ],
      [4, 'È consigliato procedere con lavaggio di tipo chirurgico', {}],
    ],
    answer: 3,
    explaination: (
      <>
        <div>
          Le spore di C. difficile sono poco sensibili al gel idroalcolico per
          cui resta indicato il lavaggio con acqua e sapone (o sapone
          antisettico) per rimuoverle fisicamente dalle mani.
        </div>
      </>
    ),
  },
  {
    id: 14,
    question:
      'Quale dei seguenti NON è uno dei cinque momenti (indicazioni) dell’igiene delle mani?',
    options: [
      [1, 'Prima del contatto con il paziente', {}],
      [2, 'Prima del contatto con l’ambiente circostante il paziente', {}],
      [3, 'Dopo il contatto con il paziente', {}],
      [4, 'Dopo il contatto con ciò che sta attorno al paziente', {}],
    ],
    answer: 2,
    explaination: (
      <>
        <div>
          I cinque momenti dell’igiene delle mani sono: prima del contatto con
          il paziente, prima di una procedura asettica, dopo il contatto con
          fluidi biologici, dopo il contatto con il paziente e dopo il contatto
          con ciò che sta attorno al paziente.
        </div>
      </>
    ),
  },
  {
    id: 15,
    question:
      "Nel corso dell'assistenza già in atto a un paziente, prima di una procedura asettica (es. medicazione della ferita chirurgica) è necessaria una nuova igiene delle mani?",
    options: [
      [1, 'No', {}],
      [2, 'No, se si usano i guanti', {}],
      [3, 'Sì', {}],
      [4, 'Sì, solo se si è toccato qualcosa di contaminato', {}],
    ],
    answer: 3,
    explaination: (
      <>
        <div>
          L’uso dei guanti non sostituisce la necessità di igiene delle mani
          (frizione alcolica o lavaggio con acqua e sapone / antisettico).
        </div>
      </>
    ),
  },
  {
    id: 16,
    question: 'Quale tra queste non è una pratica di igiene delle mani?',
    options: [
      [1, 'Lavaggio sociale', {}],
      [2, 'Lavaggio antisettico', {}],
      [3, 'Lavaggio chirurgico', {}],
      [4, 'Lavaggio palmare', {}],
    ],
    answer: 4,
    explaination: (
      <>
        <div>
          Il lavaggio sociale è quello con acqua e sapone, il lavaggio
          antisettico si effettua con un prodotto a base di alcol oppure con un
          sapone antisettico, il lavaggio chirurgico è un lavaggio antisettico
          più esteso e di maggior durata; il lavaggio palmare… non esiste 😄.
        </div>
      </>
    ),
  },
];

const compiledQuestions = questions.reduce((acc, q) => {
  const { id } = q;
  if (acc[id]) {
    throw new Error(`Question with id ${id} already exists`);
  }
  acc[id] = q;
  return acc;
}, {});

export default compiledQuestions;
