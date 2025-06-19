import { TypeAnimation } from 'react-type-animation';

const TypingEffect = () => {
  return (
    <div className="text-center">
      <TypeAnimation
        sequence={[
          'Welcome to basedsms...',
          2000,
          ' Your number one virtual number provider',
          2000,
        ]}
        wrapper="p"
        speed={50}
        repeat={Infinity}
        style={{ color: '#FF6908', textAlign:'start' }}
        className='font-bold text-[1.6rem] md:text-2xl mb-4 '
      />
    </div>
  );
};

export default TypingEffect;
