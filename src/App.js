import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Table from "./components/Table";

function App() {
    return (
        <div className="App">
            <div>
                <header id="header"><div id="logo" onClick={()=>(window.location='/')}><img src="./logo.png"/></div></header>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/table' element={<Table/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
