/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Navbar, NavDropdown, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListaPokemon = () => {
    const [listaPokemons, setListaPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getListaPokemons();
        document.title = "Catálogo pokemons";
    }, []);

    const getListaPokemons = () => {
        axios.get('http://localhost:3000/pokemons')
            .then(res => {
                setListaPokemons(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                getListaPokemons();  // Se llama a la función para refrescar la lista tras eliminar
            }).catch(error => {
                console.log(error);
            });
    };

    // Función para filtrar los Pokémon según el término de búsqueda
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

            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <h2>Catálogo de Pokémon</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive className="mt-3">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>PokedexID</th>
                                            <th>Foto</th>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>HP</th>
                                            <th>Habilidades</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPokemons
                                            .filter(pokemon =>
                                                pokemon.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .map(pokemon => (
                                                <tr key={pokemon.id}>
                                                    <td>{pokemon.nroPokedex}</td>
                                                    <td>
                                                        <Link to={`/pokemons/${pokemon.id}/detail`}>
                                                            <img
                                                                src={`http://localhost:3000/pokemons/${pokemon.id}.jpg`}
                                                                alt={pokemon.nombre}
                                                                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10%" }}
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td>{pokemon.nombre}</td>
                                                    <td>
                                                        {pokemon.tipos && pokemon.tipos.length > 0
                                                            ? pokemon.tipos.map(tipo => tipo.nombre).join(', ')
                                                            : 'Sin tipo'}
                                                    </td>
                                                    <td>{pokemon.hp}</td>
                                                    <td>
                                                        {pokemon.habilidades && pokemon.habilidades.length > 0
                                                            ? pokemon.habilidades.map(habilidad => habilidad.nombre).join(', ')
                                                            : 'Sin habilidades'}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link className="btn btn-success btn-sm" to={`/pokemons/${pokemon.id}/foto`}>Subir Imagen</Link>
                                                            <Link className="btn btn-primary btn-sm" to={`/pokemons/${pokemon.id}`}>Editar</Link>
                                                            <Button variant="danger" size="sm" onClick={() => eliminar(pokemon.id)}>Eliminar</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListaPokemon;
