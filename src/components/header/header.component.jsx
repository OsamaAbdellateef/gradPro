import React from 'react';
import './header.style.scss';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { auth } from './../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Header = ({ currentUser, id }) => (

    <React.Fragment>

        <Navbar className="navbar" expand="lg">
            <Container>


                <Navbar.Brand className="logo-txt mr-2" href="/">صنعتنا</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="mr-2" href="/">الرئيسية</Nav.Link>
                        <NavDropdown className="mr-2" title="الحرفيين" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/crafts/كهربائي">كهربائيين</NavDropdown.Item>
                            <NavDropdown.Item href="/crafts/سباك"> سباكيين</NavDropdown.Item>
                            <NavDropdown.Item href="/crafts/محار">محاريين</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/posts" className="mr-2">
                            المنشورات
                    </Nav.Link>
                        <Nav.Link className="mr-2" href="/contact-us">
                            تواصل معنا
                    </Nav.Link>
                        <Nav.Link className="mr-2" href="/signin">
                            الخدمات
                    </Nav.Link>
                        <Nav.Link className="mr-2" href="/about">
                            عن التطبيق
                    </Nav.Link>
                        {currentUser ?
                            <Nav.Link className="mr-2" onClick={() => auth.signOut()} >
                                تسجيل الخروج
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" transform="left-4" />
                            </Nav.Link>
                            :
                            <Nav.Link className="mr-2" href="/signin">
                                تسجيل الدخول
                        <FontAwesomeIcon icon={faSignInAlt} size="lg" transform="left-4" />
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    </React.Fragment>

)



const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}


export default connect(mapStateToProps)(Header);