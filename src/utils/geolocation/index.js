export default function getGeolocationPosition(options) {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        } else {
            reject('Geolocation API not supported');
        }
    });
}
