import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

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
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Switch location={location}>
            <Route
              exact
              path='/palette/new'
              render={(routeProps) => (
                <div className='page'>
                  <NewPaletteForm
                    savePalette={savePalette}
                    {...routeProps}
                    palettes={palettes}
                  />
                </div>
              )}
            />

            <Route
              exact
              path='/palette/:paletteId/:colorId'
              render={routeProps => (
                <div className='page'>
                  <SingleColorPalette
                    colorId={routeProps.match.params.colorId}
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                  />
                </div>
              )}
            />
            <Route
              exact
              path='/'
              render={
                (routeProps) => (
                  <div className='page'>
                    <PaletteList
                      palettes={palettes}
                      {...routeProps}
                      deletePalette={deletePalette}
                    />
                  </div>
                )
              }
            />
            <Route
              exact
              path='/palette/:paletteId'
              render={routeProps => (
                <div className='page'>
                  <Palette
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId)
                    )}
                  />
                </div>
              )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />

  );
}

export default App;
