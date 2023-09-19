import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import AutoBlurButton from './AutoBlurButton';

import { useCollectStart } from '../api';
import capitalize from '../capitalize';

const jobOptions = [
  [1, 'Medico/odontoiatra'],
  [2, 'Professionista sanitario (infermiere, fisioterapista, ostetrica, ecc.)'],
  [3, 'Operatore socio-sanitario'],
  [4, 'Studente di medicina/odontoiatria'],
  [5, 'Studente delle professioni sanitarie'],
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

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const onToggleShowPrivacyPolicy = () =>
    setShowPrivacyPolicy(!showPrivacyPolicy);

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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
            placeholder='Nickname anonimo'
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

          <div>
            <small>
              <p className='fst-italic small mt-0 pt-0'>
                Partecipando a questo quiz, autorizzi la raccolta di dati
                anonimi per fini di ricerca sull’igiene delle mani.
                <br />
                <AutoBlurButton
                  variant='link'
                  className='p-0 ms-1'
                  size='sm'
                  onClick={onToggleShowPrivacyPolicy}
                >
                  Per ulteriori informazioni clicca qui
                </AutoBlurButton>
              </p>
            </small>
          </div>
          <AutoBlurButton
            onClick={!nickname.trim() ? () => setCliked(true) : onStartQuiz}
            variant='light'
            className='px-4 py-2 text-dark fw-bold border-dark'
          >
            Inizia ora
            <br />
            <small>
              <span className='fw-lighter'>e occhio al numero di batteri!</span>
            </small>
          </AutoBlurButton>
        </div>
      </div>
      <Modal
        scrollable
        show={showPrivacyPolicy}
        onHide={onToggleShowPrivacyPolicy}
      >
        <Modal.Header closeButton>
          <b>Policy trattamento dati</b>
        </Modal.Header>
        <Modal.Body>
          Partecipando a questo quiz, autorizzi la raccolta e il trattamento dei
          tuoi dati personali (nickname, indirizzo IP, professione e risposte)
          che saranno conservati nell’infrastruttura informatica di Ospedale San
          Raffaele fino al completamento degli studi e delle relative
          pubblicazioni. Titolare del trattamento dei dati raccolti è Ospedale
          San Raffaele S.r.l., con sede legale in Milano, via Olgettina n. 60,
          20132, Cod. Fisc. e P.IVA 07636600962, e-mail:
          hsrsanraffaele@hsr.postecert.it; il Responsabile della protezione dei
          dati (DPO) è disponibile per qualsiasi chiarimento all’indirizzo
          e-mail: dpo@hsr.it. I dati raccolti saranno utilizzati esclusivamente
          in forma anonima e aggregata a fini epidemiologici e di ricerca
          sull’igiene delle mani. I dati potranno essere diffusi in forma
          anonima e aggregata attraverso pubblicazioni scientifiche e/o convegni
          scientifici. Altri usi al di fuori di questi non saranno consentiti. I
          dati potranno essere condivisi con i fornitori del Titolare, nominati
          Responsabili del trattamento. Tutte le informazioni personali
          identificabili saranno rigorosamente protette e trattate conformemente
          alle leggi sulla privacy vigenti (Regolamento EU n. 679/2016 “GDPR” e
          Codice Privacy). Puoi esercitare i diritti previsti dagli artt. 15-22
          GDPR (accesso, revoca, rettifica, cancellazione, limitazione,
          opposizione, reclamo al Garante Privacy etc.) scrivendo al Titolare o
          al DPO ai contatti indicati.
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Start;
