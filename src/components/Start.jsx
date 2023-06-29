import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import AutoBlurButton from './AutoBlurButton';

import { useCollectStart } from '../api';
import capitalize from '../capitalize';

const jobOptions = [
  [1, 'Medico/odontoiatra'],
  [2, 'Professionista sanitario (infermiere, fisioterapista, ecc.)'],
  [3, 'Operatore socio-sanitario'],
  [4, 'Studente di medicina/odontoiatria'],
  [5, 'Studente di professioni sanitarie'],
  [6, 'Altra tipologia di operatore sanitario'],
];

const notHealthcareWorkerValue = 7;

// validators
const validateNickname = (nickname) =>
  nickname.trim() && nickname.trim().length < 100;

const validateJob = (job) =>
  job &&
  1 <= job &&
  job <=
    jobOptions[jobOptions.length - 1][0] + 1; /* +1 for notHealthcareWorkers */

const Start = ({
  quizUID,
  nickname,
  setNickname,
  job,
  setJob,
  setQuestionIndex,
  setMarks,
}) => {
  const [clicked, setCliked] = useState(false);
  const [isOperator, setIsOperator] = useState(undefined);

  useEffect(() => {
    if (isOperator === false) {
      setJob(notHealthcareWorkerValue);
    }
  }, [isOperator, setJob]);

  const onStartQuiz = () => {
    if (!validateNickname(nickname) || !validateJob(job))
      return setCliked(true);
    collectStart(quizUID, nickname.trim(), job);
    setQuestionIndex(0);
    setMarks(0);
  };

  const processIntegerOrThrowError = (s) => {
    const n = parseInt(s);
    if (!isNaN(n)) return n;
    throw new Error(`Cannot parse ${s} to int`);
  };

  const { collectStart } = useCollectStart();

  return (
    <Container className='container-padding-top'>
      <div className='text-center row justify-content-center'>
        <div className='col-lg-10 p-2 rounded-5 bg-dark'>
          <h1 className='fw-bold mb-2'>Igiene delle mani</h1>
          <h5 className='fw-bold mb-4'>Ottieni ora il tuo avatar!</h5>
          <Form.Control
            nickname={nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
            placeholder='Nickname'
          />
          {clicked && !validateNickname(nickname) && (
            <div className='mt-1 text-center text-danger text-small'>
              Inserisci un nickname valido (1-99 caratteri)!
            </div>
          )}

          <div className='mb-3' />

          <div className='d-flex align-items-baseline'>
            <div className='text-small me-3'>
              <div>
                Sei un operatore sanitario o uno studente in ambito sanitario?
              </div>
            </div>

            <Form.Check
              inline
              type='radio'
              label='Sì'
              checked={isOperator === true}
              onChange={() => setIsOperator(true)}
            />

            <Form.Check
              inline
              type='radio'
              label='No'
              checked={isOperator === false}
              onChange={() => setIsOperator(false)}
            />
          </div>
          {clicked && isOperator === undefined && (
            <div className='mt-1 text-start text-small text-danger'>
              Seleziona una risposta per proseguire!
            </div>
          )}
          <div className='mb-3' />

          {isOperator && (
            <>
              <div className='d-flex align-items-baseline'>
                <div className='me-1 text-small'>Qualifica</div>
                <Form.Select
                  value={job}
                  onChange={(e) =>
                    setJob(processIntegerOrThrowError(e.target.value))
                  }
                >
                  <option value={0}>seleziona</option>
                  {jobOptions.map(([value, label]) => (
                    <option key={`job_${value}`} value={value}>
                      {capitalize(label)}
                    </option>
                  ))}
                </Form.Select>
              </div>
              {clicked && !validateJob(job) && (
                <div className='mt-1 text-center text-small text-danger'>
                  Seleziona una professione per proseguire!
                </div>
              )}
              <div className='mb-3' />
            </>
          )}

          <p className='fst-italic small'>
            Cliccando Inizia ora accetti che il tuo Nickname, il tuo indirizzo
            IP, la tua professione e le risposte date vengano salvate sul nostro
            server per indagini statistiche anonime sull'igiene delle mani.
          </p>
          <AutoBlurButton
            onClick={!nickname.trim() ? () => setCliked(true) : onStartQuiz}
            variant='light'
            className='px-4 py-2 text-dark fw-bold'
          >
            Inizia ora
          </AutoBlurButton>
        </div>
      </div>
    </Container>
  );
};

export default Start;
