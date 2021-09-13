import React from 'react'
import { useState, useEffect,useContext } from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {RiFileCopyLine} from 'react-icons/ri';
import { IoStatsChart } from "react-icons/io5";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../contextApi/GlobalVars';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      height: "auto",
      [theme.breakpoints.down("768")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(100vw - 98.5vw)",
      height: "70px",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      margin: "40px auto",
      width: "55%",
      backgroundColor: "#3d4148",
      padding: "25px",
      borderRadius: "8px",
    },

    result: {
      display: "flex",
      flexDirection: "column",
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),
    },
    backButton:{
      borderRadius: "6px",
      height: "30px",
      border: "2px solid darkslategray",
      cursor: "pointer",
      fontSize: "18px",
      background: "#3d4148",
      color: "#E9D758",
      width: '110px',
      margin:'50px',
      fontFamily: 'Merienda',
      "&:hover": {
        background: "#E9D758",
        color: "black",
      }
    }
        
  }));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

 const GetApi = (props) => {
    const [data2, setData2] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [baseUrl,setBaseurl] = useState('http://localhost:8000/')
    const classes = useStyles();
    const{inputValue,takeInput,name2} = useContext(AppContext)
    const history = useHistory();
    const [ spinner, setSpinner ] = useState(true);


  
    useEffect(() => {
      setTimeout(() => setSpinner(false), 1000)
    }, []);
  
    React.useEffect(() => {
      
    const apiData = async (props) => {
        try {
          //index === json.shortUrls.length-1
  
          const response = await axios.get("/api/shortUrls");
          const json = await response.data
          console.log(json)
          let x = json.shortUrls.filter((item,index) => item.long === inputValue)
          .map(item => item)
          console.log(x)
          setData2(x) 
          //takeInput('dasdasdasda')
          console.log(inputValue)

        } catch (error) {
          console.error(error);
        }
      }
      
        apiData()
      
     }, []);

     async function copy(event){

       let copyText = await document.getElementById("myText").innerText;
        if(navigator.clipboard){
        navigator.clipboard.writeText(copyText).then(()=>{
          setOpenSnack(true);
        },(err)=>{
          console.log('failed to copy text', err)
        })
      }
    
      }

      
    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
       return;
    }
          
       setOpenSnack(false);
    };

            //modal
     const handleOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
          
    
     return(
       <>
      { spinner ? <div className ="loading" style={{display:'flex',justifyContent:'center',fontSize:'35px',paddingTop:'90px'}}>Data is Loading........</div> : <div>
      
         {data2.map(item =>
                 
             <div id="result" className={classes.result}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{display:'block', textAlign:'center',color:'#E6E6E6',fontWeight:'bold'}}>
              <p id="title">Base URL</p>
              <a style={{
                    color:'#E9D758',
                    textDecoration:'none'
                  }}>{item.long}</a>
            </div>
            <div style={{color:'#E6E6E6',fontWeight:'bold'}}>
              <p id="title">Shortened URL</p>
            </div>
     
            <div
              id="shortLInk"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                id="linkAndstyle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "8px",
                  fontWeight:'bold'
                }}
              >
                
                <a
                  href={item.short}
     
                  target='_blank'
                  id='myText'
                  style={{
                    color:'#E9D758',
                    textDecoration:'none'
                  }}
                >
                 {baseUrl}
                  {item.short}
                 </a>
                
                {
                <RiFileCopyLine 
                style={{marginLeft:'10px',color:'#E9D758',cursor:'pointer'}} 
                onClick={copy}/> 
                }
              </div>
              <div
                id="stats"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color:'#E6E6E6',
                  fontWeight:'bold'
                }}
                onClick={handleOpen}
              >
                <IoStatsChart style={{ marginRight: "4px" }}  />
                <p>
                  <span>stats</span>
                </p>
              </div>
              <div
                id="click"
                style={{color:'#E6E6E6',fontWeight:'bold'}}
                onClick={() => {
                  console.log(shortUrls);
                }}
              >
                <p>URL clicks - {item.count}</p>
              </div>
            </div>
          </div>
          <button  onClick={()=>  window.history.back()} className={classes.backButton}>Back</button>


          
           
        </div> 
            
            )}
     
     <div>
          
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title" style={{textAlign:'center'}}>URL Statistics</h2>
               {token ? <p id="transition-modal-description"> You Are Authorized User!</p>: <p id="transition-modal-description">Please Log In To See This Information!</p>} 
              </div>
            </Fade>
          </Modal>
        </div>
        <div className={classes.snack}>
          
          <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success">
              URL Copied!
            </Alert>
          </Snackbar>
         </div>
     </div>
          }
          </>
          )
     }
    
     export default GetApi;
    


