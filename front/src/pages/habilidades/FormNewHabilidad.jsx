import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const FormNewHabilidad = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda en el Navbar

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const nuevaHabilidad = { nombre };

        axios.post('http://localhost:3000/habilidades', nuevaHabilidad)
            .then(res => {
                console.log(res.data);
                navigate(`/`); // Redirige a la página principal o la lista de habilidades
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Manejador de búsqueda (actualmente no implementa ninguna búsqueda)
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Bulbapédia 0.5</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <NavDropdown title="Pokémons" id="pokemons-dropdown">
                                <Link className="dropdown-item" to={"/"}>Lista de Pokémons</Link>
                                <Link className="dropdown-item" to="/pokemons/create">Crear Pokémon</Link>
                                <Link className="dropdown-item" to="/tipos/asignar-tipos">Asignar tipo a pokemon</Link>
                            </NavDropdown>
                            <NavDropdown title="Habilidades" id="habilidades-dropdown">
                                <Link className="dropdown-item" to="/habilidades/create">Crear Habilidad</Link>
                                <Link className="dropdown-item" to="/habilidades/asignar-habilidades">Asignar habilidad a pokemon</Link>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Buscar Habilidad"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-success">Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Crear Nueva Habilidad</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre de la habilidad:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={nombre}
                                            onChange={onChangeNombre}
                                            placeholder="Ingrese el nombre de la habilidad"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre válido.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Habilidad</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormNewHabilidad;
