import { shuffleArray } from './shuffle';

const round = (number, decimals = 4) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

let bacteriaLatestID = 1;

export const generateBacteria = (
  { numberOfInitialBacteria, ...options },
  caller = undefined
) => {
  const bacteria = [];

  for (let i = 0; i < numberOfInitialBacteria; i++) {
    const initialDirection = round(Math.random() * 360);
    bacteria.push({
      id: bacteriaLatestID++,
      source: bacteriaLatestID % 2,
      x: round(Math.random() * (100 - 0) + 0),
      y: round(Math.random() * (100 - 0) + 0),
      initialDirection,
      direction: initialDirection,
    });
  }

  return { bacteria, cycle: 0 };
};

const generateChange = (casualChangeMaxAngle, clockwise) =>
  round(
    Math.random() * (casualChangeMaxAngle - 0) -
      (clockwise ? casualChangeMaxAngle : 0)
  );

export const calculateBacteriaPositionForCycle = (
  cycle,
  bacteria,
  {
    casualChangeMaxAngle,
    casualDirectionChangePeriod,
    clockwiseChangePeriod,
    movePerCycle,
    inclinationAngle,
    inclinationPeriod,
    ...options
  }
) => {
  const updatedBacteria = bacteria.map((bacterium) => {
    let { x, y, direction, initialDirection } = bacterium;

    if (cycle % casualDirectionChangePeriod === 0) {
      const clockwise =
        cycle % clockwiseChangePeriod > clockwiseChangePeriod / 2;
      const change = generateChange(casualChangeMaxAngle, clockwise);
      initialDirection = initialDirection + change;
      direction = direction + change;
    }

    const correction = round(
      Math.cos((cycle / inclinationPeriod) * Math.PI * 2) * inclinationAngle
    );

    x =
      x +
      round(Math.cos((initialDirection + 90) * (Math.PI / 180)) * movePerCycle);
    if (x < -10) {
      x = 100;
    } else if (x > 100) {
      x = -10;
    }

    y =
      y +
      round(Math.sin((initialDirection + 90) * (Math.PI / 180)) * movePerCycle);

    if (y < -10) {
      y = 100;
    } else if (y > 100) {
      y = -10;
    }

    return {
      ...bacterium,
      x,
      y,
      direction: direction + correction,
      initialDirection,
    };
  });
  return { cycle, bacteria: updatedBacteria };
};

export const increaseBacteria = (
  cycle,
  bacteria,
  {
    casualChangeMaxAngle,
    clockwiseChangePeriod,
    increasePct,
    minIncreaseNumber,
    increaseDirectionAngleChange,
    ...options
  }
) => {
  if (!bacteria.length) {
    console.warn("bacteria's length may not be zero.");
    return bacteria;
  }

  if (bacteria.length >= options.maxNumberOfBacteria) {
    console.warn("bacteria's length already reached upper limit");
    return bacteria;
  }

  let numberOfBacteriaPlus = Math.max(
    round(bacteria.length * increasePct, 0),
    minIncreaseNumber
  );
  if (numberOfBacteriaPlus > options.maxNumberOfBacteria - bacteria.length) {
    console.warn("bacteria's length reached upper limit");
    numberOfBacteriaPlus = options.maxNumberOfBacteria - bacteria.length;
  }

  const shuffledBacteria = shuffleArray(bacteria);

  const updatedBacteria = [...bacteria];
  for (let i = 0; i < numberOfBacteriaPlus; i++) {
    const newBacterium = { ...shuffledBacteria[i], id: bacteriaLatestID++ };
    const clockwise = cycle % clockwiseChangePeriod > clockwiseChangePeriod / 2;

    const change =
      generateChange(casualChangeMaxAngle, clockwise) +
      increaseDirectionAngleChange * (clockwise ? 1 : -1);

    newBacterium.initialDirection = newBacterium.initialDirection + change;
    newBacterium.direction = newBacterium.direction + change;
    updatedBacteria.push(newBacterium);
  }

  return updatedBacteria;
};

export const removeBacteria = (bacteria, ids = []) =>
  bacteria.filter((bacterium) => !ids.includes(bacterium.id));

export const decreaseBacteria = (
  cycle,
  bacteria,
  { decreasePct, minDecreaseNumber, ...options }
) => {
  if (!bacteria.length) {
    console.warn("bacteria's length may not be zero.");
    return bacteria;
  }

  let numberOfBacteriaMinus = Math.max(
    round(bacteria.length * decreasePct, 0),
    minDecreaseNumber
  );

  return shuffleArray(bacteria).map((b, id) =>
    id < numberOfBacteriaMinus ? { ...b, isExploding: true } : b
  );
};
