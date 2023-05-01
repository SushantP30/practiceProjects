"use strict"

let randomNumber=Math.trunc(Math.random()*10+1);
let chances=5;
document.querySelector(".number").textContent=randomNumber;
const messages=function(message){
    document.querySelector(".message").textContent=message;
}
const match_value=document.querySelector("#match_value").addEventListener("click",function(bt){
const userNumber=Number(document.querySelector(".guess").value);

if(!userNumber){
    messages("No value!!!");
} 
else if(randomNumber === userNumber){
    messages("You are right!!!");
    chances--;
    document.querySelector('#again').classList.toggle('hidden');
    document.querySelector('#match_value').classList.toggle('hidden');
}
else if(randomNumber!==userNumber){
    if(chances>1){
        messages(randomNumber>userNumber ?' guess Higher' :'guessLower');
        chances--;
        console.log(chances)
        document.querySelector(".score").textContent=chances;
        console.log(chances);
    }else{
        messages("You lost!!!");
        document.querySelector(".score").textContent=0;
        document.querySelector("#again").classList.toggle("hidden");
        document.querySelector("match_value").classList.toggle("hidden");
    }
}

})
