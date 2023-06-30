import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import AutoBlurButton from './AutoBlurButton';

import capitalize from '../capitalize';
import { useCollectAnswer, useCollectResult } from '../api';
import { shuffleAnswers } from '../shuffle';

const getVariantForBtn = (optionId, selectedAnswer, correctAnswer) => {
  if (!selectedAnswer) return 'dark';
  if (selectedAnswer === optionId) {
    if (optionId === correctAnswer) return 'success';
    else return 'danger';
  }
  if (optionId === correctAnswer) return 'success';
  return 'dark';
};

const Quiz = ({
  quizUID,
  nickname,
  questionIndex = 0,
  setQuestionIndex,
  marks = -1,
  setMarks,
  job,
  onWrongAnswer = () => {},
  onRightAnswer = () => {},
  onFinished = () => {},
  bacteriaOptions,
  quizs,
  ...props
}) => {
  const {
    id: questionId,
    question,
    explaination,
    options: unshuffledOptions,
    answer,
  } = questionIndex < quizs.length ? quizs[questionIndex] : {};

  const [isAnimating, setIsAnimating] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [shuffledOptions, setShuffledOptions] = useState([]);

  const { collectAnswer } = useCollectAnswer();
  const { collectResult } = useCollectResult();

  // updated shuffledOptions when questionIndex changes
  useEffect(() => {
    setShuffledOptions(shuffleAnswers(unshuffledOptions));
  }, [unshuffledOptions, questionIndex]);

  const onSelectOption = (id, text) => {
    if (selectedAnswer) return;
    setSelectedAnswer(id);
    collectAnswer(quizUID, nickname, job, questionId, id, question, text);

    // update Marks
    if (id === answer) setMarks(marks + 1);

    // trigger side effects
    if (id !== answer) onWrongAnswer();
    else onRightAnswer();

    // trigger animation
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, bacteriaOptions.explosionDelay + bacteriaOptions.explosionOptions.duration);

    // collect results
    if (questionIndex + 1 >= quizs.length) {
      collectResult(quizUID, nickname, job, id === answer ? marks + 1 : marks);
    }
  };

  const onNextQuestion = () => {
    if (!selectedAnswer) return;

    setQuestionIndex(questionIndex + 1);
    setSelectedAnswer(null);

    // trigger side effects
    if (questionIndex + 1 >= quizs.length) onFinished();
  };

  const backgroundColorStyle = {
    backgroundColor: isAnimating
      ? 'rgba(59, 59, 59, 0.25)'
      : 'rgba(59, 59, 59, 0.9)',
  };

  const opacityStyle = { opacity: isAnimating ? '25%' : '100%' };

  return (
    <Container className='container-padding-top'>
      <div className='row justify-content-center pb-2'>
        <div className='col-lg-8'>
          <div
            className='card p-4 transition-bg'
            style={{
              ...backgroundColorStyle,
              borderColor: '#646464',
            }}
          >
            <div className='d-flex justify-content-between'>
              <h5
                className='w-100 transition-opacity'
                style={{
                  ...opacityStyle,
                  color: '#60d600',
                  textAlign: 'right',
                }}
              >
                {questionIndex + 1} / {quizs.length}
              </h5>
            </div>
            <h5
              className='mb-2 fs-normal lh-base text-light fw-bold transition-opacity'
              style={opacityStyle}
            >
              {capitalize(question)}
            </h5>
            <div>
              {shuffledOptions?.map(([id, option]) => (
                <AutoBlurButton
                  style={opacityStyle}
                  key={`q_${questionId}_o_${id}`}
                  variant={getVariantForBtn(id, selectedAnswer, answer)}
                  className='option w-100 text-start text-light py-2 px-3 mt-3 rounded transition-opacity'
                  onClick={() => onSelectOption(id, option)}
                  disabled={!!selectedAnswer}
                >
                  {capitalize(option)}
                </AutoBlurButton>
              ))}
            </div>

            <AutoBlurButton
              style={opacityStyle}
              className='py-2 w-100 mt-3 text-light fw-bold transition-opacity'
              onClick={onNextQuestion}
              disabled={isAnimating || !selectedAnswer}
            >
              {questionIndex + 1 < quizs.length
                ? 'Prossima domanda'
                : 'Vedi risultati'}
            </AutoBlurButton>

            {!!selectedAnswer && explaination && (
              <div
                style={opacityStyle}
                className='bg-success border mt-3 border-primary border-success  border-1 rounded transition-opacity'
              >
                <div className='text-light text-start p-1'>{explaination}</div>
              </div>
            )}
          </div>
          <div className='mb-3 mt-1' style={{ height: 70 }} />
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
