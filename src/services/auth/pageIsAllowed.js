import axios from 'axios';

export default function(history, shouldBySignedIn = true) {
    axios.get('/api/users/check-session-status')
         .then((result) => {
            if (result.data && !result.data.result && shouldBySignedIn) {
                history.push('/auth/sign-in');
            } else if (result.data && result.data.result && !shouldBySignedIn) {
                history.push('/');
            }
         })
         .catch((err) => {
            console.log('err page is allowed', err);

            if (shouldBySignedIn) {
                history.push('/auth/sign-in');
            } else {
                // history.push('/');
            }
        });
}