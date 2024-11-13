
$(document).ready(function () {
    $('.lookupByRegSet').on('click', function () {

        var userRegInput = $(".lookupByReg").val().toUpperCase()

        var regToHexURL = window.location.pathname + '?reg=' + userRegInput;
        window.location = regToHexURL

    })
    $('.lookupByReg').keypress(function(e){ //user entered value into the text field()
        if(e.which == 13){//Enter key pressed
            $('.lookupByRegSet').click();//button
        }
    });
});