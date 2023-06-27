import { useEffect, useState } from 'react';
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

import { quizs } from './source';
import {
  calculateBacteriaPositionForCycle,
  generateBacteria,
  increaseBacteria,
  decreaseBacteria,
  removeBacteria,
} from './bacteriumFns';

import './App.css';
import AutoBlurButton from './components/AutoBlurButton';

// Audio assets
import finished from './assets/sounds/finished.mp3';
import flameThrower from './assets/sounds/flameThrower.mp3';
import poppin from './assets/sounds/poppin.mp3';

const bacteriaOptions = {
  numberOfInitialBacteria: 50,
  refreshTimeout: 33, //ms --> 1000/33 = 30fps
  movePerSecond: 10,
  inclinationPeriodMs: 500, // ms
  inclinationAngle: 2.5,
  casualChangeMaxAngle: 10,
  directionChangeInterval: 800, //ms
  clockwiseChangeInterval: 15000, //ms
  increasePct: 0.2, // add 25% more bacteria when a wrong answer is given
  minIncreaseNumber: 3,
  maxNumberOfBacteria: 258,
  increaseDirectionAngleChange: 30, // angle delta when bacterium is duplicated
  decreasePct: 0.25,
  minDecreaseNumber: 3,
  explosionOptions: {
    force: 0.2,
    duration: 1600,
    particleCount: 5,
    width: 250,
  },
  explosionColors1: [
    '#FF7226',
    '#FF9E46',
    '#FFD15D',
    '#F56E92',
    '#F23E6D',
    '#BD0D38',
  ],
  explosionColors2: [
    '#039BE5',
    '#26C6DA',
    '#9CCC65',
    '#4CAF50',
    '#FFB300',
    '#1B5E20',
  ],
};

// Derived options
bacteriaOptions.casualDirectionChangePeriod =
  bacteriaOptions.directionChangeInterval / bacteriaOptions.refreshTimeout; // cycles
bacteriaOptions.clockwiseChangePeriod =
  bacteriaOptions.clockwiseChangeInterval / bacteriaOptions.refreshTimeout; // cycles,
bacteriaOptions.movePerCycle =
  (bacteriaOptions.movePerSecond * bacteriaOptions.refreshTimeout) / 1000;
bacteriaOptions.inclinationPeriod =
  bacteriaOptions.inclinationPeriodMs / bacteriaOptions.refreshTimeout; // in cycles

const initialSetOfBacteria = generateBacteria(bacteriaOptions);

// App Fn
function App() {
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [marks, setMarks] = useState(0);
  const [quizUID, setQuizUID] = useState(uuidv4());
  const [nickname, setNickname] = useState(
    localStorage.getItem('nickname') || ''
  );

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
  const [audio, setAudio] = useState(true);
  const [playFinished] = useSound(finished, { interrupt: true });
  const [playFlameThrower] = useSound(flameThrower, { interrupt: true });
  const [playPoppin] = useSound(poppin, {
    playbackRate: Math.pow(1.1, questionIndex - marks - 1),
    interrupt: true,
  });

  // Handlers for Quiz
  const onWrongAnswer = () => {
    if (audio) playPoppin();
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
    if (audio) playFlameThrower();
    const updatedBacteria = decreaseBacteria(
      bacteria.cycle,
      bacteria.bacteria,
      bacteriaOptions
    );

    setBacteria({
      cycle: bacteria.cycle,
      bacteria: updatedBacteria,
    });

    setTimeout(() => {
      setBacteria((bacteria) => ({
        cycle: bacteria.cycle,
        bacteria: removeBacteria(
          bacteria.bacteria,
          updatedBacteria.filter((b) => b.isExploding).map(({ id }) => id)
        ),
      }));
    }, bacteriaOptions.explosionOptions.duration);
  };

  const onFinished = () => {
    if (audio) playFinished();
  };

  const onStartOver = () => {
    setBacteria(generateBacteria(bacteriaOptions));
    setQuestionIndex(-1);
    setMarks(0);
    setQuizUID(uuidv4());
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
      useEnterprise
    >
      <section
        className='bg-dark text-white w-100 h-100'
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        <div>
          {questionIndex < quizs.length &&
            bacteria.bacteria?.map(({ ...bacterium }) => (
              <Bacterium
                key={`bacterium_${bacterium.id}`}
                bacterium={bacterium}
                options={bacteriaOptions}
              />
            ))}
        </div>

        <div style={{ position: 'absolute', zIndex: 100, left: 0, top: 0 }}>
          <AutoBlurButton
            style={{ zIndex: 100 }}
            size='lg'
            className='p-2'
            onClick={() => setAudio(!audio)}
            variant='dark'
          >
            <InlineIcon
              className='text-light fw-bold'
              icon={audio ? volumeX : volume2}
            />
          </AutoBlurButton>
        </div>

        <section
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            overflowY: 'scroll',
          }}
          className='text-center w-100'
        >
          {questionIndex === -1 ? (
            <Start
              quizUID={quizUID}
              nickname={nickname}
              setNickname={setNickname}
              setQuestionIndex={setQuestionIndex}
              setMarks={setMarks}
            />
          ) : questionIndex < quizs.length ? (
            <Quiz
              quizUID={quizUID}
              nickname={nickname}
              setNickname={setNickname}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              marks={marks}
              setMarks={setMarks}
              onWrongAnswer={onWrongAnswer}
              onRightAnswer={onRightAnswer}
              onFinished={onFinished}
            />
          ) : (
            <Result marks={marks} onStartOver={onStartOver} />
          )}
        </section>
      </section>
    </GoogleReCaptchaProvider>
  );
}

export default App;
