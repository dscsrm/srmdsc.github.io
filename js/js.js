jQuery(document).ready(function($) {
    preloader = new $.materialPreloader({
        position: 'top',
        height: '5px',
        col_1: '#159756',
        col_2: '#da4733',
        col_3: '#3b78e7',
        col_4: '#fdba2c',
        fadeIn: 200,
        fadeOut: 200
    });
    preloader.on();
    $('.on').on('click', function(event) {
        event.preventDefault();
        preloader.on();
    });
    $('.off').on('click', function(event) {
        event.preventDefault();
        preloader.off();
    });
});
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQYNLYmC_WHmrv7l3xphPsvetgNSEwj4o",
    authDomain: "dscwebsite-23007.firebaseapp.com",
    databaseURL: "https://dscwebsite-23007.firebaseio.com",
    projectId: "dscwebsite-23007",
    storageBucket: "dscwebsite-23007.appspot.com",
    messagingSenderId: "83775788121"
  };
  firebase.initializeApp(config);
</script>