document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
})

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
            .then(result => {

                const user = result.user;
                window.setTimeout("location.href = 'http://localhost:8080'")
            })
            .catch(console.log)
}