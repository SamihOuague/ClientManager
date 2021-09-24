import React, { Component } from "react";
import { Container, Alert, Form, Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { showForm, closeForm, fetchProd, postProd, postCategorie, setPreview, postPic } from "./menuSlice";
import { Link } from "react-router-dom";

class Manage extends Component {
    constructor(props) {
        super(props);
        this.title = "";
        this.describ = "";
        this.price = "";
        this.cat = "";
    }

    handleProd = () => {
        const { title, describ, price } = this;
        const prvw = this.props.menu.preview;
        if (prvw) {
            this.props.postPic(prvw).then((res) => {
                this.props.postProd({categorie: this.props.menu.currCat, prod: {title, describ, price, img: res.payload.message}});
            });
        } else {
            this.props.postProd({categorie: this.props.menu.currCat, prod: {title, describ, price}});
        }
        this.props.closeForm();
    }

    handleImage = (e) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.props.setPreview(reader.result);
        }
        if (e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
    }

    UNSAFE_componentWillMount() {
        this.props.fetchProd();
    }

    render() {
        return (
            <>
                <div className="border border-bottom d-flex align-items-center" style={{width: "100%", height: "50px", padding: "0px 10px", marginBottom: "25px", fontFamily: "Montserrat"}}>
                    <Link to="/">
                        <i className="fas fa-chevron-left"></i>
                    </Link>
                    <div style={{width: "100%"}}>
                        <h3 className="text-center">Manage Menu</h3>
                    </div>
                </div>
                <Container>
                    <div className="d-flex justify-content-between">
                        <Form style={{margin: "25px 0", width: "500px"}}>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Control onChange={(e) => this.cat = e.target.value} placeholder="Titre categorie"/>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-success" onClick={() => this.props.postCategorie(this.cat)}>Add</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </div>
                    {this.props.menu.menu.map((value, index) => (
                        <Alert key={index} variant="primary">
                            <div className="d-flex justify-content-between">
                                <h3>{value.name}</h3>
                                <Button as={Link} to={"/add/" + value.name} variant="link" size="lg" style={{fontSize: "25px", textDecoration: "none"}} onClick={() => this.props.showForm(value.name)}>+</Button>
                            </div>
                            <ul>
                                {value.prod.map((val, i) => (
                                    <li key={i}>{val.title}</li>
                                ))}
                            </ul>
                        </Alert>
                    ))}
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = {
    showForm,
    closeForm,
    fetchProd,
    postProd,
    postCategorie,
    setPreview,
    postPic
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);