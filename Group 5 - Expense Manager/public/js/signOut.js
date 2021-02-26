const signOut = document.querySelector('#signOut');
signOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location = 'index.html';

    console.log('signOut user');
});