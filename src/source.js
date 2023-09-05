import racoon from './assets/img/me_racoon.gif';
import cat from './assets/img/me_cat.png';
import duck from './assets/img/me_duck.png';
import skunk from './assets/img/me_skunk2.gif';
import igienistaCeleste from './assets/img/igienistaCeleste.gif';

import compiledQuestions from './sourceQuestions';

const sources = {
  notHealthcareQuiz: [1, 2, 3, 4, 5, 6, 7, 8],
  healthCareQuiz: [9, 10, 11, 12, 13, 14, 15, 16],
  mmQuiz: [],
};

export const selectQuizForJobAndNickname = (job, nickname) => {
  if (
    nickname.toLowerCase() === process.env.REACT_APP_EASTER_EGG1_USERNAME &&
    job === parseInt(process.env.REACT_APP_EASTER_EGG1_JOB)
  )
    return sources.mmQuiz.map((qId) => compiledQuestions[qId]);
  if (job === 0) return [];
  else if (job <= 6)
    return sources.healthCareQuiz.map((qId) => compiledQuestions[qId]);
  else if (job === 7)
    return sources.notHealthcareQuiz.map((qId) => compiledQuestions[qId]);
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
      nickname.toLowerCase() === process.env.REACT_APP_EASTER_EGG1_USERNAME &&
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
