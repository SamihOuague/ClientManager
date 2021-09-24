import React, { Component } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { getProduct, fetchProd } from "./menuSlice";
import { addToBask, addProd, rmProd, backHome } from "../panier/panierSlice";
import { Link, Redirect } from "react-router-dom";

class Product extends Component {
    constructor(props) {
        super(props);
        this.redirect = false;
    }
    
    handleBask = (prod) => {
        this.redirect = true;
        this.props.addToBask(prod);
    }

    handleRedirect = () => {
        this.redirect = true;
        this.props.backHome();
    }

    UNSAFE_componentWillMount() {
        const { id, cat } = this.props.match.params;
        this.props.fetchProd().then(() => {
            this.props.getProduct({id, cat});
        });
    }

    render() {
        const prod = this.props.menu.currProd;
        let price = (prod) ? Number.parseFloat(prod.price * this.props.panier.counter).toPrecision(10).split(".") : null;
        return(
            (this.redirect) ? <Redirect to="/"/>
                :
                <>
                    <div className="border border-bottom d-flex align-items-center" style={{width: "100%", height: "50px", padding: "0px 10px", marginBottom: "25px", fontFamily: "Montserrat"}}>
                        <Link to="/">
                            <i className="fas fa-chevron-left"></i>
                        </Link>
                        <div style={{width: "100%"}}>
                            {(prod) && <h3 className="text-center" style={{margin: "15px 0"}}>{prod.title}</h3>}
                        </div>
                    </div>
                    <Container className="bg-light" style={{ fontFamily: "Montserrat" }}>
                            {(prod) &&
                                <>
                                    <div className="d-flex justify-content-center" style={{marginBottom: "15px"}}>
                                        {(prod.img) && <Image alt="salade tomate" src={"http://localhost:3002/images/" + prod.img} width="350px"/>}
                                    </div>
                                    <p>{prod.describ}</p>
                                    <p className="text-muted">{prod.price}$</p>
                                </>
                            }
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div style={{margin: "15px 0", display: "flex", justifyContent: "space-between", width: "180px", alignItems: "center"}}>
                                    <Button onClick={() => this.props.rmProd()} variant="outline-danger">-</Button>
                                    <span>{this.props.panier.counter}</span>
                                    <Button onClick={() => this.props.addProd()} variant="outline-success">+</Button>
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <Button style={{margin: "5px 0"}} onClick={() => this.handleBask(prod)} variant="success">Total : {(price) && (price[0] + "." + price[1].slice(0,2))}$</Button>
                                <Button style={{margin: "5px 0"}} onClick={() => this.handleRedirect()} variant="outline-secondary">Annuler</Button>
                            </div>
                    </Container>
                </>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = {
    getProduct,
    addToBask,
    addProd,
    rmProd,
    backHome,
    fetchProd
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);