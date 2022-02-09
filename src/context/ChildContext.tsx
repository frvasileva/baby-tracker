import React from "react";

// set the defaults
const ChildContext = React.createContext({
  currentChildId: "12345",
  setCurrentChildId: (value: string) => { console.log("value", value) }
});

export default ChildContext;
