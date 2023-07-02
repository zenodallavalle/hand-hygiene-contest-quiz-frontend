import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import { InlineIcon } from '@iconify/react';
import userCircle2 from '@iconify/icons-lucide/user-circle-2';
import creativeCommons from '@iconify/icons-lucide/creative-commons';

import AutoBlurButton from './AutoBlurButton';

import MM from '../assets/img/150px_linkedInMM.jpg';
import MEA from '../assets/img/150px_linkedInMEA.jpg';
import AA from '../assets/img/150px_linkedInAA.jpg';
import ZDV from '../assets/img/150px_linkedInZDV.jpg';
import SB from '../assets/img/150px_linkedInSB.jpg';

const ideator = {
  badge: 'primary',
  text: 'Ideazione',
};

const graphic = {
  badge: 'secondary',
  text: 'Grafica',
};

const programmer = {
  badge: 'info',
  text: 'Programmazione',
};

const people = [
  {
    name: 'Maria Elena Ales',
    roles: [ideator, graphic],
    url: {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/maria-elena-a-b38710ba/',
    },
    image: MEA,
  },
  {
    name: 'Antonio Antonelli',
    roles: [ideator],
    url: {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/antonio-antonelli/',
    },
    image: AA,
  },
  {
    name: 'Stefania Borlini',
    roles: [ideator],

    url: {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/stefania-borlini-75b90718a/',
    },
    image: SB,
  },
  {
    name: 'Zeno Dalla Valle',
    roles: [ideator, graphic, programmer],
    url: {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/zenodallavalle/',
    },
    image: ZDV,
  },
  {
    name: 'Matteo Moro',
    roles: [ideator],
    url: {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/matteo-moro-2194818b/',
    },
    image: MM,
  },
];

const Credits = ({ view = 'start', ...props }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: view === 'quiz' ? 1 : 1000,
        }}
        className='px-2 pb-3'
      >
        <AutoBlurButton
          size='sm'
          variant='light'
          onClick={() => setShowModal(true)}
          className='text-start px-1'
        >
          <small>
            {view === 'quiz' || window.innerWidth < 300 ? (
              <span className='me-1'>Crediti</span>
            ) : (
              <>
                <span className='me-1'>Un'idea di: M.E. Ales,</span>
                {window.innerWidth < 320 && <br />}
                <span className='me-1'>A. Antonelli,</span>
                {window.innerWidth >= 320 && window.innerWidth < 530 && <br />}
                <span className='me-1'>S. Borlini, Z. Dalla Valle,</span>
                {window.innerWidth < 320 && <br />}
                <span className='me-1'>M. Moro</span>
              </>
            )}
            <InlineIcon icon={creativeCommons} />
            {view !== 'quiz' && (
              <>
                <br />
                <span>Clicca qui per ulteriori informazioni</span>
              </>
            )}
          </small>
        </AutoBlurButton>
      </div>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Crediti</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListGroup className='mb-2'>
            {people.map(({ name, roles, url = null, image = null }) => (
              <ListGroup.Item key={`item_${name}`}>
                <div className='d-flex align-items-center'>
                  <div className='pe-2'>
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className='rounded-circle'
                        style={{ height: 48, maxHeight: 48 }}
                      />
                    ) : (
                      <InlineIcon icon={userCircle2} height={48} />
                    )}
                  </div>
                  <div>
                    <div>
                      <>
                        {name}{' '}
                        {url && (
                          <a
                            href={url?.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {url?.text}
                          </a>
                        )}
                      </>
                    </div>
                    <div>
                      {roles?.map(({ badge, text }) => (
                        <Badge
                          pill
                          key={`item_${name}_role${text}`}
                          bg={badge}
                          className='me-2'
                        >
                          {text}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div>
            <span>
              Codice disponibile su GitHub e distribuito con licenza Creative
              Commons.
            </span>
            <div>
              <div>
                <a
                  href='https://github.com/zenodallavalle/hand-hygiene-contest-quiz-frontend'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  hand-hygiene-contest-quiz-frontend
                </a>
              </div>

              <div>
                <a
                  href='https://github.com/zenodallavalle/hand-hygiene-contest-quiz-backend'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  hand-hygiene-contest-quiz-backend
                </a>
              </div>
            </div>
          </div>
          <div>
            {process.env.REACT_APP_NAME} versione{' '}
            <i>{process.env.REACT_APP_VERSION}</i>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Credits;
