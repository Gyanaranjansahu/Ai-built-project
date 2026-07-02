
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import {Authprovider} from './authentication/authcontect.jsx'
createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Authprovider>
<App/>
  </Authprovider>

  
 
 </BrowserRouter>
)
