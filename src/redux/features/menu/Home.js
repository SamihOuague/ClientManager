import React, { Component } from "react";
import { Container, Card, Image, Button, Navbar, Dropdown } from "react-bootstrap";
import { fetchProd } from "./menuSlice";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
        this.title = "";
        this.describ = "";
        this.price = "";
    }

    handleProd = () => {
        this.props.addProduct({
            title: this.title,
            describ: this.describ,
            price: this.price,
        });
        this.props.closeForm();
    }
    
    UNSAFE_componentWillMount() {
        this.props.fetchProd();
    }

    render() {
        let price = Number.parseFloat(this.props.panier.total).toPrecision(10).split(".");
        return (
            <>
                <Navbar className="border border-bottom" bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">Delivery</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                                    <i className="fas fa-bars"></i> Menu
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/manage">Manage</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Navbar fixed="bottom">
                    <div className="d-flex justify-content-center w-100">
                        <Link to="/basket">
                                <Button size="lg" variant="success" style={{margin: "25px 0"}}>Panier <span style={{marginLeft: "25px"}}>{price[0] + "." + price[1].slice(0, 2)}$</span></Button>
                        </Link>
                    </div>
                </Navbar>
                <Container style={{fontFamily: "Montserrat", padding: "0px 0px 100px 0"}} className="bg-light" fluid>
                    {this.props.menu.menu.map((value, index) => (
                        <div key={index}>
                            <h2 style={{margin: "25px 10px", fontWeight: "800"}}>{value.name}</h2>
                            {value.prod.map((v, i) => (
                                <Card key={i} style={{ display: "flex", 
                                                        flexWrap: "no-wrap", 
                                                        height: "130px", 
                                                        flexDirection: "row", 
                                                        overflow: "hidden", 
                                                        justifyContent: "space-between",
                                                        borderRadius: "0px" }}>
                                    <div style={{ padding: "12px" }}>
                                        <Link style={{textDecoration: "none"}} to={{pathname: "/product/" + value.name + "/" + v.title, state: {v}}}>
                                            <h3 className="text-dark">{v.title}</h3>
                                        </Link>
                                        <p>{v.describ.slice(0, 35)}...</p>
                                        <p className="text-muted">{v.price || "0.00"}$</p>
                                    </div>
                                    <div>
                                        {(v.img) && <Image style={{width: "130px"}} alt="salade tomate" src={("http://localhost:3002/images/" + v.img)}/>}
                                    </div>
                                </Card>
                            ))}
                            {(this.props.auth.logged) && <Button variant="outline-primary" onClick={() => this.props.showForm(value.name) }>Add Product</Button>}
                        </div>
                    ))}
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = {
    fetchProd
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);