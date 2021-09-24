import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeToBask, addToBask } from "./panierSlice";

class Basket extends Component {
    render() {
        let price = Number.parseFloat(this.props.panier.total).toPrecision(10).split(".");
        return (
            <>
                <div className="border border-bottom d-flex align-items-center" style={{width: "100%", height: "50px", padding: "0px 10px", fontFamily: "Montserrat", marginBottom: "25px"}}>
                    <Link to="/">
                        <i className="fas fa-chevron-left"></i>
                    </Link>
                    <div style={{width: "100%"}}>
                        <h2 className="text-center" style={{margin: "15px 0"}}>Panier</h2>
                    </div>
                </div>
                <Container style={{ fontFamily: "Montserrat" }}>
                    {this.props.panier.order.map((value, key) => (
                        <div key={key}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "200px"}}>
                                <span style={{fontSize: "21px"}}>{value.title}</span>
                                <Button onClick={() => this.props.removeToBask(value.title)} style={{width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center"}} variant="outline-danger">
                                    <span>-</span>
                                </Button>
                                <span style={{fontSize: "21px"}}>x{value.quantity}</span>
                                <Button onClick={() => this.props.addToBask({title: value.title, price: value.price})} style={{width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center"}} variant="outline-success">
                                    <span>+</span>
                                </Button>
                            </div>
                            <p className="text-muted">{value.price}$</p>
                        </div>
                    ))}
                    <p style={{fontSize: "21px"}}>Total: <span style={{marginLeft: "25px"}}>{price[0] + "." + price[1].slice(0, 2)}$</span></p>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = {
    removeToBask,
    addToBask
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);