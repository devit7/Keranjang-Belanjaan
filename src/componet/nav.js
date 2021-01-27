import'./nav.css';
import React from "react"
import {Link} from "react-router-dom"
class nav extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 ">
                        <div className="container-fluid" id="geser">
                            <Link to="/" className="nav-link navbar-brand ">
                                BERANDA
                            </Link>
                            <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                <Link to="/cart" className="nav-link">
                                        KERANJANG
                                </Link>
                                </li>
                            </ul>
                            </div>
                            <form className="d-flex">
                            </form>
                        </div>
                </nav>
            </div>
        );
    }
}


export default nav;