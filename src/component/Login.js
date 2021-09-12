import React,{useState,useContext} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import {AppContext} from '../contextApi/GlobalVars';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();


const useStyles = makeStyles((theme) => ({
 
    root:{
      display:'flex',
      flexDirection:'column'
    },

    body: {
      display: "flex",
      flexDirection: "column",
      width: "30%",
      backgroundColor: "#3d4148",
      padding: "25px",
      borderRadius: "8px",
      margin: '110px auto',
      [theme.breakpoints.down("1024")]: {
        width: "75%",
      },
      
    },
    input: {
      borderRadius: "8px",
      height: "35px",
      border: "none",
      marginBottom: "10px",
      padding: "1px",
      paddingLeft: "15px",
    },
    button: {
      borderRadius: "8px",
      height: "35px",
      border: "none",
      cursor: "pointer",
      fontSize: "21px",
      fontFamily: 'Merienda',
      "&:hover": {
        background: "#282c34",
        color: "#E9D758",
      },
    },
    loginAndRegister:{
        display:'flex',
        justifyContent: 'end'
      },
      loginAndRegisterButtons:{
        borderRadius: "6px",
        height: "30px",
        border: "2px solid darkslategray",
        cursor: "pointer",
        fontSize: "18px",
        background: "#3d4148",
        color: "#E9D758",
        width: '110px',
        margin:'10px',
        fontFamily: 'Merienda',
        "&:hover": {
          background: "#E9D758",
          color: "black",
        }
      }

        
  }));

export const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [buttonText, setButtonText] = React.useState("Submit");
    const [button,setButton] = React.useState(true)
    const [login, setLogin] = useState(false);

    const{handleName2} = useContext(AppContext)
    let history = useHistory();

  
const handleEmail = (e) =>{
  setEmail(e.target.value)
  
}

const handlePassword = (e) =>{
    setPassword(e.target.value)
 
}

const valueLength = () => {

if(email.length <= 1){
  setButton(true)
}else if(password.length <= 1){
  setButton(true)
}else{
  setButton(false)
}
}


const onSubmit = (e) => {
  // prevent the form from refreshing the whole page
  e.preventDefault();
  handleName2(email)
  // set configurations
  const configuration = {
    method: "post",
    url: "http://localhost:8000/login",
    data: {
      email,
      password,
    },
  };

  // make the API call
  axios(configuration)
    .then((result) => {
      // set the cookie
      cookies.set("TOKEN", result.data.token, {
        path: "/",
        sameSite: "lax",
        
      });
     // console.log('token set')
      // redirect user to the auth page
      history.push("/logged");

      
    })
    .catch((error) => {
      error = new Error();
      setLogin(true);
    });
    
};


    return (
        <div className={classes.root} >
         <div className={classes.loginAndRegister}>
               <Link to='/'><button className={classes.loginAndRegisterButtons}>Home</button></Link>
                   
         </div>
         <div className={classes.body}>
              
             <form onChange={valueLength} style={{ display: "contents" }} id ='test2' name='test2' onSubmit={(e) => onSubmit(e)} >
          <input
            value={email}
            placeholder="Email"
            onChange={handleEmail}
            className={classes.input}
            name="email"
            id="email"
            type='email'
            //className={classes.urlInput}
          />
          <input
            value={password}
            placeholder="Password"
            onChange={handlePassword}
            className={classes.input}
            name="email"
            id="email"
            type ="password"
            //className={classes.urlInput}
          />
        
          <button
            className={classes.button}
            type='submit'
            value="POST URL"
            disabled = {button}
          >
            {buttonText}
          </button>
        
        </form>
        {login && <p style={{textAlign:'center'}}>Password or Email Is Wrong</p>}
        </div>
        
        </div>
       
    )
}
