import { useState } from 'react';
import Form from 'react-bootstrap/Form';

import AutoBlurButton from './AutoBlurButton';

import { useCollectStart } from '../api';

const Start = ({ nickname, setNickname, setQuestionIndex, setMarks }) => {
  const [clicked, setCliked] = useState(false);

  const onStartQuiz = () => {
    if (!nickname.trim()) return setCliked(true);
    collectStart(nickname.trim());
    setQuestionIndex(0);
    setMarks(0);
  };

  const { collectStart } = useCollectStart();

  return (
    <div className='container'>
      <div className='row vh-100 align-items-center justify-content-center'>
        <div className='col-lg-8 bg-dark p-2'>
          <h1 className='fw-bold mb-2'>Igiene delle mani</h1>
          <h5 className='mb-4 fw-bold'>
            Ottieni ora il tuo badge animale unico!
          </h5>
          <Form.Control
            nickname={nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Nickname'
          />
          {clicked && (
            <div className='mt-1 text-center text-danger'>
              Inserire un nickname valido!
            </div>
          )}
          {nickname.trim().length >= 100 && (
            <div className='mt-1 text-center text-danger'>
              Il nickname deve avere meno di 100 caratteri!
            </div>
          )}
          <div className='mb-3' />
          <p className='fst-italic small'>
            Cliccando Inizia ora accetti che il tuo Nickname, il tuo indirizzo
            IP e le risposte date vengano salvate sul nostro server per indagini
            statistiche anonime sull'igiene delle mani.
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
    </div>
  );
};

export default Start;
