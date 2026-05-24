/*let stock = document.getElementById("stock");
let buyPlaceCount = 1;
let buyPlace = document.getElementById("buyPlace" + buyPlaceCount);
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
        if (buyPlaceCount === 4) {return};
        buyPlace = document.getElementById("buyPlace" + buyPlaceCount);
        hasStock = true;
        money -= stockValue;
        document.getElementById("money").innerText="Money: " + money;
        buyPlaceNum = stockValue;
        buyPlace.style.height = buyPlaceNum + "vh";
        buyPlace.innerText = buyPlaceNum + " Dollars";
        buyPlaceCount++;
    };
});
sellButton.addEventListener("click", function() {
    if (hasStock) {
        hasStock = false;
        money += stockValue;
        buyPlace.style.height = 0 + "vh";
        buyPlace.innerText="";
        document.getElementById("money").innerText="Money: " + money;
        buyPlaceCount--;
        buyPlace = document.getElementById("buyPlace" + buyPlaceCount);
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
setInterval(stockChange, 2000);*/







/*let stock = document.getElementById("stock");
let buyPlaceCount = 1; // Keep this global to track the slot number
let stockValue = 0;
let buyPlaceNum = 0;
let money = 1000;
let hasStock = false;

const buyButton = document.getElementById("buy-btn");
const sellButton = document.getElementById("sell-btn");

function stockChange() {
    stockValue = Math.floor(Math.random() * 100);
    stock.style.height = stockValue + "vh"; 
    if (stockValue >= 50) {
        stock.innerText = `${stockValue} Dollars`;
        stock.style.backgroundColor = "green";
    } else {
        stock.innerText = `${stockValue} Dollars`;
        stock.style.backgroundColor = "red";
    }
}

buyButton.addEventListener("click", function() {
    if (money >= stockValue) {
        if (buyPlaceCount === 4) return; // Prevent going past your available slots
        
        // FIX: Find the element dynamically right now!
        let currentBuyPlace = document.getElementById("buyPlace" + buyPlaceCount);
        
        if (currentBuyPlace) { // Safety check to make sure the HTML element exists
            hasStock = true;
            money -= stockValue;
            document.getElementById("money").innerText = "Money: " + money;
            buyPlaceNum = stockValue;
            currentBuyPlace.style.height = buyPlaceNum + "vh";
            currentBuyPlace.innerText = buyPlaceNum + " Dollars";
            buyPlaceCount++; // Move to the next slot for the NEXT buy
            console.log(buyPlaceCount)
        }
    }
});

sellButton.addEventListener("click", function() {
    console.log(buyPlaceCount)
    if (hasStock) {
        // FIX: Step back to the slot that actually holds the stock
        let currentBuyPlace = document.getElementById("buyPlace" + (buyPlaceCount - 1));
        
        if (currentBuyPlace) {
            money += stockValue;
            currentBuyPlace.style.height = "0vh";
            currentBuyPlace.innerText = "";
            document.getElementById("money").innerText = "Money: " + money;
            buyPlaceCount--;
            console.log(buyPlaceCount)
        }
    }
});

setInterval(() => {
    if (!hasStock && money <= 0) {
        alert("YOU LOST");
        location.reload();
    }
}, 1000);

setInterval(stockChange, 2000);*/
let stock = document.getElementById("stock");
let buyPlaceCount = 1; // Tracks which slot is next inline (1, 2, or 3)
let stockValue = 0;
let money = 1000;

const buyButton = document.getElementById("buy-btn");
const sellButton = document.getElementById("sell-btn");

function stockChange() {
    stockValue = Math.floor(Math.random() * 100);
    stock.style.height = stockValue + "vh"; 
    if (stockValue >= 50) {
        stock.innerText = `${stockValue} Dollars`;
        stock.style.backgroundColor = "green";
    } else {
        stock.innerText = `${stockValue} Dollars`;
        stock.style.backgroundColor = "red";
    }
}

buyButton.addEventListener("click", function() {
    if (money >= stockValue) {
        if (buyPlaceCount === 4) return; // Cap at max 3 slots filled (slot 4 is out-of-bounds)
        
        let currentBuyPlace = document.getElementById("buyPlace" + buyPlaceCount);
        
        if (currentBuyPlace) { 
            money -= stockValue;
            document.getElementById("money").innerText = "Money: " + money;
            
            // Lock the asset value directly onto this single column block
            currentBuyPlace.style.height = stockValue + "vh";
            currentBuyPlace.innerText = stockValue + " Dollars";
            
            buyPlaceCount++; // Move pointer forward (e.g., from 1 to 2)
            console.log("Current Next Slot Pointer:", buyPlaceCount);
        }
    }
});

sellButton.addEventListener("click", function() {
    // FIX: Instead of checking a boolean, check if we actually own any stock (slot pointer > 1)
    if (buyPlaceCount > 1) {
        
        // Grab the slot that actually holds the stock we want to sell
        let currentBuyPlace = document.getElementById("buyPlace" + (buyPlaceCount - 1));
        
        if (currentBuyPlace) {
            money += stockValue; // Liquidate at the CURRENT ticker value
            document.getElementById("money").innerText = "Money: " + money;
            
            // Clear out this visual column entirely
            currentBuyPlace.style.height = "0vh";
            currentBuyPlace.innerText = "";
            
            buyPlaceCount--; // Move pointer backward
            console.log("Current Next Slot Pointer:", buyPlaceCount);
        }
    }
});

// Game Over state evaluation loop
setInterval(() => {
    // FIX: You lose if you are broke AND have no active stocks left to liquidate
    if (buyPlaceCount === 1 && money <= 0) {
        alert("YOU LOST");
        location.reload();
    }
}, 1000);

setInterval(stockChange, 2000);