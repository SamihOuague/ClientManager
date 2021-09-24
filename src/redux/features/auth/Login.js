import React, { Component } from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import { login } from "./authSlice";
import { connect } from "react-redux";

class Login extends Component {
    
    render() {
        return (
            <Container style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                <Card style={{ width: "500px", padding: "15px" }}>
                    <Form>
                        <Form.Group style={{ marginBottom: "25px" }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Your Email"/>
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "25px" }}>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Your Password"/>
                        </Form.Group>
                        <Button onClick={() => this.props.login()} variant="outline-dark">Se connecter</Button>
                    </Form>
                </Card>
            </Container>    
        );
    }
}

const mapDispatchToProps = {
    login
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);