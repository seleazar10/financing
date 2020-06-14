
//Budget Controller
//////////////////////////////////////////////////////////////////

var budgetController = (function () {

    //some code



})();


//UI Controller
//////////////////////////////////////////////////////////////////
var UIController = (function () {

    //some code

})();



//Global APP Controller
//////////////////////////////////////////////////////////////////

var controller = (function (budgetCtrl, UICtrl) {

    //some code

    //button event listener

    document.querySelector('.add_btn').addEventListener('click', ctrlAddItem)


    //Enter - Key listenner

    document.addEventListener('keypress', keyisPressed)

    function keyisPressed(event) {
        console.log(event)
        console.log(event.keyCode)

        if (event.keyCode === 13 || event.which === 13) {
            console.log('Enter is pressed')
            ctrlAddItem()
        } else {
            console.log(`key is not Enter... this is the key ${event.keyCode}`)
        }


    }


    //function to execute once btn or enter key is pressed!

   var ctrlAddItem = function() {
        console.log('btn is clicked, function will be exeuted')

        //1. get value input
        //2. add items to the budget controller
        //3. Add item to UI
        //4. Calcualte the budget
        //5. Display the budget on the UI


    }

})(budgetController, UIController);

