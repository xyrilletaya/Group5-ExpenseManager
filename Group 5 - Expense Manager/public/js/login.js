// signup for user

const signUp = document.querySelector('#signUp');

signUp.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signUp['signUpEmail'].value;
  const password = signUp['signUpPassword'].value;

  auth.createUserWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        alert("Sign up success!");
        window.location = 'home.html';

      }

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

    });

});

// Login

const login = document.querySelector('#login');
login.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = login['loginEmail'].value;
  const password = login['loginPassword'].value;

  auth.signInWithEmailAndPassword(email, password).then((user) => {
      if (user) {

        window.location = 'home.html';
      }

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

    });

});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log('no user logged in');
  }
});
const googleSignIn = document.querySelector('#google')
googleSignIn.addEventListener('click', (e) => {
  var provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      window.location = 'home.html';
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
});

const facebookSignIn = document.querySelector('#facebook')
facebookSignIn.addEventListener('click', (e) => {
  var provider = new firebase.auth.FacebookAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      window.location = 'home.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
});