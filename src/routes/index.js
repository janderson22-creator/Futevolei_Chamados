import { Switch } from 'react-router-dom'
import  Route  from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashBoard from '../pages/DashBoard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/dashboard" component={DashBoard}  isPrivate/>
            <Route exact path="/" component={SignIn} />   
            <Route exact path="/register" component={SignUp} />   
            <Route exact path="/profile" component={Profile} isPrivate/> 
            <Route exact path='/arenas' component={Customers} isPrivate/>  
            <Route exact path='/new' component={New} isPrivate />
            <Route exact path='/new/:id' component={New} isPrivate />
        </Switch>
    )
}