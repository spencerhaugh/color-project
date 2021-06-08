import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './Page';

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
        <CSSTransition key={location.key} classNames='page' timeout={500}>
          <Switch location={location}>
            <Route
              exact
              path='/palette/new'
              render={(routeProps) => (
                <Page>
                  <NewPaletteForm
                    savePalette={savePalette}
                    {...routeProps}
                    palettes={palettes}
                  />
                </Page>
              )}
            />

            <Route
              exact
              path='/palette/:paletteId/:colorId'
              render={routeProps => (
                <Page>
                  <SingleColorPalette
                    colorId={routeProps.match.params.colorId}
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                  />
                </Page>
              )}
            />
            <Route
              exact
              path='/'
              render={
                (routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      {...routeProps}
                      deletePalette={deletePalette}
                    />
                  </Page>
                )
              }
            />
            <Route
              exact
              path='/palette/:paletteId'
              render={routeProps => (
                <Page>
                  <Palette
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId)
                    )}
                  />
                </Page>
              )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />

  );
}

export default App;
