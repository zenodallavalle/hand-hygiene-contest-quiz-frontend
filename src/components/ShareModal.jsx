import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { InlineIcon } from '@iconify/react';
import checkIcon from '@iconify/icons-lucide/check';
import AutoBlurButton from './AutoBlurButton';

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const ShareModal = ({ show, onHide, evaluationTexts, startId }) => {
  const [badge] = evaluationTexts;
  const url = new URL(process.env.REACT_APP_SHARE_URL || window.location.href);
  url.hash = startId ? `#${startId}` : '#s';

  const [copied, setCopied] = useState(false);
  const title = `Ho ottenuto il badge di ${badge.toLowerCase()} al quiz di igiene delle mani. E tu?`;
  useEffect(() => {
    setCopied(false);
  }, [show]);
  return (
    <Modal show={show} onHide={onHide} centered backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Condividi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='mb-2'>
          <p className='text-small'>Condvidi il tuo risultato sui social!</p>
          <div className='d-flex justify-content-center'>
            <WhatsappShareButton
              url={url}
              title={title}
              separator={decodeURI('%0a%0a')}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={url} title={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
        <div className='mb-2'>
          <p className='text-small'>
            Oppure copia il link e mandalo a chi vuoi!
          </p>
          <div className='input-group'>
            <Form.Control
              size='sm'
              onFocus={(e) => {
                if (window.isSecureContext) {
                  setCopied(true);
                  navigator.clipboard.writeText(url);
                }
              }}
              type='text'
              value={url}
              readOnly
              onClick={(e) => e.target.select()}
            />
            {window.isSecureContext && (
              <AutoBlurButton
                size='sm'
                className='border'
                variant={copied ? 'outline-secondary' : 'secondary'}
                onClick={() => {
                  setCopied(true);
                  window.isSecureContext && navigator.clipboard.writeText(url);
                }}
              >
                {copied ? (
                  <span>
                    <InlineIcon icon={checkIcon} />
                    <span className='ms-1'>copiato!</span>
                  </span>
                ) : (
                  'Copia!'
                )}
              </AutoBlurButton>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
