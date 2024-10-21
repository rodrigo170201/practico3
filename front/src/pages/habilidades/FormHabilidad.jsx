import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const FormHabilidad = () => {
    const navigate = useNavigate();
    const [pokemonId, setPokemonId] = useState('');
    const [habilidadIds, setHabilidadIds] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [habilidadList, setHabilidadList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getListaPokemones();
        getListaHabilidades();
    }, []);

    const getListaPokemones = () => {
        axios.get('http://localhost:3000/pokemons')
            .then(res => {
                setPokemonList(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getListaHabilidades = () => {
        axios.get('http://localhost:3000/habilidades')
            .then(res => {
                setHabilidadList(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onChangePokemonId = (e) => {
        setPokemonId(e.target.value);
    };

    const onChangeHabilidadIds = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setHabilidadIds(value);
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false || habilidadIds.length > 2) {
            return;
        }

        const data = {
            pokemonId,
            habilidades: habilidadIds
        };

        // Aquí se llama al endpoint para registrar la relación
        axios.post('http://localhost:3000/habilidades/asignar-habilidades', data)
            .then(res => {
                console.log(res.data);
                navigate('/'); // Redirigir a la página de habilidades después de guardar
            })
            .catch(error => {
                console.log(error);
            });
    };

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
                                <Link className="dropdown-item" to="/tipos/asignar-tipos">Asignar un tipo a Pokémon</Link>
                            </NavDropdown>
                            <NavDropdown title="Habilidades" id="habilidades-dropdown">
                                <Link className="dropdown-item" to={"/habilidades"}>Crear habilidades</Link>
                                <Link className="dropdown-item" to="/habilidades/asignar-habilidades">Asignar habilidad a Pokémon</Link>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Buscar Pokémon"
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
                                    <h2>Registrar Habilidades a Pokémon</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Pokémon:</Form.Label>
                                        <Form.Select required value={pokemonId} onChange={onChangePokemonId}>
                                            <option value="">Seleccione un Pokémon...</option>
                                            {pokemonList.map(pokemon => (
                                                <option key={"pokemon-" + pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un Pokémon.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Habilidades:</Form.Label>
                                        <Form.Select multiple required value={habilidadIds} onChange={onChangeHabilidadIds}>
                                            {habilidadList.map(habilidad => (
                                                <option key={"habilidad-" + habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione hasta 2 habilidades.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar relación</Button>
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

export default FormHabilidad;
