import React,{useContext,useEffect,useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import {AppContext} from '../contextApi/GlobalVars';
import Cookies from "universal-cookie";
import axios from 'axios'
const cookies = new Cookies();
const token = cookies.get("TOKEN");
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
        margin: '100px auto',
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



export const Register = () => {
    const classes = useStyles();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordRepeat, setPasswordRepeat] = React.useState("");
    const [buttonText, setButtonText] = React.useState("Submit");
    const [button,setButton] = React.useState(true);
    const [passwordsMatch,setpasswordsMatch] = useState(false)
    const{handleName2,name2} = useContext(AppContext)
    const [registeredEmail,setRegisteredEmail]= useState(false);
    const [registeredName,setRegisteredName] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null)
    let history = useHistory();
/*
    useEffect(() => {
      // set configurations for the API call here
      const configuration = {
        method: "get",
        url: `userdata/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // make the API call
      axios(configuration)
        .then((result) => {
          // assign the message in our result to the message we initialized above
          console.log(result)
          //console.log(result.data[0].name)
         
        const registeredEmail = result.data[0].filter(item => item===name2);
        if(registeredEmail){
          setRegisteredEmail(true)
        }
        })
        .catch((error) => {
          error = new Error();
        });
    }, []);

*/
const handleUserName = (e) =>{
    setName(e.target.value)
   
}

const handleEmail = (e) =>{
    setEmail(e.target.value)
   
}

const handlePassword = (e) =>{
    setPassword(e.target.value)
    
}


const handlePasswordRepeat = (e) =>{
    setPasswordRepeat(e.target.value)
   
}

const valueLength = () => {

  const data = [name,email,password,passwordRepeat]
  const result = data.some(item=>item.length <= 1)
 
   if(result){
      setButton(true)
    }else{
      setButton(false)
    }

 
  }

const onSubmit = (e)=> {
    //history.push("/");
    e.preventDefault()
          
    const configuration = {
      method: "post",
      url: "http://localhost:8000/register",
      data: {
        name,
        email,
        password,
      },
      validateStatus: () => true
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        console.log(result.status)
        //console.log(result.data[0].name)
        if(password !== passwordRepeat){
          setpasswordsMatch(true)
          setRegisteredEmail(false)
          setRegisteredName(false)
          e.preventDefault()
        }else if(result.status===400){
          
          setRegisteredEmail(true)
          setRegisteredName(false)
          setpasswordsMatch(false)
          e.preventDefault();
        }else if(result.status===402){
          setRegisteredName(true)
          setRegisteredEmail(false)
          setpasswordsMatch(false)
        }else{
          alert('Registration successful, you can now log in')
          history.push("/")
        }
     
        })
      .catch((error) => {
        console.log({...error})
        error = new Error();
        //setRegisteredEmail(true)
        e.preventDefault();
      });
    handleName2(email)

}
useEffect(()=>{
  window.localStorage.setItem('name',name)
})

    return (
        <div className={classes.root} >
        <div className={classes.loginAndRegister}>
        <Link to='/'><button className={classes.loginAndRegisterButtons}>Home</button></Link>
            
        </div>
        <div className={classes.body}>
             <form action="/register" method="POST" style={{ display: "contents" }} id ='test2' name='test2' onSubmit={onSubmit} onChange={valueLength} >
          <input
            value={name}
            placeholder="Name"
            onChange={handleUserName}
            className={classes.input}
            name="name"
            id="name"
            //className={classes.urlInput}
          />
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
            name="password"
            id="password"
            type ="password"
            //className={classes.urlInput}
          />
          <input
            value={passwordRepeat}
            placeholder="Repeat password"
            onChange={handlePasswordRepeat}
            className={classes.input}
            name="repeatpassword"
            id="repeatpassword"
            type ="password"
            //className={classes.urlInput}
          />
        
          <button
            className={classes.button}
            /*
            onClick={(e)=> {
              e.preventDefault()
          
              const configuration = {
                method: "post",
                url: "http://localhost:8000/register",
                data: {
                  name,
                  email,
                  password,
                },
                validateStatus: () => true
              };
          
              // make the API call
              axios(configuration)
                .then((result) => {
                  // assign the message in our result to the message we initialized above
                  console.log(result.status)
                  //console.log(result.data[0].name)
                  if(password !== passwordRepeat){
                    setpasswordsMatch(true)
                    setRegisteredEmail(false)
                    setRegisteredName(false)
                    e.preventDefault()
                  }else if(result.status===400){
                    
                    setRegisteredEmail(true)
                    setRegisteredName(false)
                    setpasswordsMatch(false)
                    e.preventDefault();
                  }else if(result.status===402){
                    setRegisteredName(true)
                    setRegisteredEmail(false)
                    setpasswordsMatch(false)
                  }else{
                    alert('Registration successful, you can now log in')
                    history.push("/")
                  }
               
                  })
                .catch((error) => {
                  console.log({...error})
                  error = new Error();
                  //setRegisteredEmail(true)
                  e.preventDefault();
                });
            }}
            */
            type='submit'
            value="POST URL"
            disabled = {button}
          >
            {buttonText}
          </button>
        
        </form>
        {passwordsMatch && <p style={{textAlign:'center'}}>Passwords Don't Match</p>}
        {registeredEmail && <p style={{textAlign:'center'}}><span style={{color:'mediumseagreen',marginRight:'8px'}}>This email</span>already registered!</p>}
        {registeredName && <p style={{textAlign:'center'}}><span style={{color:'mediumseagreen',marginRight:'8px'}}>This name</span>already registered!</p>}
        </div>
        </div>
    )
}
