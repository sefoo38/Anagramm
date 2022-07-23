$(function (){
    console.log("Document Ready");

    $('#checkAnagramm').on("click", function() {
       
        if( $('#firstWord').val() != '' || $('#secondWord').val() != ''){

            checkAnagramm();

        } else {

            console.log('Input Empty!');

        }
        
    });

});

// First Version 

function checkAnagramm() {
    let word1 = $('#firstWord').val();
    let word2 = $('#secondWord').val();

    console.log('First Word: ' + word1 + '\nSecond Word: ' + word2);

    word1Sorted = word1.split('').sort().join('');
    word2Sorted = word2.split('').sort().join('');
    
    console.log('First Word Sorted: ' + word1Sorted + '\nSecond Word Sorted: ' + word2Sorted);

    if (word1Sorted == word2Sorted) {

        console.log('Anagramm');

    } else {

        console.log('Not Anagramm');
        
    }

}