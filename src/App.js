import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';

function App() {
  function findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id
    })
  }
  return (
    <Switch>
      <Route exact
        path='/'
        render={
          (routeProps) => <PaletteList palettes={seedColors} {...routeProps} />
        } />
      <Route exact
        path='/palette/:id'
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id)
            )}
          />
        )}
      />
      <Route exact
        path='/palette/:paletteId/:colorId' render={() => <SingleColorPalette />} />
    </Switch>
  );
}

export default App;
