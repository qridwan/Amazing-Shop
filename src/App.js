import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import Header from "./Componants/Header/Header";
import Inventory from "./Componants/Inventory/Inventory";
import Login from "./Componants/Login/Login";
import NotFound from "./Componants/NotFound/NotFound";
import Order from "./Componants/Order/Order";
import ProductDetails from "./Componants/ProductDetails/ProductDetails";
import Shipment from "./Componants/Shipment/Shipment";
import Shop from "./Componants/Shop/Shop";
import "./styles.css";
import { createContext, useState} from 'react'
import PrivateRoute from "./Componants/PrivateRoute/PrivateRoute";
export const UserContext = createContext()

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
    <Router>
      <Header></Header>
      <h3>Your Email: {loggedIn.email}</h3>
    <Switch>
        <Route path="/shop">
          <Shop></Shop>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/shipment">
          <Shipment/>
        </PrivateRoute>
        <Route path="/order">
          <Order />
        </Route>
        <PrivateRoute path="/inventory">
          <Inventory/> 
        </PrivateRoute>
        <Route exact path="/">
          <Shop></Shop>
        </Route>
        <Route path="/product/:productKey">
          <ProductDetails/>
        </Route>
        
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
