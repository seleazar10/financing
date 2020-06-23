
//Budget Controller
//////////////////////////////////////////////////////////////////

var budgetController = (function () {

    //some code

    var Expense = function (id, description, value) {
        this.id = id,
            this.description = description,
            this.value = value;

    }

    var Income = function (id, description, value) {
        this.id = id,
            this.description = description,
            this.value = value;
    }


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }



    }

    return {
        addItems: function (type, des, val) {
            // console.log("Below is the info to be pushed in the data base")
            var newItem;
            var ID;

            // var ID = Math.floor(Math.random() * Math.floor(1000))
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else {
                newItem = new Income(ID, des, val)
            }


            data.allItems[type].push(newItem)
            console.log(data.allItems)// NI
            return newItem
        },


        testing: function () {
            console.log(data)
        }
    }

})();


//UI Controller
//////////////////////////////////////////////////////////////////
var UIController = (function () {



    var DOMstrings = {
        inputType: ".add_Type",
        inputDescription: '.add_description',
        inputValue: '.add_value',
        inputAddBtn: '.add_btn',
        incomeContainer: '.income_list',
        expenseContainer: '.expenses_list'


    }


    return {

        getInput: function () {
            // console.log("here's the input")

            return {

                //value of type
                type: document.querySelector(DOMstrings.inputType).value,
                //value of descptiption
                description: document.querySelector(DOMstrings.inputDescription).value,
                //value of amount
                value: document.querySelector(DOMstrings.inputValue).value,

            };

        },

        addListItem: function (obj, type) {

            var html, newHtml, element;

            if (type === 'inc') {

                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description blocko">%description%</div> <div class="right clearfix">  <div class="item__value">%value%</div><div class="item__percentage"></div> <div  class="item__delete"> <button class="item__delete--btn" type="button"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {

                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description blocko">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">%percent%</div>  <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }


            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },


        clearFields: function () {

            console.log( 'clear fiels')

            // var fields;


            // fields = document.querySelectorAll(DOMstrings.inputDescription + '' + DOMstrings.inputValue);

            // //    console.log(fields)

            // fieldsArr = Array.prototype.slice.call(fields);

            // fieldsArr.forEach(function (current, index, array) {

            //     current.value = " ";

            // });


        },



        getDOMstrings: function () {
            return {
                DOMstrings
            }
        }

    }

})();



//Global APP Controller
//////////////////////////////////////////////////////////////////

var controller = (function (budgetCtrl, UICtrl) {



    var setupEventListener = function () {

        var DOM = UICtrl.getDOMstrings()
        console.log(DOM)


        //button event listener
        document.querySelector(DOM.DOMstrings.inputAddBtn).addEventListener('click', ctrlAddItem)


        //Enter - Key listenner
        document.addEventListener('keypress', keyisPressed)

        function keyisPressed(event) {
            // console.log(event)  //NA
            // console.log(event.keyCode) //NA

            if (event.keyCode === 13 || event.which === 13) {
                console.log('Enter is pressed')
                event.preventDefault()
                ctrlAddItem()
            } else {
                // console.log(`this is not the "ENTER" key... this is key: ${event.keyCode}`) //NA
            }


        }

    }


    //function to execute once btn or enter key is pressed!

    var ctrlAddItem = function (event) {

        console.log('function will be executed') //NA
        event.preventDefault()

        //1. get value input
        var input = UICtrl.getInput()

        //2. add items to the budget controller

        var itemsAddedCtrl = budgetCtrl.addItems(input.type, input.description, input.value)

        //3. Add item to UI
        UICtrl.addListItem(itemsAddedCtrl, input.type)



        UICtrl.clearFields();


        //4. Calcualte the budget
        //5. Display the budget on the UI


    }




    return {
        init: function () {
            console.log('app has started');
            setupEventListener()
        }
    }




})(budgetController, UIController);


controller.init();

