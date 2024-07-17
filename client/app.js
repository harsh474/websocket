const socket = io("http://localhost:3001")

const input = document.querySelector("input");  
const form  = document.querySelector("form") ; 
const ul  = document.querySelector("ul") ; 
const p  = document.querySelector("p") ; 
function sendMessgae(e){ 
    e.preventDefault();
    if(input.value){ 
        // socket.send(input.value) ;  
        socket.emit("messagereciver", input.value);
        input.value ="" ;
    }
 } 
form.addEventListener("submit",sendMessgae) ; 

socket.on("message",(data)=>{ 
   console.log(data,"Message received from the server")  
      const li = document.createElement('li');
      li.append(data); 
      ul.appendChild(li);
}); 
 
input.addEventListener("keypress",(data)=>{ 
    /// actitvity 
    socket.emit("activity",socket.id.substring(0,4)) ;
}) 

socket.on("activity",(name)=>{ 
    // p.textContent( `${data} is typing ....`);
    p.textContent = `${name} is typing ...`;  
    setTimeout(()=>{ 
        p.textContent = "";
    },3000);
}); 

