import { useEffect, useState } from 'react';

import AutoBlurButton from './AutoBlurButton';

import capitalize from '../capitalize';
import { quizs } from '../source';
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
  nickname,
  questionIndex = 0,
  setQuestionIndex,
  marks = -1,
  setMarks,
  onWrongAnswer = () => {},
  onRightAnswer = () => {},
  onFinished = () => {},
  ...props
}) => {
  const {
    id: questionId,
    question,
    options: unshuffledOptions,
    answer,
  } = questionIndex < quizs.length ? quizs[questionIndex] : {};
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
    collectAnswer(nickname, questionId, id, question, text);

    // update Marks
    if (id === answer) setMarks(marks + 1);

    // trigger side effects
    if (id !== answer) onWrongAnswer();
    else onRightAnswer();

    if (questionIndex + 1 >= quizs.length) {
      collectResult(nickname, id === answer ? marks + 1 : marks);
    }
  };

  const onNextQuestion = () => {
    if (!selectedAnswer) return;
    setQuestionIndex(questionIndex + 1);
    setSelectedAnswer(null);

    // trigger side effects
    if (questionIndex + 1 >= quizs.length) onFinished();
  };

  return (
    <div className='container'>
      <div className='row vh-100 align-items-center justify-content-center'>
        <div className='col-lg-8'>
          <div
            className='card p-4'
            style={{ background: '#3d3d3d', borderColor: '#646464' }}
          >
            <div className='d-flex justify-content-between'>
              <h5
                className='w-100'
                style={{
                  color: '#60d600',
                  textAlign: 'right',
                }}
              >
                {questionId} / {quizs.length}
              </h5>
            </div>
            <h5 className='mb-2 fs-normal lh-base text-light fw-bold'>
              {capitalize(question)}
            </h5>
            <div>
              {shuffledOptions?.map(([id, option]) => (
                <AutoBlurButton
                  key={`q_${questionId}_o_${id}`}
                  variant={getVariantForBtn(id, selectedAnswer, answer)}
                  className='option w-100 text-start text-white py-2 px-3 mt-3 rounded'
                  onClick={() => onSelectOption(id, option)}
                  disabled={!!selectedAnswer}
                >
                  {capitalize(option)}
                </AutoBlurButton>
              ))}
            </div>

            <AutoBlurButton
              className='py-2 w-100 mt-3 text-light fw-bold'
              onClick={onNextQuestion}
              disabled={!selectedAnswer}
            >
              {questionIndex + 1 < quizs.length
                ? 'Next Question'
                : 'Show Result'}
            </AutoBlurButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
