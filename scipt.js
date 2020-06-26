
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


    var calculateTotal = function (type) {

        var sum = 0;

        data.allItems[type].forEach(function (cur) {
            sum += cur.value

            // console.log(sum)
        });
        data.totals[type] = sum;

        console.log(sum)
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

            console.log(data.allItems)

        },

        calculateBudget: function () {

            //calculate total inocme and exense

            calculateTotal('inc')
            calculateTotal('exp')

            //calcuate the budget: income - expenses

            var incomeTotal = data.totals['inc']
            console.log(incomeTotal)

            var expensesTotal = data.totals['exp']
            console.log(expensesTotal)

            data.budget = incomeTotal - expensesTotal
            console.log(data.budget)

            //calculate percentage
            data.percentage = Math.round((expensesTotal / incomeTotal) * 100)

            console.log(`${data.percentage} %`)

        },

        
        getBudget: function(){

            return{
                budget: data.budget,
                totalInc: data.totals['inc'],
                totalExp: data.totals['exp'],
                percentage: data.percentage,

            }

        },


       

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
        expenseContainer: '.expenses_list',
        netMoney: '.netMoney',
        incomeNumber: ".incomeNumber",
        expensesNumber: ".expensesNumber",
        expensesPercentage: ".expensesPercentage",



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
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)

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
            // newHtml = newHtml.replace('%percentage%', obj.percentage);
            

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },


        addBudget: function(object){


            var budgetContainer, incToDisplay, expToDisplay, perToDisplay;

            budgetContainer = DOMstrings.netMoney;
            document.querySelector(budgetContainer).innerHTML = object.budget;

            incToDisplay = DOMstrings.incomeNumber;
            document.querySelector(incToDisplay).innerHTML = object.totalInc;

            expToDisplay = DOMstrings.expensesNumber;
            document.querySelector(expToDisplay).innerHTML = object.totalExp;

            perToDisplay = DOMstrings.expensesPercentage;
            document.querySelector(perToDisplay).innerHTML = `   ${object.percentage}%`;


            
        // getBudget: function(){

        //     return{
        //         budget: data.budget,
        //         totalInc: data.totals['inc'],
        //         totalExp: data.totals['exp'],
        //         percentage: data.percentage,

        //     }

        // },



        },



        clearFields: function () {

            console.log('clear fiels')

            var fields, fieldsArr;

            // fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
            // DOMstrings.inputValue);

            // fieldsArr = Array.prototype.slice.call(fields);

            // fieldsArr.forEach(function(current, index, array) {

            //     current.value = " ";

            // });

            // fieldsArr[0].focus()


            fields = document.querySelector(DOMstrings.inputDescription).value = ""
            fieldsArr = document.querySelector(DOMstrings.inputValue).value = ""
            console.log(fields);


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

        var DOM = UICtrl.getDOMstrings();
        console.log(DOM);


        //button event listener
        document.querySelector(DOM.DOMstrings.inputAddBtn).addEventListener('click', ctrlAddItem)


        //Enter - Key listenner
        document.addEventListener('keypress', keyisPressed);

        function keyisPressed(event) {
            // console.log(event)  //NA
            // console.log(event.keyCode) //NA

            if (event.keyCode === 13 || event.which === 13) {
                console.log('Enter is pressed');
                event.preventDefault();
                ctrlAddItem();
            } else {
                // console.log(`this is not the "ENTER" key... this is key: ${event.keyCode}`) //NA
            }


        }

    }


    //function to execute once btn or enter key is pressed!

    var updateBudget = function () {

        budgetCtrl.testing();

        //1. calaculate budget / result

        budgetCtrl.calculateBudget();



        //2. return new result

        var budget = budgetCtrl.getBudget();


        //3. display result on UI
        console.log(budget);

        UICtrl.addBudget(budget);        

    }


    var ctrlAddItem = function (event) {

        console.log('function will be executed') //NA
        event.preventDefault()

        //1. get value input
        var input = UICtrl.getInput()

        console.log(input)

        if (input.description !== "" && input.value !== "" && !isNaN(input.value)) {
            //2. add items to the budget controller

            var itemsAddedCtrl = budgetCtrl.addItems(input.type, input.description, input.value)



            //3. Add item to UI
            UICtrl.addListItem(itemsAddedCtrl, input.type)


            //4. clear input field

            UICtrl.clearFields();

            //5. budget update function

            updateBudget()


        } else {
            console.log(`fill in form ${input.type}`)
        }






    }




    return {
        init: function () {
            console.log('app has started');
            UICtrl.addBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,

            });
            setupEventListener()
        }
    }




})(budgetController, UIController);


controller.init();

