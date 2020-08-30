import React from 'react'
import {Container} from 'reactstrap'
import '../App.css'

const Footer = (props) => {

    return(
        <React.Fragment>
            <div className = "footer py-4 mt-5 shadow">
                <Container>
                    <center className = "footer-text">Developed and Maintained by Similoluwa Okunowo</center>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Footer;