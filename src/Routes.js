import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main/Main';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const Routes = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default Routes;
