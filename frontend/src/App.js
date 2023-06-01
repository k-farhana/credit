import {
  Button,
  Tabs,
  Tab,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import './App.css';
import myContract from './contract.js'
import Balance  from "./balance";

function App() {

  useEffect(()=>{
    enableMetaMask();
  },[])

  const ethereum = window.ethereum;

  var Web3 = require('web3')
  const web3 = new Web3('http://localhost:8545');

  const [state, setstate] = useState({data:""})

  const enableMetaMask = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
  };

  const transfer = async () => {
    enableMetaMask();
    let address = document.getElementById('address').value;
    let amount = document.getElementById('amount').value;
    myContract.methods.transferCredits(address , amount)
    .send({from:ethereum.selectedAddress})
    .on('transactionHash', (hash) => {
      const url = `https://goerli.etherscan.io/tx/${hash}`
          window.alert(url);
    });
  }


  const mint = async () => {
    enableMetaMask();
    let address = document.getElementById('maddress').value;
    let amount = document.getElementById('mamount').value;
    myContract.methods.mint(address , amount)
    .send({from:ethereum.selectedAddress})
    .on('transactionHash', (hash) => {
      console.log('Transaction Hash:', hash);
    });
  }

  const getBalance = async () => {
    let res = [];
    const r = await myContract.methods.getBalance(ethereum.selectedAddress).call()
    res.push(r);
    return res;
  }

  let data =[];
  const p = Promise.resolve(getBalance());
  p.then(value => {
    for (let i = 0; i < value.length ; i++){
        data.push((value))
    }
  }) 
  
  const changeState = () => {  
    setstate({data: data}); 
  }; 

  return (
    <div style={{ maxWidth: "99.20%" }}>
      <br />
      <Tabs
        defaultActiveKey="creditHolder"
        id="uncontrolled-tab-example"
        className="mb-3"
        style={{ paddingLeft: "10px" }}
      >
        <Tab
          eventKey="creditHolder"
          title="Blockchain Based Credit system"
          style={{ paddingLeft: "10px" }}
        >
            <br></br>
            <Row>
              <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b> Check Account Balance: </b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <br></br>
                    <Balance data = {state.data}/>
                    <Button variant="warning" 
                    onClick={changeState}
                     type="button"> Check </Button>
                  </Card.Body>
                </Card>
              </Col>
          
              <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b> Transfer credits: </b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <input id="address" placeholder="enter receipient address"></input>
                      <br></br>
                      <br></br>
                      <input id="amount" placeholder="enter amount"></input>
                    </Card.Text>
                    <Button variant="danger" 
                    onClick={transfer} 
                    type="button"> Transfer </Button>
                  </Card.Body>
                </Card>
              </Col>
              </Row>
              </Tab>
              <Tab
          eventKey="admin"
          title="Admin Only"
          style={{ paddingLeft: "10px" }}
        >
              <Row>
               <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Header
                  ><Card.Title>
                  <b> Mint Tokens: </b>
                </Card.Title></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <input id="maddress" placeholder="enter receipient address"></input>
                      <br></br>
                      <br></br>
                      <input id="mamount" placeholder="enter amount"></input>
                    </Card.Text>
                    <Button variant="danger" 
                    onClick={mint} 
                    type="button"> Mint </Button>
                  </Card.Body>
                </Card>
              </Col>
              </Row>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;





