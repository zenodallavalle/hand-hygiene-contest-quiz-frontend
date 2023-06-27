import clsx from 'clsx';
import Spinner from 'react-bootstrap/Spinner';

import AutoBlurButton from './AutoBlurButton';

import { quizs } from '../source';

import racoon from '../assets/img/racoon2.jpg';
import cat from '../assets/img/cat.jpg';
import koala from '../assets/img/koala.jpg';
import skunk from '../assets/img/skunk.jpg';

import { useState } from 'react';

const getBgColor = (marks) =>
  marks < 4 ? 'danger' : marks < 9 ? 'warning' : 'success';

const texts = [
  [
    'Puzzola distratta',
    'Oops sei una PUZZOLA DISTRATTA!',
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

const getText = (marks) =>
  marks < 4 ? texts[0] : marks < 7 ? texts[1] : marks < 9 ? texts[2] : texts[3];

const getImgSrc = (marks) =>
  marks < 4 ? skunk : marks < 7 ? cat : marks < 9 ? koala : racoon;

const Result = ({ marks, onStartOver }) => {
  const [, badgeTitle, badgeBody] = getText(marks);

  const [loading, setLoading] = useState(true);

  return (
    <div className='container'>
      <div className='row vh-100 align-items-center justify-content-center'>
        <div className='col-lg'>
          <div
            className={clsx([
              'text-center p-4 rounded',
              'text-light',
              `bg-${getBgColor(marks)}-semitransparent`,
              'semi-transparent',
            ])}
          >
            <h1 className='mb-2 fw-bold'>{badgeTitle}</h1>

            <p className='mb-2 fw-bold'>{badgeBody}</p>
            <div className='w-100 mb-4 d-flex justify-content-center'>
              <img
                src={getImgSrc(marks)}
                alt='badge'
                className='img-fluid rounded-3'
                width='50%'
                style={{
                  maxWidth: 350,
                  display: loading ? 'none' : 'block',
                }}
                onLoad={() => setLoading(false)}
              />
              <Spinner
                animation='border'
                variant='light'
                size='lg'
                style={{
                  display: !loading ? 'none' : 'block',
                }}
              />
            </div>

            <p className='fw-bold fst-italic mb-1'>
              {`Hai totalizzato ${marks} punti su ${quizs.length}.`}
            </p>
            <p>
              {`I badge che puoi ottenere sono: ${texts
                .map((t) => t[0])
                .join(', ')}. Riprova per ottenere un badge migliore!`}
            </p>

            <AutoBlurButton
              onClick={onStartOver}
              variant='light'
              className='px-4 fw-bold d-inline'
            >
              Ricomincia
            </AutoBlurButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
