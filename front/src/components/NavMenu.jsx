import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavMenu = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, [])

    const getUserInfo = () => {
        axios.get('http://localhost:3000/auth/me', {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setUser(res.data);
        }).catch(error => {
            console.error(error);
        });
    }
    const onCerrarSesionClick = () => {
        axios.post('http://localhost:3000/auth/logout', {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            localStorage.removeItem('token');
            navigate('/');
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Proyecto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {token &&
                            <>
                                <NavDropdown title="Personas" id="personas-dropdown">
                                    <Link className="dropdown-item" to={"/personas"}>Lista de Personas</Link>
                                    <Link className="dropdown-item" to="/personas/create">
                                        Crear Persona
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Mascotas" id="mascotas-dropdown">
                                    <Link className="dropdown-item" to={"/mascotas"}>Lista de Mascotas</Link>
                                    <Link className="dropdown-item" to="/mascotas/create">
                                        Crear Mascota
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Usuarios" id="usuarios-dropdown">
                                    <Link className="dropdown-item" to={"/usuarios"}>Lista de Usuarios</Link>
                                    <Link className="dropdown-item" to="/usuarios/create">
                                        Crear Usuario
                                    </Link>
                                </NavDropdown>
                                {user &&
                                    <NavDropdown title={user.email} id="login-dropdown">
                                        <button className="dropdown-item" onClick={onCerrarSesionClick}>Cerrar sesión</button>

                                    </NavDropdown>}

                            </>
                        }
                        {!token &&
                            <>
                                <Link className="nav-link" to="/">Iniciar sesión</Link>
                                <Link className="nav-link" to="/register">Registro</Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;