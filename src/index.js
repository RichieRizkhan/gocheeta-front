import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "@progress/kendo-theme-default/dist/all.css";
import Update from './component/updateform'
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Switch,Route,BrowserRouter} from 'react-router-dom'



// import components

import ShowCars from './component/showRequest'
import OptionHeader from '../src/component/OptionHeader/optionHeader'
import UserDashBoard from '../src/component/DashBoard/UserDashBoaed'
import ShowHome from '../src/Views/ShowHome'
import HomeList from '../src/Views/HomeList'
import MainDashBoard from '../src/Views/MainDashBoard'
import VisiterDashBoard from '../src/component/DashBoard/VisterDashBoard'
const role = localStorage.getItem("role")
ReactDOM.render(
  
  <React.StrictMode>

    <OptionHeader role={role} />
     
    <BrowserRouter>
     
      <Switch>
          <Route exact path="/" component={VisiterDashBoard}></Route>
          <Route exact path="/show" component={ShowCars}></Route>
          <Route exact path="/home" component={MainDashBoard}></Route>
          <Route exact path="/Info" component={ShowHome}></Route>
          <Route exact path="/update/:id" component={Update}></Route>
          <Route exact path="/Children" component={HomeList}></Route>
          <Route exact path="/Elder" component={HomeList}></Route>
          <Route exact path="/Nursing" component={HomeList}></Route>
          <Route exact path="/showCalender/:id" component={UserDashBoard}></Route>
         
      </Switch>
    </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
