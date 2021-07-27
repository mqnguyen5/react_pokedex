import { Route, Switch } from "react-router-dom";

import Pokedex from "./components/Pokedex";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <>
      <h1>React Pokedex</h1>

      <Switch>
        <Route exact path="/">
          <Pokedex />
        </Route>
        <Route path="/pokemon/:id">
          <PokemonDetails />
        </Route>
        <Route path="*">
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
