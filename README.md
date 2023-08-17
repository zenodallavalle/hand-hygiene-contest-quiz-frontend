# Hand-Hygiene-Contest-Quiz-Frontend

- [Hand-Hygiene-Contest-Quiz-Frontend](#hand-hygiene-contest-quiz-frontend)
  - [Introduction](#introduction)
  - [Setup](#setup)
  - [Build](#build)
  - [License](#license)
  - [Live](#live)

## Introduction

This repository contains the code for the frontend of the Hand Hygiene Contest Quiz. The frontend is written in React and uses the bootstrap and react-bootstrap libraries for styling.

Data of the quiz is hard-coded in the frontend in `src/source.js` as well as evaluation logic.

The frontend communicates with the backend via a REST API. The backend is available on GitHub aswell at [https://github.com/zenodallavalle/hand-hygiene-contest-quiz-backend](this link).

## Setup

The following steps are required to run the frontend locally (node.js and yarn are required):

1.  Clone the repository
2.  Install dependencies: `yarn`
3.  Edit the .env files in the root directory and remove the `.example` extension
4.  Run the frontend: `yarn start`

## Build

1. Clone the repository
2. Install dependencies: `yarn`
3. Edit the .env files in the root directory and remove the `.example` extension
4. Build the frontend: `yarn build` (the build will be available in the `building` directory)

## License

This project is licensed under the CC BY-NC-SA 4.0 License - see the [LICENSE](LICENSE) file for details.

## Live

The whole application is run [HERE](https://web.zenodallavalle.com/quiz/?r=gh).
