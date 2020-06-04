
//Budget Controller
var budgetController = (function () {

    //some code



})();


//UI Controller
var UIController = (function () {

    //some code

})();



//Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {

    //some code

    //button event listener

    document.querySelector('.add_btn').addEventListener('click', btnClicked)


    //Enter - Key listenner
    
    document.addEventListener('keypress', keyisPressed)

    function keyisPressed(event) {
        console.log(event)
        console.log(event.keyCode)

        if (event.keyCode === 13) {
            console.log('Enter is pressed')
            btnClicked()
        } else {
            console.log(`key is not Enter... this is the key ${event.keyCode}`)
        }


    }



    function btnClicked() {
        console.log('booom')

        //1. 
    }

})(budgetController, UIController);

