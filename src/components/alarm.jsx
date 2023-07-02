import { useState, forwardRef } from 'react';
import alert from '../assets/alarm.m4a';

const Alarm = forwardRef(function Alarm(_, ref) {
  const [mute, toggleMute] = useState(false);
  return (
    <div
      className='cursor-pointer w-fit mx-auto relative top-6'
      onClick={() => {
        toggleMute(!mute);
      }}
    >
      {!mute ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1.5rem'
          viewBox='0 0 448 512'
          className='animate-shake'
        >
          <path
            className='fill-gray-300 '
            d='M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1.5em'
          viewBox='0 0 640 512'
        >
          <path
            className='fill-red-600'
            d='M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-87.5-68.6c.5-1.7 .7-3.5 .7-5.4c0-27.6-11-54.1-30.5-73.7L512 320c-20.5-20.5-32-48.3-32-77.3V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V51.2c-42.6 8.6-79 34.2-102 69.3L38.8 5.1zM160 242.7c0 29-11.5 56.8-32 77.3l-1.5 1.5C107 341 96 367.5 96 395.2c0 11.5 9.3 20.8 20.8 20.8H406.2L160 222.1v20.7zM384 448H320 256c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z'
          />
        </svg>
      )}
      <audio ref={ref} src={alert} muted={mute}></audio>
    </div>
  );
});

export default Alarm;
