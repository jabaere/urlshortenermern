
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect,useContext } from "react";
import {AppContext} from '../contextApi/GlobalVars';
import {GiAquarium} from "react-icons/gi";
import {GiAnubis} from "react-icons/gi";
import {GiAnt} from "react-icons/gi";
import {GiBatteredAxe} from "react-icons/gi";
import {GiCobweb} from "react-icons/gi";
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
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
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  footer:{
    display:'flex',
    justifyContent:"space-evenly",
    paddingTop: 'calc(100vh - 85vh)',
    flexDirection:'column'
  },
  footerIConSize:{
    width: '42px',
    height:'42px',
    cursor:'pointer',
    
    "&:hover": {
      color: "#E9D758",
   
    },
  },
  loginAndRegister:{
    display:'flex',
    justifyContent:'end',
    height: '50px',
    alignItems: 'center',
    marginRight: '25px'

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
export const LoggedUser = (props) => {
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const [searchText, setSearchText] = React.useState("Submit");
  const regex =  /^(ftp|http|https):\/\/[^ "]+$/;
  const [button,setButton] = React.useState(true)
  const{takeInput,inputValue,name2,globalName2,handleGlobalName} = useContext(AppContext)
  const [text,setText] = useState(null)
  const [registeredUserName,setRegisteredUsername] = useState('');
  const data =  ['For Web', 'For Battle','For Work','For Strength', 'For Freedom']
  let history = useHistory();
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: `userdata/${name2}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };



    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
       // console.log(result)
        //console.log(result.data[0].name)
       
        setRegisteredUsername(result.data[0].name);
        window.localStorage.setItem('globalName',result.data[0].name)
        handleGlobalName(result.data[0].name)
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/", sameSite: "lax",
   });
   window.localStorage.setItem('globalName','')
   handleGlobalName('')
   // console.log('token removed')
    // redirect user to the landing page
    history.push("/");
  }
 
 /*const data = [
    {id:1, icon:  <GiCobweb/>, phase:'For Web'},
    {id:2, icon:  <GiBatteredAxe/>, phase:'For Battle'},
    {id:3, icon:  <GiAnt/>, phase:'For Work'},
    {id:4, icon:  <GiAnubis/>, phase:'For Strength'},
    {id:5, icon:  <GiAquarium/>, phase:'For Freedom'}
]
*/
  function inputOnChange(event) {
    setInput(event.target.value);
    //console.log(event.target.value.length)
    if(!regex.test(event.target.value) && event.target.value.length !== 0){
      setSearchText(<span style={{color:'red'}}>Please enter valid URL</span>)
      setButton(true)
    }else if(regex.test(event.target.value)){
      setButton(false)
      setSearchText('Search')
    }else{
      setSearchText('Search')
      setButton(true)
     
    }

  }

  useEffect(()=>{
    window.localStorage.setItem('longURls',input)
  },[input])

  
  const onSubmit = (e)=> {
     setSearchText('Submit')
     takeInput(input)
  }
  const onClick = () =>{
    setSearchText('Loading...')

  }

const clickFor = (e)=>{

 setText(e.currentTarget.id)
 console.log(e.currentTarget.id)
 setTimeout(function(){ setText(null); }, 7000);
}



   return (
    <div >
      <div className={classes.loginAndRegister}>
       {globalName2&&<><span style={{margin:'12px',color:'mediumseagreen'}}>Hello</span> <span style = {{color:'#E9D758',fontWeight:'bold'}}>{globalName2}</span></>}
       <Link to='/'><button onClick={() => logout()} className={classes.loginAndRegisterButtons}>{globalName2 ? 'Log Out': 'Home'}</button></Link>
      </div>

      <header className={classes.header}>
        <h1 style={{color:'E6E6E6'}}>
          Link analytics,URL shortener
          <span style={{ color: "#E9D758", fontSize: "calc(100vw - 93.5vw)" }}>
            .
          </span>
        </h1>
      </header>
      <article className={classes.body}>
        <form action="/shortUrls" method="POST" style={{ display: "contents" }} id ='test2' name='test2' onSubmit={onSubmit} >
          <input
            value={input}
            placeholder="Get Short URL..."
            onChange={inputOnChange}
            className={classes.input}
            name="url"
            id="url"
            //className={classes.urlInput}
          />
        
        
          <button
            className={classes.button}
            onClick={onClick}
            type='submit'
            value="POST URL"
            disabled = {button}
          >
            {searchText}
          </button>
        
        </form>
          
          
      </article>
      <div style={{height: 'calc(30vh)', color:'mediumseagreen'}}><h2 style={{textAlign:'center'}}>{data[text]}</h2></div>
      <footer className={classes.footer}>
     
      <div style ={{display:'flex',justifyContent:'space-evenly'}}>


       <GiCobweb className={classes.footerIConSize} id='0' onClick={clickFor}/>
       <GiBatteredAxe className={classes.footerIConSize} id='1' onClick={clickFor}/>
       <GiAnt className={classes.footerIConSize} id='2' onClick={clickFor}/>
       <GiAnubis className={classes.footerIConSize} id='3' onClick={clickFor}/>
       <GiAquarium className={classes.footerIConSize} id='4' onClick={clickFor}/>
       
       {/*data.map((item,index)=>{
         {item.icon}
       })*/}
      </div>
      </footer>
      
    </div>
);

}





  


        
 

