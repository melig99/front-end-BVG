import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const  MenuSuperior = () => {
  return (
    <div style={{position: "absolute", width: "100%", backgroundColor: "#154360"}}>
      <Navbar >
        <Container>
          <Navbar.Brand href="#home">
            {/* <img 
              alt=""
              src="/log.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}*/}

          </Navbar.Brand>
        </Container>
      </Navbar>

    </div>
  );
}

export default MenuSuperior;