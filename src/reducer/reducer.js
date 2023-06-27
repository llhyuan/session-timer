export const initialTimer = {
  sessionRemain: [25, 0],
  breakRemain: [5, 0],
  break: 5,
  session: 25,
  inSession: true,
};

export default function reducer(state, action) {
  let newInterval;
  let timeRemain;
  switch (action.source) {
    case 'break':
      newInterval = state.break;
      if (action.type === 'add') {
        newInterval = newInterval + 1 < 30 ? newInterval + 1 : 30;
      } else {
        newInterval = newInterval - 1 < 0 ? 0 : newInterval - 1;
      }

      return {
        ...state,
        breakRemain: [newInterval, 0],
        break: newInterval,
      };
    case 'session':
      newInterval = state.session;
      if (action.type === 'add') {
        newInterval = newInterval + 1 < 60 ? newInterval + 1 : 60;
      } else {
        newInterval = newInterval - 1 < 15 ? 15 : newInterval - 1;
      }
      return {
        ...state,
        sessionRemain: [newInterval, 0],
        session: newInterval,
      };
    case 'countdown':
      timeRemain = action.timeRemain;
      if (state.inSession === true) {
        if (timeRemain === 0) {
          return {
            ...state,
            sessionRemain: [state.session, 0],
            inSession: !state.inSession,
          };
        } else {
          return {
            ...state,
            sessionRemain: [Math.floor(timeRemain / 60), timeRemain % 60],
          };
        }
      } else {
        if (timeRemain === 0) {
          return {
            ...state,
            breakRemain: [state.break, 0],
            inSession: !state.inSession,
          };
        } else {
          return {
            ...state,
            breakRemain: [Math.floor(timeRemain / 60), timeRemain % 60],
          };
        }
      }
    case 'reset':
      return initialTimer;

  }
}
