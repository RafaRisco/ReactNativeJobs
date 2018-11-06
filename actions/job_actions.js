import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import cities from 'cities';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const GITHUB_BASE_URL = 'http://jobs.github.com/positions.json?';
// const JOB_QUERY_PARAMS = {
//   location: 'NY',
//   // latlong: 1,
//   // radius: 10,
// };
//
// const buildJobsUrl = () => {
//   const query = qs.stringify({JOB_QUERY_PARAMS});
//   return `${GITHUB_BASE_URL}${query}`;
// };

export const fetchJobs = ({latitude, longitude}, callback) => async (dispatch) => {
  try {
//    let zip = await reverseGeocode(region);
    console.log(latitude, longitude);
    city = cities.gps_lookup(latitude, longitude);
    console.log(city);
    const url = `${GITHUB_BASE_URL}lat=${latitude}&long=${longitude}`;
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch(e) {
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
      payload: job,
      type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS }
};
