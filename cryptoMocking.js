let stock = document.getElementById("stock");
let buyPlace = document.getElementById("buyPlace");
let stockValue = 0
let buyPlaceNum = 0;
let money = 1000;
let hasStock = false
const buyButton = document.getElementById("buy-btn");
const sellButton = document.getElementById("sell-btn");
function stockChange() {
    // Generates a random number between 0 and 99
    stockValue = Math.floor(Math.random() * 100);
    
    // FIX: Glue "vh" to the end of the number!
    stock.style.height = stockValue + "vh"; 
    if (stockValue >= 50) {
        stock.innerText=`${stockValue} Dollars`
        stock.style.backgroundColor="Green";
    } else {
        stock.innerText=`${stockValue} Dollars`
        stock.style.backgroundColor="Red";
    };
};

buyButton.addEventListener("click", function() {
    if (money >= stockValue && !hasStock) {
        hasStock = true;
        money -= stockValue;
        document.getElementById("money").innerText="Money: " + money;
        buyPlaceNum = stockValue;
        buyPlace.style.height = buyPlaceNum + "vh";
        buyPlace.innerText = buyPlaceNum + " Dollars";
    };
});
sellButton.addEventListener("click", function() {
    if (hasStock) {
        hasStock = false;
        money += stockValue;
        buyPlace.style.height = 0 + "vh";
        buyPlace.innerText="";
        document.getElementById("money").innerText="Money: " + money;
    };
});
setInterval(() => {
    if (!hasStock) {
        if (money <= 0) {
            alert("YOU LOST");
            location.reload()
        }
    }
}, 1000)
setInterval(stockChange, 2000);