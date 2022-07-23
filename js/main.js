/**
 * Document Ready Function
 * Initialization
 * 
 */

$(function (){
    console.log("Document Ready");

    /**
     * Check localstorage if darkmode was activated before 
     * if it was, then activate darkmode and change styling
     */
    if (localStorage.getItem('darkmode') == 'true' ) {

        applyDarkmode();

        $('#checkboxDarkmode').prop('checked', true);
    };

    /**
     * Eventlistener
     * If Darkmode switch is changed then call function to change styling
     */
    $('#checkboxDarkmode').on('change', function() {

        console.log('Darkmode changed');

        changeDarkmode();

    });

    /**
     * Eventlistener
     * If capitalization Checkbox is changed then call removeValidation function
     */
    $('#capitalizationCheckbox').on('change', function(){

        console.log('Capitalization changed');

        removeValidation();

    });

    /**
     * Eventlistener
     * On Click on Check Button "Prüfen" check if inputs are empty, 
     * if empty apply invalidInput function.
     * Otherwise call checkAnagramm function
     */
    $('#checkAnagramm').on('click', function() {
       
        if( $('#firstWord').val() != '' || $('#secondWord').val() != ''){

            checkAnagramm();

        } else {

            console.log('Input is Empty');

            invalidInput();

        }
        
    });

    /**
     * Eventlistener
     * If Input on booth input fields is changed chall removeValidation function to reset validation
     */
    $('#firstWordInput').on('input', function() {

        removeValidation();

    });

    $('#secondWordInput').on('input', function() {

        removeValidation();

    });

});

/**
 * Begin individual functions
 */


/**
 * CheckAnagramm function get values of input fields.
 * If capitalization is Checked, strings are convertet to lowercase to ignore capitalization
 * After optional lowercase strings are splitted, sorted and joined again.
 * After joining booth strings are compared
 * If strings are the same validInput function is called to visual validation
 * And some random useless fact will be showed
 * 
 * If strings are not the same invalidInput function is called to visual validation
 */
function checkAnagramm() {
    let word1 = $('#firstWordInput').val();
    let word2 = $('#secondWordInput').val();

    console.log('First Word: ' + word1 + '\nSecond Word: ' + word2);

    if ($('#capitalizationCheckbox').prop('checked')) {

        word1Sorted = word1.toLowerCase().split('').sort().join('');
        word2Sorted = word2.toLowerCase().split('').sort().join('');

    } else {

        word1Sorted = word1.split('').sort().join('');
        word2Sorted = word2.split('').sort().join('');

    }
    
    console.log('First Word Sorted: ' + word1Sorted + '\nSecond Word Sorted: ' + word2Sorted);

    if (word1Sorted == word2Sorted) {

        console.log('Anagramm');

        validInput();
        getFact();

    } else {

        console.log('Not Anagramm');

        invalidInput();

    }

}

/**
 * Gets a useless fact from public REST API
 * And is showed in toast message
 */

function getFact() {
    fetch("https://uselessfacts.jsph.pl/random.json?language=de")
    .then(response => response.json())
    .then(data => {

        console.log(data.text);

        M.toast({
            html: 'Unnützes Wissen: ' + data.text, 
            classes: 'rounded', 
            displayLength: 8000
        });

    });
}

/**
 * If Darkmode is activated applyDarkmode function is called
 * Otherwiese additional stylings will be removed and localstorage item will be updated
 */
function changeDarkmode() {

    if($('#checkboxDarkmode').prop('checked')) {

        console.log('Darkmode is checked');

        applyDarkmode();

    }else{

        console.log('Darkmode is not checked');

        $('body').addClass('bodyLightmode');
        $('body').removeClass('bodyDarkmode');

        $('#card').removeClass('cardDarkmode');

        $('.material-icons').removeClass('iconDarkmode');

        localStorage.setItem('darkmode', false);

    }

}

/**
 * Adding some additional styling to main elements to reduce brightness
 * state of activated darkmode will be stored in localstorage to call on reload
 */
function applyDarkmode(){

    $('body').addClass('bodyDarkmode');
    $('body').removeClass('bodyLightmode');

    $('#card').addClass('cardDarkmode');

    $('.material-icons').addClass('iconDarkmode');

    localStorage.setItem('darkmode', true);

}

/**
 * Will add valid class to input elements
 */
function validInput(){

    $('#firstWordInput').addClass('valid');
    $('#secondWordInput').addClass('valid');

}

/**
 * Will add invalid class to input elements
 * 
 */

function invalidInput() {

    $('#firstWordInput').addClass('invalid');
    $('#secondWordInput').addClass('invalid');

}

/**
 * will remove any class from input elements to reset validation
 */
function removeValidation() {

    $('#firstWordInput').removeClass();
    $('#secondWordInput').removeClass();

}
