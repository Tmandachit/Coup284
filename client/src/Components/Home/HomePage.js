import {Component} from 'react';
import { Link } from "react-router-dom";
import jillian from '../Assets/jillybackground.jpeg'
import './HomePage.css'

class HomePage extends Component {
    render() { 
        return (  
        <div className="homeContainer">
            <h1>Welcome to Coup</h1>
            <p>A game of deduction and deception</p>
            <img src={jillian} alt="chicken-leg"/>
            <div className="input-group-btn">
                <Link className="home" to="/create" >Create Game</Link>
            </div>
            <div className="input-group-btn">
                <Link className="home" to="/join" >Join Game</Link>
            </div>
        </div>
        );
    }
}
 
export default HomePage;