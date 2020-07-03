
//Budget Controller
//////////////////////////////////////////////////////////////////

var budgetController = (function () {

    //some code

    var Expense = function (id, description, value) {
        this.id = id,
            this.description = description,
            this.value = value,
            this.percentage = -1

    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage
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

        // console.log(sum)
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
            var newItem, ID;

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
            // console.log(data.allItems)// NI
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
            //use splice method to delete given 
            if (index !== -1) {


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
            // console.log(incomeTotal)

            var expensesTotal = data.totals['exp']
            // console.log(expensesTotal)

            data.budget = incomeTotal - expensesTotal
            // console.log(data.budget)

            //calculate percentage
            data.percentage = Math.round((expensesTotal / incomeTotal) * 100)

            // console.log(`${data.percentage} %`)

        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (curr) {
                curr.calcPercentage(data.totals.inc);
            })

        },

        getPercentages: function () {

            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            //    console.log(allPerc)
            return allPerc;


        },


        getBudget: function () {

            return {
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
        container: '.container',
        expensesPercLabel: '.item_percentage',
        monthBudgt: '.budget__title--month'



    }

    document.getElementById('income-100').style.display = 'none';


    var nodeListForEach = function (list, callback) {

        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }

    };



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
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description blocko">%description%</div> <div class="right clearfix">  <div class="item__value blocko">%value%</div> <div  class="item__delete blocko"> <button class="item_deleteBtn" type="button"><i class="far fa-times-circle"></i></button> </div></div></div>'

            } else if (type === 'exp') {

                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description blocko">%description%</div><div class="right clearfix"><div class="item__value blocko">%value%</div> <div class="item_percentage blocko"></div>  <div class="item__delete blocko"> <button class="item__delete--btn" type="button"><i class="far fa-times-circle"></i></button> </div></div></div>'
            }


            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorID) {

            var el;
            el = document.getElementById(selectorID);
            el.parentNode.removeChild(el)


        },

        clearFields: function () {

            var fields, fieldsArr;
            fields = document.querySelector(DOMstrings.inputDescription).value = ""
            fieldsArr = document.querySelector(DOMstrings.inputValue).value = ""


            // (DOMstrings.inputDescription).focus()

        },

        addBudgetHeader: function (object) {


            var budgetContainer, incToDisplay, expToDisplay, perToDisplay;

            budgetContainer = DOMstrings.netMoney;
            document.querySelector(budgetContainer).innerHTML = object.budget;

            incToDisplay = DOMstrings.incomeNumber;
            document.querySelector(incToDisplay).innerHTML = object.totalInc;

            expToDisplay = DOMstrings.expensesNumber;
            document.querySelector(expToDisplay).innerHTML = object.totalExp;

            perToDisplay = DOMstrings.expensesPercentage;
            document.querySelector(perToDisplay).innerHTML = `${object.percentage}%`;



        },





        displayPercentages: function (percentages) {

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);


            nodeListForEach(fields, function (current, index) {



                if (percentages[index] > 0) {

                    current.textContent = percentages[index] + "%";


                } else {
                    current.textContent = '----'
                    console.log(percentages[index])
                }

            })

        },


        displayMonth: function () {
            var now = new Date();
            console.log(now)


            var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

            var month = now.getMonth()
            var currentMonth = month - 1
            console.log(currentMonth)

            var theYear = now.getFullYear();
            // console.log(year)
            document.querySelector(DOMstrings.monthBudgt).textContent = `${months[currentMonth]}, ${theYear}`

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
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                // console.log('Enter is pressed');
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
        // console.log(budget);
        UICtrl.addBudgetHeader(budget);

    }

    var updatePercentages = function () {

        budgetCtrl.calculatePercentages()


        var percentages = budgetCtrl.getPercentages()


        console.log(percentages)

        UIController.displayPercentages(percentages)





    }



    var ctrlAddItem = function (event) {

        console.log('function will be executed') //NA
        event.preventDefault()

        //1. get value input
        var input = UICtrl.getInput()
        // console.log(input)

        if (input.description !== "" && input.value !== "" && !isNaN(input.value)) {

            //2. add items to the budget controller
            var itemsAddedCtrl = budgetCtrl.addItems(input.type, input.description, input.value)

            //3. Add item to UI
            UICtrl.addListItem(itemsAddedCtrl, input.type)


            //4. clear input field
            UICtrl.clearFields();

            //5. budget update function
            updateBudget()

            //6.  //Update Percentages
            updatePercentages()


        }

    };


    var ctrlDeleteItem = function (event) {


        // console.log(event)

        //specific element 
        console.log(event.target)

        //parent element *4
        console.log(event.target.parentNode.parentNode.parentNode.parentNode.id)

        var itemID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;


        if (itemID) {

            var splitID, type, ID;


            //Split strings into and array
            splitID = itemID.split('-');
            // console.log(splitID)

            type = splitID[0];
            ID = parseInt(splitID[1])

            //delete item from data structure
            budgetCtrl.deleteItem(type, ID)

            //delete item from UI
            UICtrl.deleteListItem(itemID)

            //Update new budget
            updateBudget()

            //Update Percentages
            updatePercentages()

        }



    };


    return {
        init: function () {
            console.log('app has started');
            UICtrl.displayMonth()

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

