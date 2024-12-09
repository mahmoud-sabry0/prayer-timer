import React from "react";
import Maincontent from "./components/Maincontent/Maincontent";
import { Container } from "@mui/material";

export default function App() {
  return (
    <>
    
      <div 
        style={{ width:"100vw"}}
      >
       <Container>
          <Maincontent/>
          </Container>
      </div>
      
    </>
  );
}
