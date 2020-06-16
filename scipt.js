
//Budget Controller
//////////////////////////////////////////////////////////////////

var budgetController = (function () {

    //some code



})();


//UI Controller
//////////////////////////////////////////////////////////////////
var UIController = (function () {

    //some code


    return {

        getInput: function () {
            console.log("here's the input")

            return {


                //value of type
                inputType: document.querySelector('.add_type').value,
                //value of descptiption
                inputDescription: document.querySelector('.add_description').value,
                //value of amount
                inputValue: document.querySelector('.add_value').value,


            }



        }


    }


})();



//Global APP Controller
//////////////////////////////////////////////////////////////////

var controller = (function (budgetCtrl, UICtrl) {


    //button event listener

    document.querySelector('.add_btn').addEventListener('click', ctrlAddItem)


    //Enter - Key listenner

    document.addEventListener('keypress', keyisPressed)

    function keyisPressed(event) {
        console.log(event)
        console.log(event.keyCode)

        if (event.keyCode === 13 || event.which === 13) {
            console.log('Enter is pressed')
            event.preventDefault()
            ctrlAddItem()

        } else {
            console.log(`this is not the "ENTER" key... this is key: ${event.keyCode}`)
        }


    }


    //function to execute once btn or enter key is pressed!

    var ctrlAddItem = function () {
        console.log('function will be executed')

        //1. get value input

        var inputInfo = UIController.getInput()
        console.log(inputInfo)


        //2. add items to the budget controller
        //3. Add item to UI
        //4. Calcualte the budget
        //5. Display the budget on the UI


    }

})(budgetController, UIController);

