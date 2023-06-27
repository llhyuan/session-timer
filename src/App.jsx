import { useReducer, useState } from 'react';
import reducer, { initialTimer } from './reducer/reducer';
import Input from './reducer/components/Input';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [timerStatus, setTimerStatus] = useState('initial');
  const [timer, dispatch] = useReducer(reducer, initialTimer);
  const [intervalId, setIntervalId] = useState(null);
  const intervalParameter = useRef(0);
  const [realtime, setRealtime] = useState({
    hour: '00',
    minute: '00',
    midday: 'AM',
  });

  useEffect(() => {
    const timeoutId = setInterval(() => {
      const today = new Date();
      let hour = today.getHours();
      let minute = today.getMinutes();
      let midday = 'AM';

      if (hour >= 12) {
        hour = hour === 12 ? hour + '' : '0' + (hour - 12);
        midday = 'PM';
      } else if (hour < 10) {
        hour = '0' + hour;
      }

      if (minute < 10) {
        minute = '0' + String(minute);
      } else {
        minute = minute + '';
      }

      setRealtime({
        hour: hour,
        minute: minute,
        midday: midday,
      });
    }, 1000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (
      timerStatus !== 'initial' &&
      intervalParameter.current.inSession !== timer.inSession
    ) {
      alert(timer.inSession ? 'Start a session.' : 'Time for a break.');
    }
    intervalParameter.current = timer;
  }, [timer, timerStatus]);

  function handleClickPlay() {
    setTimerStatus('play');
    if (!intervalId) {
      let intervalid = setInterval(() => {
        let timer = intervalParameter.current;
        let displayedTime = timer.inSession
          ? timer.sessionRemain
          : timer.breakRemain;
        let totalSeconds = displayedTime[0] * 60 + displayedTime[1] - 1;

        dispatch({
          type: 'countdown',
          source: 'countdown',
          timeRemain: totalSeconds,
        });
      }, 1000);
      setIntervalId(intervalid);
    }
  }

  function handleClickPause() {
    setTimerStatus('pause');
    clearInterval(intervalId);
    setIntervalId(null);
  }

  function handleClickReset() {
    setTimerStatus('initial');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    dispatch({
      source: 'reset',
      type: 'reset',
    });
  }

  return (
    <div className='min-h-[100vh] w-full bg-gray-400 flex justify-center items-center'>
      <div className='border-solid border-[0.5rem] border-[#363130] rounded-3xl p-8 bg-[#DEE7EA]'>
        <div className='bg-[#363130] w-[70vw] max-w-[700px] min-w-[400px] rounded-2xl text-orange-600'>
          <div className='font-mono p-3 max-w-[850px]'>
            <div className='flex items-center selection:bg-[#DEE7EA] selection:text-[#363130]'>
              <p className='text-gray-300 text-[1.8rem]'>
                {realtime.hour}
                <span className='animate-blink'>:</span>
                {realtime.minute}
                <span className='mx-2'>{realtime.midday}</span>
              </p>
              {timer.inSession ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1.5em'
                  viewBox='0 0 320 512'
                  className={
                    'mx-auto ' +
                    (timerStatus === 'play' ? 'fill-lime-300' : 'fill-lime-700')
                  }
                >
                  <path d='M99.1 105.4C79 114 68.2 127.2 65.2 144.8c-2.4 14.1-.7 23.2 2 29.4c2.8 6.3 7.9 12.4 16.7 18.6c19.2 13.4 48.3 22.1 84.9 32.5c1 .3 1.9 .6 2.9 .8c32.7 9.3 72 20.6 100.9 40.7c15.7 10.9 29.9 25.5 38.6 45.1c8.8 19.8 10.8 42 6.6 66.3c-7.3 42.5-35.3 71.7-71.8 87.3c-35.4 15.2-79.1 17.9-123.7 10.9l-.2 0 0 0c-24-3.9-62.7-17.1-87.6-25.6c-4.8-1.7-9.2-3.1-12.8-4.3C5.1 440.8-3.9 422.7 1.6 405.9s23.7-25.8 40.5-20.3c4.9 1.6 10.2 3.4 15.9 5.4c25.4 8.6 56.4 19.2 74.4 22.1c36.8 5.7 67.5 2.5 88.5-6.5c20.1-8.6 30.8-21.8 33.9-39.4c2.4-14.1 .7-23.2-2-29.4c-2.8-6.3-7.9-12.4-16.7-18.6c-19.2-13.4-48.3-22.1-84.9-32.5c-1-.3-1.9-.6-2.9-.8c-32.7-9.3-72-20.6-100.9-40.7c-15.7-10.9-29.9-25.5-38.6-45.1c-8.8-19.8-10.8-42-6.6-66.3l31.5 5.5L2.1 133.9C9.4 91.4 37.4 62.2 73.9 46.6c35.4-15.2 79.1-17.9 123.7-10.9c13 2 52.4 9.6 66.6 13.4c17.1 4.5 27.2 22.1 22.7 39.2s-22.1 27.2-39.2 22.7c-11.2-3-48.1-10.2-60.1-12l4.9-31.5-4.9 31.5c-36.9-5.8-67.5-2.5-88.6 6.5z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1.5em'
                  viewBox='0 0 320 512'
                  className={
                    'mx-auto ' +
                    (timerStatus === 'play' ? 'fill-lime-300' : 'fill-lime-700')
                  }
                >
                  <path d='M64 32C28.7 32 0 60.7 0 96V288 448c0 17.7 14.3 32 32 32s32-14.3 32-32V320h95.3L261.8 466.4c10.1 14.5 30.1 18 44.6 7.9s18-30.1 7.9-44.6L230.1 309.5C282.8 288.1 320 236.4 320 176c0-79.5-64.5-144-144-144H64zM176 256H64V96H176c44.2 0 80 35.8 80 80s-35.8 80-80 80z' />
                </svg>
              )}
              <div onClick={handleClickPlay}>
                <svg
                  id='play'
                  xmlns='http://www.w3.org/2000/svg'
                  height='1.5em'
                  viewBox='0 0 384 512'
                  className={
                    'mr-8 hover:fill-green-300 ' +
                    (timerStatus === 'play'
                      ? 'fill-green-300'
                      : 'fill-gray-500')
                  }
                >
                  <path d='M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z' />
                </svg>
              </div>
              <div onClick={handleClickPause}>
                <svg
                  id='pause'
                  xmlns='http://www.w3.org/2000/svg'
                  height='1.5em'
                  viewBox='0 0 320 512'
                  className={
                    'mr-8 fill-gray-500 hover:fill-green-300 ' +
                    (timerStatus === 'pause'
                      ? 'fill-green-300'
                      : 'fill-gray-500')
                  }
                >
                  <path d='M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z' />
                </svg>
              </div>
              <div onClick={handleClickReset}>
                <svg
                  id='reset'
                  xmlns='http://www.w3.org/2000/svg'
                  height='1.5em'
                  viewBox='0 0 512 512'
                  className='mr-4 fill-gray-500 transition-all ease-in duration-100 hover:fill-gray-300 hover:rotate-[-40deg]'
                >
                  <path d='M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z' />
                </svg>
              </div>
            </div>
            <div
              id='timer-left'
              className='time-remain text-[6rem] w-fit mx-auto selection:bg-orange-600 selection:text-[#363130]'
            >
              {timer.inSession
                ? displayTime(timer.sessionRemain)
                : displayTime(timer.breakRemain)}
            </div>
            <div className='text-[1.5rem]'>
              <Input label={'Break Length:'} dispatch={dispatch} id='break'>
                {timer.break}
              </Input>
              <Input label={'Session Length:'} dispatch={dispatch} id='session'>
                {timer.session}
              </Input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function displayTime(timeArray) {
  let hour = timeArray[0];
  let minute = timeArray[1];
  let timeString;

  if (hour < 10) {
    hour = '0' + String(hour);
  } else {
    hour = String(hour);
  }

  if (minute < 10) {
    minute = '0' + String(minute);
  } else {
    minute = String(minute);
  }

  timeString = hour + ':' + minute;

  return timeString;
}
