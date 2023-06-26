import BacteriumSVG1 from '../assets/img/bacterium.svg';
import BacteriumSVG2 from '../assets/img/bacterium2.svg';

import ConfettiExplosion from 'react-confetti-explosion';

const DIR_OFFSET = -45 + 180;

const Bacterium = ({ bacterium, options = {}, ...props }) => {
  return bacterium.isExploding ? (
    <ConfettiExplosion
      {...(options.explosionOptions || {})}
      colors={
        bacterium?.source === 1
          ? options.explosionColors1
          : options.explosionColors2
      }
      style={{
        position: 'absolute',
        left: `${bacterium?.x}%`,
        top: `${bacterium?.y}%`,
      }}
    />
  ) : (
    <img
      src={bacterium?.source === 1 ? BacteriumSVG1 : BacteriumSVG2}
      alt=''
      style={{
        position: 'absolute',
        left: `${bacterium?.x}%`,
        top: `${bacterium?.y}%`,
        rotate: `${bacterium?.direction + DIR_OFFSET}deg`,
        width: '8%',
        height: '8%',
        maxWidth: '8%',
        maxHeight: '8%',
        overflow: 'hidden',
      }}
      className=' w-100 h-100'
    />
  );
};

export default Bacterium;
