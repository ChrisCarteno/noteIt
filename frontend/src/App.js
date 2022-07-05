// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import NoteBookForm from "./components/NotebookForm";
import NotebookList from "./components/NotebookList";
import Note from "./components/NotesList";
import HomePage from "./components/HomePage";

function App() {


  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user);
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
      <Route exact path ='/notebooks/:id'>
        <NotebookList/>
      </Route>
      <Route path="/notebooks/new">
        <NoteBookForm />
      </Route>
      <Route exact path='/note/:id'>
        <Note />
      </Route>
      <Route path="/" exact>
        {userId &&
        <>
        <HomePage isLoaded={isLoaded}/>
        <Footer />
        </>
        }
        {!userId &&
        <>
        <SplashPage/>
        <Footer />
        </>
        }
      </Route>
    </Switch>
      )}
    </>
  );
}

export default App;