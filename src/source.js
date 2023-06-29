import handHygiene from './assets/img/handHygiene.gif';

import racoon from './assets/img/me_racoon.gif';
import cat from './assets/img/me_cat.png';
import duck from './assets/img/me_duck.png';
import skunk from './assets/img/me_skunk2.gif';
import igienistaCeleste from './assets/img/igienistaCeleste.gif';

const sources = {
  notHealthcareQuiz: [
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
      explaination: (
        <>
          <div>Spiegazione</div>
        </>
      ),
    },
  ],
  healthCareQuiz: [
    {
      id: 2,
      question: 'Test difficile?',
      options: [
        [1, 'Risposta impossibile', {}],
        [2, 'Ciao', {}],
        [3, 'Test2', {}],
        [4, 'Tutte le risposte sono corrette', { fixed: true }],
      ],
      answer: 4,
      explaination: (
        <>
          <img src={handHygiene} alt='explainHH' style={{ maxWidth: '100%' }} />
        </>
      ),
    },
  ],
  mmQuiz: [],
};

let _ids = [];
Object.values(sources).forEach((quiz) => {
  quiz.forEach((q) => {
    if (_ids.includes(q.id))
      throw new Error(`Duplicated question with id ${q.id}, please fix it`);
    _ids.push(q.id);
  });
});

export const selectQuizForJobAndNickname = (job, nickname) => {
  if (
    nickname === process.env.REACT_APP_EASTER_EGG1_USERNAME &&
    job === parseInt(process.env.REACT_APP_EASTER_EGG1_JOB)
  )
    return sources.mmQuiz;
  if (job === 0) return [];
  else if (job <= 6) return sources.healthCareQuiz;
  else if (job === 7) return sources.notHealthcareQuiz;
  else throw new Error(`Job ${job} not found`);
};

const evaluationsFn = {
  quiz1: (marks) => {
    const texts = [
      [
        'Puzzola ostinata',
        <>
          <div>Ops... Hai ottenuto il badge</div>
          <div className='my-1 bg-red-semitransparent rounded-5'>
            PUZZOLA OSTINATA
          </div>
          <div>Puoi fare meglio!</div>
        </>,
        "Hai bisogno di migliorare le tue abitudini di igiene delle mani. Continua a lavorare per mantenere le mani pulite ed essere più attento all'igiene.",
        skunk,
      ],
      [
        'Anatroccolo distratto',
        <>
          <div>Quack! Hai ottenuto il badge</div>
          <div className='my-1 bg-orange-semitransparent rounded-5'>
            ANATROCCOLO DISTRATTO
          </div>
          <div>ma puoi fare ancora meglio!</div>
        </>,
        "Stai facendo progressi nell'adozione di un'igiene delle mani adeguata. Continua a mettere in pratica le buone abitudini come un anatroccolo che si tuffa in acqua consapevole dell'importanza dell'igiene delle mani.",
        duck,
      ],
      [
        'Gatto consapevole',
        <>
          <div>Bene! Hai ottenuto il badge</div>
          <div className='my-1 bg-silver-semitransparent rounded-5'>
            GATTO CONSAPEVOLE
          </div>
          <div>ma puoi fare ancora meglio!</div>
        </>,
        'Hai raggiunto un livello avanzato di igiene delle mani. Continua a mostrare la tua dedizione e ad adottare le migliori pratiche igieniche per mantenere le mani pulite come un gatto che mantiene il suo morbido pelo impeccabile.',
        cat,
      ],
      [
        'Orsetto lavatore impeccabile',
        <>
          <div>Stupendo! Hai ottenuto il badge</div>
          <div className='my-1 bg-gold-semitransparent rounded-5'>
            ORSETTO LAVATORE!
          </div>
        </>,
        "Sei un vero maestro dell'igiene delle mani! La tua conoscenza e le tue abitudini sono impeccabili come un orsetto lavatore che si prende cura del suo aspetto. Continua a brillare come un paladino di igiene delle mani.",
        racoon,
      ],
    ];
    if (marks < 3) return texts[0];
    if (marks < 5) return texts[1];
    if (marks < 7) return texts[2];
    return texts[3];
  },
};

export const selectEvalutationForJobAndNickname =
  (job, nickname) => (marks) => {
    if (
      nickname === process.env.REACT_APP_EASTER_EGG1_USERNAME &&
      job === parseInt(process.env.REACT_APP_EASTER_EGG1_JOB)
    )
      return [
        'Igenista celeste',
        'Beccato!',
        <>
          <div>Greit giob! Per te l'igiene delle mani non ha segreti.</div>
          <div>
            Non ti resta che continuare la crociata contro gli operatori
            inadempienti!
          </div>
          <div>Uelldan doc Moro!</div>
        </>,
        igienistaCeleste,
      ];
    if (job === 0) return ['', '', '', null];
    else if (job <= 6) return evaluationsFn.quiz1(marks);
    else if (job === 7) return evaluationsFn.quiz1(marks);
    else throw new Error(`Job ${job} not found`);
  };
