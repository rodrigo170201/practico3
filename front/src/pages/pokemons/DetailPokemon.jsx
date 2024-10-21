import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, NavDropdown, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const DetailPokemon = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    const getPokemonById = async (pokemonId) => {
        try {
            const res = await axios.get(`http://localhost:3000/pokemons/${pokemonId}/detail`);
            setPokemon(res.data);
        } catch (error) {
            console.log("Error fetching Pokemon details", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Función para calcular el rango basado en los stats y nivel
    //const calculateRange = (stat, level) => {
    //   return Math.round(stat * (level / 100));
    //};


    if (!pokemon) return <div>Loading...</div>;

    return (
        <>
            {/* Header con Navbar */}
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Bulbapédia 0.5</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <NavDropdown title="Pokémons" id="pokemons-dropdown">
                                <Link className="dropdown-item" to="/">Lista de Pokémons</Link>
                                <Link className="dropdown-item" to="/pokemons/create">Crear Pokémon</Link>
                                <Link className="dropdown-item" to="/tipos/asignar-tipos">Asignar tipo a pokemon</Link>
                            </NavDropdown>

                            <NavDropdown title="Habilidades" id="habilidades-dropdown">
                                <Link className="dropdown-item" to="/habilidades">Crear habilidades</Link>
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

            {/* Detalle del Pokémon */}
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                            {/* Parte superior con datos e imagen */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                {/* Izquierda - Información */}
                                <div className="datos" style={{ flex: '1', paddingRight: '10px' }}>
                                    <div className="info" style={{ borderRight: '1px solid #ddd', paddingRight: '10px' }}>
                                        <div><strong>Nombre:</strong> {pokemon.nombre}</div>
                                        {/* Nuevo div para mostrar Tipos y Habilidades */}
                                        <div className="tipo-habilidad" style={{ display: 'flex', marginTop: '10px' }}>
                                            {/* Div para mostrar Tipos */}
                                            <div className="tipo" style={{ flex: '1', paddingRight: '10px', borderRight: '1px solid #ddd' }}>
                                                <strong>Tipos:</strong>
                                            <div>
                                                    {pokemon.tipos && pokemon.tipos.length > 0
                                                        ? pokemon.tipos.map(tipo => tipo.nombre).join(', ')
                                                            : 'Sin tipo'}
                                                        </div>
                                            </div>

                                                {/* Div para mostrar Habilidades */}
                                                <div className="habilidades" style={{ flex: '1', paddingLeft: '10px' }}>
                                                <strong>Habilidades:</strong>
                                                <div>
                                                    {pokemon.habilidades && pokemon.habilidades.length > 0
                                                        ? pokemon.habilidades.map(habilidad => habilidad.nombre).join(', ')
                                                        : 'Sin habilidades'}
                                                </div>
                                            </div>
                                        </div>
                                        <div><strong>Descripción:</strong> {pokemon.descripcion}</div>
                                        <div><strong>HP:</strong> {pokemon.hp}</div>
                                    </div>
                                </div>
                                {/* Derecha - Imagen y Número */}
                                <div className="foto" style={{ flex: '1', textAlign: 'center' }}>
                                    <div style={{ height: '15%', marginBottom: '10px' }}>
                                        <strong>Nro Pokedex:</strong> {pokemon.nroPokedex}
                                    </div>
                                    <div style={{ height: '85%' }}>
                                        <img
                                            src={`http://localhost:3000/pokemons/${pokemon.id}.jpg`}
                                            alt={pokemon.nombre}
                                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Parte inferior - Evolución */}
                            <div className="evolucion" style={{ textAlign: 'center', paddingTop: '20px' }}>
                                <strong>Espacio para Evolución</strong>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DetailPokemon;
