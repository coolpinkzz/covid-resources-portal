import Home from './components/Home'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import VolunteerForm from './components/VolunteerForm';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/volunteer">
                    <VolunteerForm />
                </Route>

            </Switch>

        </Router>
    );
}

export default App;
