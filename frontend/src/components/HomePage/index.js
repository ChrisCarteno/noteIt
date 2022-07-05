import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getAllnotes } from "../../store/note"
import Navigation from "../Navigation";

import logo from "./logo.png"
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(false);
    const userId = useSelector((state) => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        .then(()=> setUser(true))
        console.log(user, "is the user true", 'something else');
        if(user){
        console.log("in hte use Effect thingy, APp.js", userId);
        dispatch(getAllnotes(userId.id))
        }
      }, [dispatch, user]);

      return (
        <>

        </>
      );
}


export default HomePage;