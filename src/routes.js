import React, { Component } from 'react';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Post from './components/post/Post';

import{Switch,Route} from 'react-router-dom';
export default (

        <Switch>
        <Route path='/' component={Auth} exact />
        <Route  path='/dashboard' component={Dashboard} />
        <Route  path='/post/:postid' component={Post} />
        <Route path='/new' component={Form} />
        </Switch>
)