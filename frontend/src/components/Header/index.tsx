import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import URLS from '../../utils/urls';
import links from '../../utils/links';
import useLogout from '../../hooks/useLogout';
import './style.scss';

const Header = () => {
  const logout = useLogout();
  const handleOffCanvasClose = () => {
    const el = document.querySelector('.offcanvas-header > .btn-close');
    if (!el) return;
    const btn = el as HTMLButtonElement;
    btn.click();
  };

  return (
    <Navbar bg="light" expand={false}>
      <Container>
        <div>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <NavLink className="navbar-brand ms-4" to={URLS.ROOT}>
            Tark Ladu
          </NavLink>
        </div>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Tark Ladu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {links.map(link => {
                if (link.url === URLS.LOGOUT)
                  return (
                    <Button
                      key={link.label}
                      variant="link"
                      className="ps-0 text-start"
                      onClick={logout}
                    >
                      {link.label}
                    </Button>
                  );
                if (!link.url)
                  return (
                    <span key={link.label}>
                      <br />
                      <label>{link.label}</label>
                    </span>
                  );
                return (
                  <NavLink
                    key={link.url}
                    onClick={handleOffCanvasClose}
                    className="nav-link"
                    to={link.url}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
