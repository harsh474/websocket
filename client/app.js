const socket = io("http://localhost:3001")

const input = document.querySelector("input");  
const form  = document.querySelector("form") ; 
const ul  = document.querySelector("ul") ; 

function sendMessgae(e){ 
    e.preventDefault();
    if(input.value){ 
        // socket.send(input.value) ;  
        socket.emit("messagereciver", input.value);
        input.value ="" ;
    }
 } 
form.addEventListener("submit",sendMessgae) ; 

socket.on("messagedistributer",(data)=>{ 
   console.log(data,"Message received from the server")  
      const li = document.createElement('li');
      li.append(data); 
      ul.appendChild(li);
}); 
 