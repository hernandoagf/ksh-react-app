import React, { Component } from "react";
import KshazuContract from "./contracts/KshazuMain.json";
import getWeb3 from "./getWeb3";
import { createMuiTheme } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/Grid";
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SendIcon from '@material-ui/icons/Send';

import Demo from './Demo';

import { Confirm } from 'react-st-modal';

import "./App.css";

const styles = theme => ({
  root: {
    minWidth: 300,
  },

  myGrid: {
    padding: 20,
  },

  myCard: {
    width: 350,
    maxHeight: 400,  
    margin: '0 0 0 0'
  },

  title: {
    flexGrow: 1,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const handleSend = () => {

}

class App extends Component {
  state = { ceoaddress: 0, web3: null, accounts: null, contract: null, totalSupply: null, items: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = KshazuContract.networks[networkId];
      const instance = new web3.eth.Contract(
        KshazuContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.

    const totalSupply = await contract.methods.totalSupply().call();

    let items = []
    let  item

    for(var i=0; i < totalSupply; i++){
      item = await contract.methods.kshazus(i).call();
      //items.push(item);
      this.setState({
        items: [...this.state.items, item]
      })
      console.log(item.born+" <-> "+item.genes);    
      var owner = await contract.methods.ownerOf(i).call();       
      console.log(owner);
      item.owner =  owner;
      item.id =  i;
      var str = item.genes;
      var arr = [];
      var len = str.length;
      while(len > -1){
        var s = str.substring(len-2, len);
        len = len - 2;
        if(s!=null && s.length>0){
          var num = 100 - parseInt(s);
          arr.push(num);
        }
      }
      if(arr != null && Array.isArray(arr) && arr.length == 7){
        item.eyes = arr[0]; item.mouth = arr[1];  item.head = arr[2]; item.back = arr[3]; item.tail = arr[4];  item.body = arr[5];  item.pattern = arr[6]; 
      }

    }
    console.log(this.state.items);


    this.setState({ totalSupply: totalSupply });
  };

  send = () => {
    const { accounts, contract } = this.state;
    contract.methods.safeTransferFrom(accounts[0],this.state.sendingAddress,this.state.itemIdToSend).send({from: this.state.accounts[0]})
    .once('receipt', (receipt) => {
      alert('sent successfully');
    })
  }

  render() {
    const {classes} = this.props
    const bull = <span className={classes.bullet}>•</span>;
    let nums = this.state.items;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
     <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{float:'left'}}>
          Marketplace Kshazus Beta Version 1.0
          </Typography>
          <Button color="inherit">All Items</Button>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <img src="/assets/logo.png" width="300"></img>
        <Grid className={classes.myGrid} container spacing={10}>
          {nums.map(n => {
            return (
              <Grid item md={3} key={n.id}>
                     <Card className={classes.myCard} variant="outlined" margin={5}>
                     <CardActions>
                        <Button variant="contained"  size="small" color="primary">#{n.id}</Button>
                        <Demo mom={this} itemId={n.id}/>
                      </CardActions>
                      <CardContent>
                        <Typography inline align="left" className={classes.pos} color="textSecondary">
                        <WhatshotIcon></WhatshotIcon>Kshazu #{n.id}
                        </Typography >
                        <Typography inline align="left" variant="caption" display="block" color="textSecondary" gutterBottom>Type: Genesis</Typography>
                        <Typography align="left" variant="caption"  display="block" color="textSecondary" gutterBottom><b>ownedBy:</b> {n.owner}</Typography>
                        <div id="kshazus" style={{'paddingLeft':'10px'}}>
                          <svg class="oUpDown" id="abc" viewBox="-10 -5 120 200" version="1.1" xmlns="http://www.w3.org/2000/svg">             
                              <image class="oSwivel" x="75" y="30" width="25" height="25" href={'/assets/parts/tail-'+n.tail+'.svg'} />
                              <image class="oSwivel2" x="52" y="-5" width="30" height="30" href={'/assets/parts/back-'+n.back+'.svg'} />
                              <image id="body" x="0" y="0" width="80" height="80" href={'/assets/parts/body-'+n.body+'.svg'}/>            
                              <image x="5" y="0" width="30" height="30" href={'/assets/parts/head-'+n.head+'.svg'}/>
                              <image class="oBlink" id="eyes" x="5" y="20" width="30" height="30" href={'/assets/parts/eyes-'+n.eyes+'.svg'} />
                              <image x="12" y="36" width="12" height="12" href={'/assets/parts/mouth-'+n.mouth+'.svg'} />
                          </svg>
                        </div>
                      </CardContent>
                      </Card>
              </Grid>
            );
          })}
        </Grid>
        <h3>Stats</h3>
        <div>Total Kshazus: {this.state.totalSupply}</div>
      </div>
    );
  }
}

export default withStyles(styles)(App)
//export default App;
