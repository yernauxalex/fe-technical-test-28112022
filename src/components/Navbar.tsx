import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Front end hiring test</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        By:{" "}
                        <a
                            href="#https://www.linkedin.com/in/yernauxalexis/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Yernaux Alexis
                        </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
