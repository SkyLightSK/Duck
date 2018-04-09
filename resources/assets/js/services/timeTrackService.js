/**
 * Created by kopel on 11.03.2018.
 */
import Http from '../Http'
import * as action from '../store/actions'

export function userStartedTime(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/auth/login', credentials)
                .then(res => {
                    dispatch(action.authLogin(res.data));
                    return resolve();
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}