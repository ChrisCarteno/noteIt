// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NoteBookForm from "./components/NotebookForm";
import NotesForm from "./components/NotesForm";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import NotebookList from "./components/NotebookList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/notebookList">
            <NotebookList />
          </Route>
          <Route exact path="/new/notebook">
            <NoteBookForm />
          <Footer />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;