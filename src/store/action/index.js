import firebase from 'firebase/app';
import { db } from '../../components/firebase/firebase';

const signInWithFB = () => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var user = result.user;
                console.log('Facebook result ==>', result)

                let logUser = {
                    name: user.displayName,
                    email: user.email,
                    profile: user.photoURL,
                    uid: user.uid
                }
                db.ref(`users/${user.uid}`).set(logUser)
                    .then(() => {
                        dispatch({
                            type: 'FACEBOOKUSER',
                            payload: logUser
                        })
                        alert('User Logged in Successfully!')
                    })
                console.log('Facebook User ==>', logUser)
            }).catch(function (error) {
                console.log('Facebook Error ==>', error)
            });
    }
}

export {
    signInWithFB
}