import { useMemo } from 'react';
import clsx from 'clsx';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { InlineIcon } from '@iconify/react';
import share2 from '@iconify/icons-lucide/share-2';

import AutoBlurButton from './AutoBlurButton';

import racoon from '../assets/img/me_racoon.gif';
import cat from '../assets/img/me_cat.png';
import duck from '../assets/img/me_duck.png';
import skunk from '../assets/img/me_skunk2.gif';

import { useState } from 'react';
import { selectEvalutationForJob } from '../source';

const getImgSrc = (marks) =>
  marks < 4 ? skunk : marks < 7 ? duck : marks < 9 ? cat : racoon;

const Result = ({ marks, onStartOver, quizs, job, onShare }) => {
  const [loading, setLoading] = useState(true);

  const [, badgeTitle, badgeBody] = useMemo(
    () => selectEvalutationForJob(job, marks),
    [job, marks]
  );

  return (
    <Container>
      <div className='bg-dark p-2 rounded-5 text-center row justify-content-center'>
        <div className='text-center rounded col-lg-8'>
          <div className={clsx(['text-center p-1 mb-2 rounded', 'text-light'])}>
            <h5 className='mb-2'>{`Hai totalizzato ${marks} punti su ${quizs.length}`}</h5>

            <h3 className='mb-2 fw-bold'>{badgeTitle}</h3>

            <p className='mb-2'>{badgeBody}</p>
          </div>

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
          <p>
            <span className='me-1 d-inline-block align-middle'>
              Fai subito uno screenshot per non perdere il tuo badge
            </span>
          </p>
          <div className='mb-2'>
            <AutoBlurButton
              variant='primary'
              className='mx-0'
              onClick={onShare}
            >
              <InlineIcon icon={share2} className='me-1' />
              <span>condividi</span>
            </AutoBlurButton>
          </div>

          <div>
            <AutoBlurButton
              onClick={onStartOver}
              variant='light'
              className='px-4 fw-bold d-inline'
            >
              Ritenta
            </AutoBlurButton>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Result;
