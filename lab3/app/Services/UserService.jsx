import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./init";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
  });
};

export const logOut = () => {
    signOut(auth)
        .then(() => {
            console.log("Użytkownik wylogowany.");
        })
        .catch((error) => {
            console.error("Błąd przy wylogowywaniu:", error);
        });
}

export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            setUser(_user);
        });

        return () => unsubscribe(); //czyszczenie
    }, []);

    return user;
};