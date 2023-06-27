import { useMemo } from 'react';
import clsx from 'clsx';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import AutoBlurButton from './AutoBlurButton';

import racoon from '../assets/img/me_racoon.gif';
import cat from '../assets/img/cat.jpg';
import koala from '../assets/img/koala.jpg';
import skunk from '../assets/img/me_skunk.gif';

import { useState } from 'react';
import { selectEvalutationForJob } from '../source';

const getBgColor = (marks) =>
  marks < 4 ? 'danger' : marks < 9 ? 'warning' : 'success';

const getImgSrc = (marks) =>
  marks < 4 ? skunk : marks < 7 ? cat : marks < 9 ? koala : racoon;

const Result = ({ marks, onStartOver, quizs, job }) => {
  const [loading, setLoading] = useState(true);

  const [, badgeTitle, badgeBody] = useMemo(
    () => selectEvalutationForJob(job, marks),
    [job, marks]
  );

  return (
    <Container>
      <div className='bg-dark p-2 rounded-5 text-center row justify-content-center'>
        <div className='text-center rounded col-lg-8'>
          <div
            className={clsx([
              'text-center p-1 mb-2 rounded',
              'text-light',
              `bg-${getBgColor(marks)}-semitransparent`,
            ])}
          >
            <h1 className='mb-2 fw-bold'>{badgeTitle}</h1>

            <p className='mb-2 fw-bold'>{badgeBody}</p>
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

          <p className='fw-bold fst-italic mb-1'>
            {`Hai totalizzato ${marks} punti su ${quizs.length}.`}
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
    </Container>
  );
};

export default Result;
