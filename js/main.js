
// PROPERTIES

// currently active menu item
var clickedMenuItem = '';

var page = 'main';

// current language of the webpage
var currentLanguage = 'english';

// by default dropdown menu(under 850px od screen width) is closed
var menuOpened = false;




// FUNCTIONS


/**
 * check form data and send it if the form is OK
 */
function sendContactData(){
    var xhr = new XMLHttpRequest();
    var url = 'https://api.tech387.ba';
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    var name = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;


    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regex.test(String(email).toLowerCase());

    if(name === '' || email === '' || message === ''){
        if(currentLanguage === 'english'){
            document.getElementById('toast').textContent = 'All fields need to be filled';
        }else {
            document.getElementById('toast').textContent = 'Sva polja trebaju biti popunjena';
        }

        document.getElementById('toast').style = "bottom: 20px !important";
        setTimeout(function () {
            document.getElementById('toast').style = "bottom: -80px !important";
        }, 3000);
    }else if(validEmail === false){
        if(currentLanguage === 'english'){
            document.getElementById('toast').textContent = 'Entered email is not a valid email';
        }else {
            document.getElementById('toast').textContent = 'Uneseni email nije validan';
        }

        document.getElementById('toast').style = "bottom: 20px !important";
        setTimeout(function () {
            document.getElementById('toast').style = "bottom: -80px !important";
        }, 3000);
    }else {
        // if everything is OK, stringify data and send it
        var body = JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
        });


        for(var i = 0; i < document.getElementsByClassName('primary').length; i++){
            document.getElementsByClassName('primary')[i].style = "display: none;";
        }

        document.getElementsByClassName('secundary')[0].style = "display: block !important;";
        //document.getElementById('second').style = "display: block !important";

        //xhr.send(body);
        // if (this.readyState === 4 && this.status == 200) {
        //
        // };
    }
}


/**
 * Function for obtaining current geo location via Google map
 */
function myMap() {

    var myLatlng = new google.maps.LatLng(43.85627151, 18.41263015);
    var mapOptions = {
        center: new google.maps.LatLng(43.85627151, 18.41263015),
        zoom: 18,
        //mapTypeId: google.maps.MapTypeId.HYBRID
        mapTypeId: 'terrain',
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //map.setMapTypeId('terrain');


    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Tech387"
    });

    marker.setMap(map);
}


/**
 * Return to form after submitting it
 */
function returnToTheForm(){
    document.getElementsByClassName('secundary')[0].style = "display: none;";
    document.getElementById('fullname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';

    for(var i = 0; i < document.getElementsByClassName('primary').length; i++){
        document.getElementsByClassName('primary')[i].style = "display: block;";
    }
}


/**
 * Close dropdown menu after resizing screen over 850px and style approprietely menu items
 */
window.addEventListener('resize', function(){

   checkDivsHeight();

    if(window.innerWidth >= 850){
        if(menuOpened === true){
            toggleMenu();
        }
    }else {
        toggleMenu('close');
    }

});

function checkDivsHeight(){

    if(!document.getElementById('textOne')){
        return;
    }


    var one = document.getElementById('textOne').height;
    var two = document.getElementById('textTwo').clientHeight;


    // if(two > one){
    //     document.getElementById('textOne').style = "height: 8px !important;";
    // }else if(two < one){
    //     document.getElementById('textOne').style = "padding-bottom: 0px !important;";
    // }
}


/**
 * Change menu item background color depending on scrollY position (after vertical scrolling)
 */
function changeMenuBackgroundColor(){

    if(window.scrollY > 573){
        if(page === 'main'){
            document.getElementById("menu").classList.add('menuWithShadow');
        }
    }else if(window.scrollY > 523){
        if(page === 'aboutus'){
            document.getElementById("menu").classList.add('menuWithShadow');
        }
    }else {
        document.getElementById("menu").classList.remove('menuWithShadow');
    }

    if(window.scrollY >= 60){
        document.getElementById("menu").classList.add('scrollOver');
    }else {
        if(menuOpened === true && window.innerWidth <= 850){
            return;
        }

        document.getElementById("menu").classList.remove('scrollOver');
    }
}


/**
 * Call neccessary functions on loading of the page
 */
function callMainFunctions(){

    var path = location.pathname;

    if(path.indexOf('index.html') !== -1){
        page = 'main';
    }else if(path.indexOf('aboutus.html') !== -1){
        page = 'aboutus';
    }else if(path.indexOf('team.html') !== -1){
        page = 'team';
        document.getElementById("menu").classList.add('menuWithShadow');
    }else {
        page = 'contact';
        document.getElementById("menu").classList.add('menuWithShadow');
    }

    checkLanguage();

    document.getElementById(page).style = "background-color: #000; color: #fff; opacity: 0.84;";

}


/**
 * Check language on loading of the page
 * @param item
 */
function checkLanguage(item){

    var language;

    if(sessionStorage.getItem('lang')){
        currentLanguage = sessionStorage.getItem('lang');
    }else {
        sessionStorage.setItem('lang', 'english');
        currentLanguage = 'english';
    }


    if(item){
        language = item.id;
        currentLanguage = language;
        sessionStorage.setItem('lang', item.id);
    }
    else {
        currentLanguage = sessionStorage.getItem('lang');
    }


    if(currentLanguage === 'english'){
        document.getElementById('english').style.opacity = '1';
        document.getElementById('bosnian').style.opacity = '0.44';
        changeToEnglish(page);
    }else {
        document.getElementById('english').style.opacity = '0.44';
        document.getElementById('bosnian').style.opacity = '1';
        changeToBosnian(page);
    }

}


/**
 * Toggle dropdown menu when neccessary
 * @param item
 */
function toggleMenu(item){

    if(window.innerWidth <= 850 && item === 'close'){
        document.getElementById('menuItemsBigScreen').style.height = 0;
        if(window.scrollY < 60){
            if(page === 'main' || page === 'aboutus'){

                document.getElementById('menu').classList.remove('scrollOver');
            }
        }
        menuOpened = false;
        return;
    }


    if(menuOpened === false){
        document.getElementById('menuItemsBigScreen').style.height = '218px ';
        if(page === 'main' || page === 'aboutus'){
            document.getElementById('menu').classList.add('scrollOver');
        }

        menuOpened = true;
    }else {
        document.getElementById('menuItemsBigScreen').style.height = 0;
        if(window.scrollY < 60){
            if(page === 'main' || page === 'aboutus'){
                document.getElementById('menu').classList.remove('scrollOver');
            }
        }
        menuOpened = false;
    }

}


/**
 * Scroll after clicking the down button on main page
 */
function scrollDown(){
    var currentYPosition = window.scrollY;
    var toScroll = 574 - currentYPosition;

    window.scrollBy({
        top: toScroll,
        left: 0,
        behavior: 'smooth'
    });
}


/**
 * Secundary function for toggling dropdown menu
 * @param event
 */
function closeMenu(event){
    toggleMenu('close');
}

