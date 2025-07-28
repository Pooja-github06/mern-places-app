import React, { Suspense } from 'react';
import mongoose from 'mongoose';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
// import Auth from './Users/pages/Auth'
// import Users from './../src/Users/pages/Users';
// import NewPlace from './../src/places/pages/NewPlace'
// import UpdatePlace from './places/pages/UpdatePlace';
import { AuthContext } from './shared/context/auth-context';
import './App.css';

import MainNavigation from './shared/components/Navigation/MainNavigation';
// import UserPlaces from './places/pages/UserPlaces';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
let logoutTimer;

const Users = React.lazy(() => import('../src/Users/pages/Users.js'))
const NewPlace = React.lazy(() => import('./../src/places/pages/NewPlace'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./Users/pages/Auth.js'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))




function App() {
  const { login, token, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    // <React.Fragment>
    //   <Header />
    //   <main>
    //  <NewProduct onAddProduct={addProductHandler} /> 
    //     {isLoading && <p className="loader">Loading...</p>}
    //     {!isLoading && <ProductList items={loadedProducts} />} 
    //     <NewGoal addonGoals={addcourseAddhandler} />
    //     <GoalList goals={courseGoals} />

    //   </main>
    // </React.Fragment>
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main><Suspense fallback={<div className="center"><LoadingSpinner /></div>}>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>

  )
}

export default App;
