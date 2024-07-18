import React from 'react'
import {io} from "socket.io-client" 

function App() {
  const socket = io("http://localhost:3001") ;
  return (
    <div>
  HI my name is Harsh Rajput
    </div>
  )
}
 
export default App