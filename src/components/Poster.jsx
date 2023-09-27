import AutoBlurButton from './AutoBlurButton';

import PosterSrc from '../assets/img/poster.png';
import PosterPdfSrc from '../assets/pdf/poster.pdf';

const Poster = ({ onHide, ...props }) => {
  return (
    <div className='text-center' style={{ maxWidth: 800 }}>
      <AutoBlurButton className='w-100' onClick={onHide}>
        Torna al quiz
      </AutoBlurButton>
      {/* <AutoBlurButton className='w-100' onClick={(e) => e.preventDefault()}>
        
      </AutoBlurButton> */}
      <div className='text-light bg-dark py-2'>
        <a className='text-light' href={PosterPdfSrc} download>
          Clicca qui per scaricare il PDF
        </a>
      </div>
      <img src={PosterSrc} alt='poster' class='w-100' />
    </div>
  );
};

export default Poster;
