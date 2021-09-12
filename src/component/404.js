import React from 'react'
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
 
    loginAndRegisterButtons:{
        borderRadius: "6px",
        height: "40px",
        border: "2px solid darkslategray",
        cursor: "pointer",
        fontSize: "18px",
        background: "#222",
        color: "#E9D758",
        width: '180px',
        margin:'10px',
        fontFamily: 'Merienda',
        transition: '0.2s all',
        "&:hover": {
          background: "#E9D758",
          color: "black",
        }
      }
}))
export const Page404 = () => {
    const classes = useStyles();
    return (
        <div>
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>4<span>0</span>4</h1>
			</div>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
		
            <Link to='/'><button className={classes.loginAndRegisterButtons}>home page</button></Link>
		</div>
	</div>

            
            
        </div>
    )
}
