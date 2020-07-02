
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

        deleteItem: function (type, id) {

            var ids, index;

            // get the type array
            //map over it to get return new arrays with ony IDs
            ids = data.allItems[type].map(function (current) {

                return current.id
                
                
            })

            //find the index of the id argument in the new ID array

            index = ids.indexOf(id)

            console.log(`${index} and ids are ${ids}`)

            //use splice method to delete given 

            

            if(index !== -1){

               
                data.allItems[type].splice(index, 1)

                console.log(data.allItems[type])

              

            }



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
        deleteBtn: '.item_deleteBtn',
        container: '.container'



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
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description blocko">%description%</div> <div class="right clearfix">  <div class="item__value blocko">%value%</div><div class="item__percentage blocko"></div> <div  class="item__delete blocko"> <button class="item_deleteBtn" type="button"><i class="far fa-times-circle"></i></button> </div></div></div>'

            } else if (type === 'exp') {

                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description blocko">%description%</div><div class="right clearfix"><div class="item__value blocko">%value%</div> <div class="item__percentage blocko">%percent%</div>  <div class="item__delete blocko"> <button class="item__delete--btn" type="button"><i class="far fa-times-circle"></i></button> </div></div></div>'
            }


            newHtml = html.replace('%id%', obj.id);
            console.log(newHtml)
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // newHtml = newHtml.replace('%percentage%', obj.percentage);
            

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },


        addBudgetHeader: function(object){


            var budgetContainer, incToDisplay, expToDisplay, perToDisplay;

            budgetContainer = DOMstrings.netMoney;
            document.querySelector(budgetContainer).innerHTML = object.budget;

            incToDisplay = DOMstrings.incomeNumber;
            document.querySelector(incToDisplay).innerHTML = object.totalInc;

            expToDisplay = DOMstrings.expensesNumber;
            document.querySelector(expToDisplay).innerHTML = object.totalExp;

            perToDisplay = DOMstrings.expensesPercentage;
            document.querySelector(perToDisplay).innerHTML = `   ${object.percentage}%`;


        
        },



        clearFields: function () {

            console.log('clear fiels')

            var fields, fieldsArr;            
            fields = document.querySelector(DOMstrings.inputDescription).value = ""
            fieldsArr = document.querySelector(DOMstrings.inputValue).value = ""
            console.log(fields);

            // fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
            // DOMstrings.inputValue);

            // fieldsArr = Array.prototype.slice.call(fields);

            // fieldsArr.forEach(function(current, index, array) {

            //     current.value = " ";

            // });

            // fieldsArr[0].focus()

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
        document.addEventListener('keypress', function(event) {
            
            if (event.keyCode === 13 || event.which === 13) {
                console.log('Enter is pressed');
                ctrlAddItem();
            } 

        });
              

        document.querySelector(DOM.DOMstrings.container).addEventListener('click', ctrlDeleteItem)

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
        UICtrl.addBudgetHeader(budget);        

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


        } 

    };


    var ctrlDeleteItem = function (event) {

        
        console.log(event)

        //specific element 
        console.log(event.target)

        //parent element *4
        console.log(event.target.parentNode.parentNode.parentNode.parentNode.id)

        var itemID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;


        if(itemID){

            var splitID, type, ID;


            //Split strings into and array
            splitID = itemID.split('-');
            console.log(splitID)

            type = splitID[0];
            ID = parseInt(splitID[1])

            console.log(`type is ${type} and id ${ID}`)



            budgetCtrl.deleteItem(type, ID) 





        }


        
    };


    var deleteItem =  function () {

        // console.log(event.target)

        console.log('yhbjbjnkn')


        
    }


    




    return {
        init: function () {
            console.log('app has started');
            UICtrl.addBudgetHeader({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,

            });
            setupEventListener()
        }
    }




})(budgetController, UIController);


controller.init();

