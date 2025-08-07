import { TypeAnimation } from 'react-type-animation';

const TypingEffect = () => {
  return (
    <div className="text-center ">
      <TypeAnimation
        sequence={[
          'Welcome to WorldNumHub...',
          2000,
          'GLOBAL NUMBERS, GLOBAL PRESENCE',
          2000,
        ]}
        wrapper="h1"
        speed={50}
        repeat={Infinity}
        style={{ color: '#e6ac00', }}
        className='font-bold text-[1rem] md:text-2xl mb-4 md:items-center md:text-start text-center items-center md:ml-15'
      />
    </div>
  );
};

export default TypingEffect;
