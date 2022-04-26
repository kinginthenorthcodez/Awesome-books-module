/* eslint-disable no-undef */
import { date } from './navigation.js';

const setTime = () => {
  const timer = luxon.DateTime.local();
  date.innerHTML = `${timer.toLocaleString(luxon.DateTime.DATETIME_FULL)}, ${timer.toLocaleString(luxon.DateTime.TIME_WITH_SECONDS)}`;
  setTimeout(setTime, 1000);
};

export default setTime;