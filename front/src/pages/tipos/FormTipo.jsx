import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const FormTipo = () => {
    const navigate = useNavigate();
    const [pokemonId, setPokemonId] = useState('');
    const [tipoIds, setTipoIds] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [tipoList, setTipoList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getListaPokemones();
        getListaTipos();
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

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipos')
        .then(res => {
            setTipoList(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const onChangePokemonId = (e) => {
        setPokemonId(e.target.value);
    };

    const onChangeTipoIds = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setTipoIds(value);
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false || tipoIds.length > 2) {
            return;
        }

        const data = {
            pokemonId,
            tipos: tipoIds
        };

        // Aquí se llama al endpoint para registrar la relación
        axios.post('http://localhost:3000/tipos/asignar-tipos', data)
        .then(res => {
            console.log(res.data);
            navigate('/'); 
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
                                <Link className="dropdown-item" to="/tipos/asignar-tipos">Asignar un tipo a pokemon</Link>
                            </NavDropdown>

                            
                            <NavDropdown title="habilidades" id="habilidades-dropdown">
                                <Link className="dropdown-item" to={"/habilidades/create"}>Crear habilidades</Link>
                                <Link className="dropdown-item" to="/habilidades/asignar-habilidades">Asignar habilidad a pokemon</Link>
                            
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
                                    <h2>Registrar Tipos a Pokémon</h2>
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
                                        <Form.Label>Tipos:</Form.Label>
                                        <Form.Select multiple required value={tipoIds} onChange={onChangeTipoIds}>
                                            {tipoList.map(tipo => (
                                                <option key={"tipo-" + tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione hasta 2 tipos.
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

export default FormTipo;
