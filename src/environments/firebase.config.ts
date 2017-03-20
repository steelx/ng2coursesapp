import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyD9iohQt7IfvOohTy0btaotpoAGtbYdDFg",
    authDomain: "ng2project01.firebaseapp.com",
    databaseURL: "https://ng2project01.firebaseio.com",
    storageBucket: "ng2project01.appspot.com",
    messagingSenderId: "154189419076"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
