import clsx from 'clsx';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { InlineIcon } from '@iconify/react';
import share2 from '@iconify/icons-lucide/share-2';

import AutoBlurButton from './AutoBlurButton';

import { useState } from 'react';

const Result = ({ marks, onStartOver, quizs, evaluationTexts, onShare }) => {
  const [loading, setLoading] = useState(true);

  const [, badgeTitle, badgeBody, imgSrc] = evaluationTexts;

  return (
    <Container className='container-padding-top'>
      <div className='bg-dark p-2 rounded-5 text-center row justify-content-center'>
        <div className='text-center rounded col-lg-8'>
          <div className={clsx(['text-center p-1 mb-2 rounded', 'text-light'])}>
            {!!quizs.length && (
              <h5 className='mb-2'>{`Hai totalizzato ${marks} punti su ${quizs.length}`}</h5>
            )}

            <h3 className='mb-2 fw-bold'>{badgeTitle}</h3>

            <div className='mb-2'>{badgeBody}</div>
          </div>

          <div className='w-100 mb-4 d-flex justify-content-center'>
            <img
              src={imgSrc}
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
          <div className='mb-3 mt-1' style={{ height: 90 }} />
        </div>
      </div>
    </Container>
  );
};

export default Result;
