import AutoBlurButton from './AutoBlurButton';

import PosterSrc from '../assets/img/poster.png';

const Poster = ({ onHide, ...props }) => {
  return (
    <div>
      <AutoBlurButton className='w-100' onClick={onHide}>
        Torna al quiz
      </AutoBlurButton>
      <img src={PosterSrc} alt='poster' width={'100%'} />
    </div>
  );
};

export default Poster;
