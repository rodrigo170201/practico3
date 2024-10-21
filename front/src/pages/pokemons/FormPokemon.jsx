/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [nroPokedex, setNroPokedex] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [spattack, setSpattack] = useState('');
    const [spdefense, setSpdefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [nivelEvolucion, setNivelEvolucion] = useState('');
    const [idEvPrevia, setIdEvPrevia] = useState('');
    const [idEvSiguiente, setIdEvSiguiente] = useState('');
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (id) {
            getPokemonById();
        }
    }, [id]);

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                const pokemon = res.data;
                setNombre(pokemon.nombre);
                setNroPokedex(pokemon.nroPokedex);
                setDescripcion(pokemon.descripcion);
                setHp(pokemon.hp);
                setAttack(pokemon.attack);
                setDefense(pokemon.defense);
                setSpattack(pokemon.spattack);
                setSpdefense(pokemon.spdefense);
                setSpeed(pokemon.speed);
                setNivelEvolucion(pokemon.nivelEvolucion);
                setIdEvPrevia(pokemon.idEvPrevia);
                setIdEvSiguiente(pokemon.idEvSiguiente);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        setValidated(true);

        const pokemon = {
            nombre,
            nroPokedex,
            descripcion,
            hp,
            attack,
            defense,
            spattack,
            spdefense,
            speed,
            nivelEvolucion,
            idEvPrevia,
            idEvSiguiente
        };

        if (id) {
            editPokemon(pokemon);
        } else {
            insertPokemon(pokemon);
        }
    };

    const editPokemon = (pokemon) => {
        axios.put(`http://localhost:3000/pokemons/${id}`, pokemon)
            .then(res => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const insertPokemon = (pokemon) => {
        axios.post('http://localhost:3000/pokemons', pokemon)
            .then(res => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
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
                                    <h2>Formulario de Pokémon</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese el nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nro Pokedex:</Form.Label>
                                        <Form.Control required value={nroPokedex} type="number" onChange={(e) => setNroPokedex(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese el número de Pokedex.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control value={descripcion} as="textarea" onChange={(e) => setDescripcion(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>HP:</Form.Label>
                                        <Form.Control required value={hp} type="number" onChange={(e) => setHp(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese el HP.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Ataque:</Form.Label>
                                        <Form.Control required value={attack} type="number" onChange={(e) => setAttack(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese el ataque.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Defensa:</Form.Label>
                                        <Form.Control required value={defense} type="number" onChange={(e) => setDefense(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese la defensa.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Ataque Especial:</Form.Label>
                                        <Form.Control required value={spattack} type="number" onChange={(e) => setSpattack(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese el ataque especial.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Defensa Especial:</Form.Label>
                                        <Form.Control required value={spdefense} type="number" onChange={(e) => setSpdefense(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese la defensa especial.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Velocidad:</Form.Label>
                                        <Form.Control required value={speed} type="number" onChange={(e) => setSpeed(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese la velocidad.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nivel de Evolución:</Form.Label>
                                        <Form.Control value={nivelEvolucion} type="number" onChange={(e) => setNivelEvolucion(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Evolución Previa:</Form.Label>
                                        <Form.Control value={idEvPrevia} type="number" onChange={(e) => setIdEvPrevia(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Evolución Siguiente:</Form.Label>
                                        <Form.Control value={idEvSiguiente} type="number" onChange={(e) => setIdEvSiguiente(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Pokémon</Button>
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

export default FormPokemon;
