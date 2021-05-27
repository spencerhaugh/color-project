import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import seedColors from './seedColors';

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <Switch>
      <Route exact path='/' render={() => <h1>Palette List!</h1>} />
      <Route exact path='/palette/:id' render={() => <h1>This is a Palette!</h1>} />
    </Switch>

    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
