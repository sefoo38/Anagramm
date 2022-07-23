$(function (){
    console.log("Document Ready");

    if (localStorage.getItem('darkmode') == 'true' ) {

        applyDarkMode();

        $('#checkboxDarkmode').prop('checked', true);
    };

    $('#checkboxDarkmode').on('change', function() {

        console.log('Darkmode changed');

        changeDarkmode();

    });

    $('#checkAnagramm').on('click', function() {
       
        if( $('#firstWord').val() != '' || $('#secondWord').val() != ''){

            checkAnagramm();

        } else {

            console.log('Input is Empty');

        }
        
    });

});



function checkAnagramm() {
    let word1 = $('#firstWord').val();
    let word2 = $('#secondWord').val();

    console.log('First Word: ' + word1 + '\nSecond Word: ' + word2);

    word1Sorted = word1.split('').sort().join('');
    word2Sorted = word2.split('').sort().join('');
    
    console.log('First Word Sorted: ' + word1Sorted + '\nSecond Word Sorted: ' + word2Sorted);

    if (word1Sorted == word2Sorted) {

        console.log('Anagramm');

        getJoke();

    } else {

        console.log('Not Anagramm');

    }

}

function getJoke() {
    fetch("https://uselessfacts.jsph.pl/random.json?language=de")
    .then(response => response.json())
    .then(data => {

        console.log(data.text);

        M.toast({html: 'Fun Fact: ' + data.text, classes: 'rounded', displayLength: 5000});

    });
}

function showToast(){

}


function changeDarkmode() {

    if($('#checkboxDarkmode').prop('checked')) {

        console.log('Darkmode is checked');

        applyDarkMode();

    }else{

        console.log('Darkmode is not checked');

        $('body').addClass('bodyLightmode');
        $('body').removeClass('bodyDarkmode');

        $('#card').removeClass('cardDarkmode');

        localStorage.setItem('darkmode', false);

    }

}

function applyDarkMode(){

    $('body').addClass('bodyDarkmode');
    $('body').removeClass('bodyLightmode');

    $('#card').addClass('cardDarkmode');

    localStorage.setItem('darkmode', true);

}
