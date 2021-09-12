import React from "react";
import "./App.css";
import GetApi from './component/GetApi';
import {BrowserRouter,Switch,Route,HashRouter } from 'react-router-dom'
import Home from "./component/Home"
import { AppContextProvider } from "./contextApi/GlobalVars";
import {Login} from "./component/Login";
import {Register} from "./component/Register";
import {Page404} from "./component/404"
import {LoggedUser} from "./component/LoggedUser"
function App() {

 return (
    <div className="App">
<AppContextProvider>

<BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} /> 
          <Route path='/link' component={GetApi} /> 
          <Route path='/login' component={Login} /> 
          <Route path='/register' component={Register} /> 
          <Route path='/logged' component={LoggedUser} /> 
          <Route path="*" component={Page404} />
       </Switch>
</BrowserRouter>

</AppContextProvider>
    </div>
  );
}

export default App;
