import { useEffect, useMemo, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import useSound from 'use-sound';
import { v4 as uuidv4 } from 'uuid';

import { InlineIcon } from '@iconify/react';
import volumeX from '@iconify/icons-lucide/volume-x';
import volume2 from '@iconify/icons-lucide/volume-2';

import Bacterium from './components/Bacterium';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';

import {
  selectQuizForJobAndNickname,
  selectEvalutationForJobAndNickname,
} from './source';
import {
  calculateBacteriaPositionForCycle,
  generateBacteria,
  increaseBacteria,
  decreaseBacteria,
} from './bacteriumFns';

import './App.css';
import AutoBlurButton from './components/AutoBlurButton';

// Audio assets
import finished from './assets/sounds/finished.mp3';
import laserGun from './assets/sounds/laserGun.mp3';
import insectNoise from './assets/sounds/insectNoise.mp3';

import { bacteriaOptions } from './bacteriaOptions';
import ShareModal from './components/ShareModal';
import Credits from './components/Credits';
import Poster from './components/Poster';

const initialSetOfBacteria = generateBacteria(bacteriaOptions);

// App Fn
function App() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [marks, setMarks] = useState(0);
  const [quizUID, setQuizUID] = useState(uuidv4());
  const [nickname, setNickname] = useState(
    localStorage.getItem('nickname') || ''
  );
  const [job, setJob] = useState(0);

  const onShowPoster = () => {
    setShowPoster(true);
  };
  const onHidePoster = () => {
    setShowPoster(false);
  };

  useEffect(() => {
    if (localStorage.getItem('nickname') !== nickname) {
      localStorage.setItem('nickname', nickname);
    }
  }, [nickname]);

  // Bacteria
  const [bacteria, setBacteria] = useState(initialSetOfBacteria);

  useEffect(() => {
    const timeoutReference = setTimeout(() => {
      setBacteria(
        calculateBacteriaPositionForCycle(
          bacteria.cycle + 1,
          bacteria.bacteria,
          bacteriaOptions
        )
      );
    }, bacteriaOptions.refreshTimeout);
    return () => {
      clearTimeout(timeoutReference);
    };
  }, [bacteria]);

  // Audio
  const [audio, setAudio] = useState(!localStorage.getItem('disableAudio'));

  useEffect(() => {
    if (!audio) {
      localStorage.setItem('disableAudio', 'true');
    } else {
      localStorage.removeItem('disableAudio');
    }
  }, [audio]);

  const [playFinished] = useSound(finished, { interrupt: true });
  const [playLaserGun] = useSound(laserGun, { interrupt: true });
  const [playInsectNoise] = useSound(insectNoise, {
    // playbackRate: Math.pow(1.1, questionIndex - marks - 1),
    interrupt: true,
  });

  // Handlers for Quiz
  const onWrongAnswer = () => {
    if (audio)
      setTimeout(
        () => playInsectNoise(),
        // bacteriaOptions.increasingDuration / 2 + // half because the division occurs in the middle of the animation
        bacteriaOptions.increasingHighligthFadeInDuration +
          bacteriaOptions.increasingSoundMsDelay
      );
    const updatedBacteria = increaseBacteria(
      bacteria.cycle,
      bacteria.bacteria,
      bacteriaOptions
    );

    setBacteria({
      cycle: bacteria.cycle,
      bacteria: updatedBacteria,
    });
  };

  const onRightAnswer = () => {
    if (audio)
      setTimeout(
        () => playLaserGun(),
        bacteriaOptions.explosionDelay + bacteriaOptions.explosionSoundMsDelay
      );
    const updatedBacteria = decreaseBacteria(
      bacteria.cycle,
      bacteria.bacteria,
      bacteriaOptions
    );

    setBacteria({
      cycle: bacteria.cycle,
      bacteria: updatedBacteria,
    });
  };

  const onFinished = () => {
    if (audio) playFinished();
  };

  const onStartOver = () => {
    setBacteria(generateBacteria(bacteriaOptions));
    setQuestionIndex(-1);
    setMarks(0);
    setQuizUID(uuidv4());
    setJob(0);
  };

  // quiz
  const quizs = useMemo(
    () => selectQuizForJobAndNickname(job, nickname),
    [job, nickname]
  );

  // evaluation
  const evaluationTexts = useMemo(
    () => selectEvalutationForJobAndNickname(job, nickname)(marks),
    [job, nickname, marks]
  );

  //hadle Referrers
  const [startId, setStartId] = useState(null);

  const referrerFromFragment = useMemo(
    () => window.location.hash.replace('#', '') || null,
    []
  );
  const referrerFromParams = useMemo(
    () => new URLSearchParams(window.location.search).get('r'),
    []
  );

  useEffect(() => {
    const newURL = new URL(window.location.href.replace(/#.*/, ''));
    if (referrerFromFragment) {
      window.location.hash = '';
    }
    if (referrerFromParams) {
      newURL.searchParams.delete('r');
    }
    if (referrerFromFragment || referrerFromParams) {
      window.history.replaceState({}, document.title, newURL.toString());
    }
  }, [referrerFromFragment, referrerFromParams]);

  const referrer = referrerFromFragment || referrerFromParams;

  // view

  const view =
    questionIndex === -1
      ? 'start'
      : questionIndex < quizs.length
      ? 'quiz'
      : 'result';

  if (showPoster) return <Poster onHide={onHidePoster} />;
  return (
    <div>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
        useEnterprise
      >
        <div
          className='bg-dark text-light w-100 h-100 d-flex justify-content-center'
          style={{ position: 'absolute' }}
        >
          <div>
            {questionIndex < quizs.length &&
              bacteria.bacteria?.map(({ ...bacterium }) => (
                <Bacterium
                  key={`bacterium_${bacterium.id}`}
                  cycle={bacteria.cycle}
                  bacterium={bacterium}
                  options={bacteriaOptions}
                />
              ))}
          </div>

          <div style={{ position: 'absolute', zIndex: 1000, left: 0, top: 0 }}>
            <AutoBlurButton
              style={{ zIndex: 100 }}
              size='lg'
              className='p-2'
              onClick={() => setAudio(!audio)}
              variant='dark'
            >
              <InlineIcon
                className='text-light fw-bold'
                icon={audio ? volume2 : volumeX}
              />
            </AutoBlurButton>
          </div>

          <div
            className='text-center justify-content-center d-flex w-100'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: view === 'quiz' ? 74 : 108,
              overflowY: 'auto',
              zIndex: 2,
            }}
          >
            {view === 'start' ? (
              <Start
                quizUID={quizUID}
                nickname={nickname}
                setNickname={setNickname}
                job={job}
                setJob={setJob}
                setQuestionIndex={setQuestionIndex}
                setMarks={setMarks}
                setStartId={setStartId}
                referrer={referrer}
              />
            ) : view === 'quiz' ? (
              <Quiz
                quizUID={quizUID}
                job={job}
                nickname={nickname}
                setNickname={setNickname}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                marks={marks}
                setMarks={setMarks}
                onWrongAnswer={onWrongAnswer}
                onRightAnswer={onRightAnswer}
                bacteriaOptions={bacteriaOptions}
                quizs={quizs}
                onFinished={onFinished}
              />
            ) : (
              <Result
                marks={marks}
                quizs={quizs}
                evaluationTexts={evaluationTexts}
                onStartOver={onStartOver}
                onShare={() => setShowShareModal(true)}
                onShowPoster={onShowPoster}
              />
            )}
          </div>
        </div>
        <ShareModal
          show={showShareModal}
          onHide={() => setShowShareModal(false)}
          evaluationTexts={evaluationTexts}
          startId={startId}
        />
        <Credits view={view} />
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
