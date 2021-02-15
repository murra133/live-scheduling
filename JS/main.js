var firebaseConfig = {
    apiKey: "AIzaSyDKdaqNC2znOFtc8qyyYFeXi1RCJ7917O4",
    authDomain: "live-schedule-9af55.firebaseapp.com",
    databaseURL: "https://live-schedule-9af55-default-rtdb.firebaseio.com",
    projectId: "live-schedule-9af55",
    storageBucket: "live-schedule-9af55.appspot.com",
    messagingSenderId: "813471454483",
    appId: "1:813471454483:web:e30e3b16c6bb93aebeb6e6",
    measurementId: "G-85BXZ73GVG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('contactformmessages');



$('#contactForm').submit(function(e) {
    e.preventDefault();
 
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });
 
    $('.success-message').show();
 
    $('#contactForm')[0].reset();
});

