import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  let [inputValue, setInputValue] = useState(localStorage.getItem("longURls") );
  let [name2,setName] = useState(localStorage.getItem("name"))
  let [globalName2,setGlobalName2] = useState(localStorage.getItem("globalName"));
const takeInput = (inputValue) => {
    setInputValue(inputValue);
  };

const handleName2 = (value) => {
  setName(value)
}

const handleGlobalName = (value) => {
  setGlobalName2(value)
}

  return (
    <AppContext.Provider value={{ inputValue, takeInput,name2,handleName2,handleGlobalName,globalName2 }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };