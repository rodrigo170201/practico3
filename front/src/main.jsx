import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaPokemon from './pages/pokemons/ListaPokemons.jsx';
import FotoPokemon from './pages/pokemons/FotoPokemon.jsx';
import FormPokemon from './pages/pokemons/FormPokemon.jsx';
import FormTipo from './pages/tipos/FormTipo.jsx';
import FormHabilidad from './pages/habilidades/FormHabilidad.jsx';
import DetailPokemon from './pages/pokemons/DetailPokemon.jsx';
import FormNewHabilidad from './pages/habilidades/FormNewHabilidad.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaPokemon />,
  },
  {
    path: '/pokemons',
    element: <ListaPokemon />
  },
  {
    path: "/pokemons/create",
    element: <FormPokemon />
  },
  
  {
    path: "/habilidades/create",
    element: <FormNewHabilidad />
  },
  {
    path: "/pokemons/:id",
    element: <FormPokemon />
  },
  {
    path: '/pokemons/:id/foto',
    element: <FotoPokemon />
  },
  {
    path: "/tipos/asignar-tipos",
    element: <FormTipo />
  },
  {
    path: "/habilidades/asignar-habilidades",
    element: <FormHabilidad/>
  },
  {
    path: "/pokemons/:id/detail",
    element: <DetailPokemon />
  },
  {
    path: "/habilidades",
    element: <FormNewHabilidad />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
