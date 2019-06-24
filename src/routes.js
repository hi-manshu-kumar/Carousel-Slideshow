import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './hoc/layout.js';
import Home from './Components/Home';
import Slider from './Components/Slider/slider'
import DetailForm from './Components/SliderInfo/slideDetailsForm';
import error from './Components/404/index'

const Routes = () => (
    <Layout>
        <Switch>
            <Route path="/img" exact component={DetailForm}/>
            <Route path="/slider" exact component={Slider}/>
            <Route path="/" exact component={Home}/>
            <Route path="*" component={error}/>
        </Switch>
    </Layout>
)

export default Routes;