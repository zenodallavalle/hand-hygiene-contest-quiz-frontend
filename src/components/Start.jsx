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
  setStartId,
  referrer,
}) => {
  const [clicked, setCliked] = useState(false);
  const [isOperator, setIsOperator] = useState(undefined);

  useEffect(() => {
    if (isOperator === false) {
      setJob(notHealthcareWorkerValue);
    }
  }, [isOperator, setJob]);

  const onStartQuiz = async () => {
    if (!validateNickname(nickname) || !validateJob(job))
      return setCliked(true);

    setQuestionIndex(0);
    setMarks(0);

    const id = await collectStart(quizUID, nickname.trim(), job, referrer);

    if (id) setStartId(id);
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
        <div className='col-lg-11 p-2 rounded-5 bg-dark'>
          <h1 className='fw-bold mb-2'>Igiene delle mani</h1>
          <h5 className='fw-bold mb-4'>Ottieni ora il tuo badge animale!</h5>
          <Form.Control
            size='sm'
            nickname={nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
            placeholder='Nickname'
          />
          {clicked && !validateNickname(nickname) && (
            <small>
              <div className='mt-1 text-center text-danger text-small'>
                Inserisci un nickname valido (1-99 caratteri)!
              </div>
            </small>
          )}
          <div className='mb-1' />

          <div className='d-flex align-items-center'>
            <small>
              <div className='text-small text-start me-3'>
                Sei un operatore sanitario o uno studente in ambito sanitario?
              </div>
            </small>

            <Form.Check
              inline
              type='radio'
              className='me-1'
              label='Sì'
              checked={isOperator === true}
              onChange={() => setIsOperator(true)}
            />

            <Form.Check
              inline
              className='me-1'
              type='radio'
              label='No'
              checked={isOperator === false}
              onChange={() => setIsOperator(false)}
            />
          </div>
          {clicked && isOperator === undefined && (
            <small>
              <div className='mt-1 text-start text-danger text-small'>
                Seleziona una risposta per proseguire!
              </div>
            </small>
          )}
          <div className='mb-1' />

          {isOperator && (
            <>
              <div className='d-flex align-items-baseline'>
                <div className='me-1 text-small'>Qualifica</div>
                <Form.Select
                  size='sm'
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
                <small>
                  <div className='mt-1 text-center text-small text-danger'>
                    Seleziona una professione per proseguire!
                  </div>
                </small>
              )}
              <div className='mb-2' />
            </>
          )}

          <small>
            <p className='fst-italic small mt-0 pt-0'>
              Partecipando a questo quiz, autorizzi la raccolta dei tuoi dati
              (nickname, indirizzo IP, professione e le risposte) che saranno
              salvati sul nostro server. I dati raccolti saranno utilizzati
              esclusivamente in forma anonima e aggregata a fini epidemiologici
              e di ricerca sull’igiene delle mani. Altri usi al di fuori di
              questi non saranno consentiti. Tutte le informazioni personali
              identificabili saranno rigorosamente protette e trattate
              conformemente alle leggi sulla privacy vigenti.
            </p>
          </small>
          <AutoBlurButton
            onClick={!nickname.trim() ? () => setCliked(true) : onStartQuiz}
            variant='light'
            className='px-4 py-2 text-dark fw-bold border-dark'
          >
            Inizia ora
          </AutoBlurButton>
        </div>
      </div>
      <div className='mb-3 mt-1' style={{ height: 90 }} />
    </Container>
  );
};

export default Start;
