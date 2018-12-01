/* eslint-disable prefer-promise-reject-errors */

export default function getPosition(options) {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    } else {
      reject('Geolocation API not supported');
    }
  });
}
