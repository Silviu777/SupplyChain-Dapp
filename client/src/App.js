import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/Theme";
import { createBrowserHistory } from 'history';

import './App.css';

import getWeb3 from './setupWeb3';
import { SupplyChainRoleProvider } from "./context/RoleData";
import SupplyChainContract from "./contracts/SupplyChain.json";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";

import RoleAdmin from "./pages/RoleAdmin";
import Manufacture from "./pages/Manufacturer/Manufacture";
import AllManufacture from "./pages/Manufacturer/AllManufacture";
import ShipManufacture from "./pages/Manufacturer/ShipManufacture";
import PurchaseRetailer from "./pages/Retailer/PurchaseRetailer";
import ReceiveRetailer from "./pages/Retailer/ReceiveRetailer";
import ShipRetailer from "./pages/Retailer/ShipRetailer";
import ReceiveDistributionHub from "./pages/DistributionHub/ReceiveDistributionHub";
import ShipDistributionHub from "./pages/DistributionHub/ShipDistributionHub";
import PurchaseCustomer from "./pages/Customer/PurchaseCustomer";
import ReceiveCustomer from "./pages/Customer/ReceiveCustomer";
import ReceivedCustomer from "./pages/Customer/ReceivedCustomer";


class App extends Component {

  state = { web3: null, accounts: null, contract: null, mRole: null, rRole: null, hRole: null, cRole: null };

  componentDidMount = async () => {

    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(SupplyChainContract.abi, deployedNetwork && deployedNetwork.address);

      const mRole = localStorage.getItem("mRole");
      const rRole = localStorage.getItem("rRole");
      const hRole = localStorage.getItem("hRole");
      const cRole = localStorage.getItem("cRole");

      this.setState({ web3, accounts, contract: instance, mRole: mRole, rRole: rRole, hRole: hRole, cRole: cRole }, this.executeContract);

    } catch (error) {
      alert(`Cannot load web3 data (accounts, contract)! Check console log.`);
      console.error(error);
    }
  };

  executeContract = async () => {
    const { contract } = this.state;
    console.log(contract);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts and contract...</div>;
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <SupplyChainRoleProvider mRole={this.state.mRole} rRole={this.state.rRole} hRole={this.state.hRole} cRole={this.state.cRole}>
            <Router history={createBrowserHistory()}>
              <Switch>

                <Route exact path="/roleAdmin">
                  <RoleAdmin accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                </Route>
                <Route exact path="/explorer">
                  <Explorer accounts={this.state.accounts} supplyChainContract={this.state.contract} web3={this.state.web3} />
                </Route>
                <Route exact path="/">
                  <Home accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                </Route>


                <Route exact path="/manufacturer/manufacture">
                  {this.state.mRole !== "" ?
                    <Manufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Manufacturer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/manufacturer/allManufacture">
                  {this.state.mRole !== "" ?
                    <AllManufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Manufacturer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/manufacturer/ship">
                  {this.state.mRole !== "" ?
                    <ShipManufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Manufacturer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/Retailer/allProducts">
                  {this.state.tpRole !== "" ?
                    <PurchaseRetailer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Retailer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/Retailer/receive">
                  {this.state.tpRole !== "" ?
                    <ReceiveRetailer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Retailer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/Customer/buy">
                  {this.state.cRole !== "" ?
                    <PurchaseCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Customer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/Retailer/ship">
                  {this.state.tpRole !== "" ?
                    <ShipRetailer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Retailer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/DistributionHub/receive">
                  {this.state.dhRole !== "" ?
                    <ReceiveDistributionHub accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Distribution Hub Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/DistributionHub/ship">
                  {this.state.hRole !== "" ?
                    <ShipDistributionHub accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Distribution Hub Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/Customer/receive">
                  {this.state.cRole !== "" ?
                    <ReceiveCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Customer Role at /RoleAdmin</h1>}
                </Route>
                <Route exact path="/Customer/allReceived">
                  {this.state.cRole !== "" ?
                    <ReceivedCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Customer Role at /RoleAdmin</h1>}
                </Route>
              </Switch>
            </Router>
          </SupplyChainRoleProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
