import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS
} from './types';

const GITHUB_BASE_URL = 'http://jobs.github.com/positions.json?';
// const JOB_QUERY_PARAMS = {
//   publisher: '4201738803816157',
//   form: 'json',
//   v: '2',
//   latlong: 1,
//   radius: 10,
//   q: 'javascript'
// };

// const buildJobsUrl = (zip) => {
//   const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip });
//   return `${JOB_ROOT_URL}${query}`;
// };

export const fetchJobs = ({longitudeDelta, latitudeDelta, longitude, latitude}) => async (dispatch) => {
  try {
//    let zip = await reverseGeocode(region);
    const url = `${GITHUB_BASE_URL}lat=${latitude}&long=${longitude}`;
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    console.log(data);
  } catch(e) {
    console.error(e);
  }
};
