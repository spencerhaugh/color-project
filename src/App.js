import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';

function App() {

  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  function findPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id
    })
  }
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette])
  };
  const deletePalette = (id) => {
    setPalettes(palettes.filter(p => p.id !== id))
  };
  const syncLocalStorage = () => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes))
  };

  useEffect(() => {
    syncLocalStorage()
  });

  return (
    <Switch>
      <Route
        exact
        path='/palette/new'
        render={(routeProps) => <NewPaletteForm savePalette={savePalette} {...routeProps} palettes={palettes} />}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
      <Route
        exact
        path='/'
        render={
          (routeProps) => <PaletteList palettes={palettes} {...routeProps} deletePalette={deletePalette} />
        }
      />
      <Route
        exact
        path='/palette/:paletteId'
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
}

export default App;
