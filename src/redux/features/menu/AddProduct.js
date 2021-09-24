import React, { Component } from "react";
import { Container, FormControl, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { postProd, postPic } from "./menuSlice";
import { Redirect, Link } from "react-router-dom";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.picRef = React.createRef();
        this.canvas = React.createRef();
        this.title = "";
        this.describ = "";
        this.price = "";
        this.redirect = false;
        this.state = {
            isDown: false,
            x: 0,
            y: 0,
            natWidth: 0,
            natHeight: 0,
            height: 300,
            width: 300,
            urlPic: null,
            initialZoom: 100
        }
    }

    handleProd = () => {
        const { natWidth, natHeight, urlPic, width, x, y } = this.state;
        const { title, describ, price } = this;
        let ctx = this.canvas.current.getContext("2d");
        let nZoom = Number(this.picRef.current.style.backgroundSize.replace("%", ""));
        let ratio = natWidth / natHeight;
        let img = new Image();
        this.redirect = true;
        if (urlPic) {
            img.src = urlPic;
            img.onload = () => {
                ctx.drawImage(img, x, y, (width * (nZoom / 100)), ((width * (nZoom / 100)) / ratio));
                this.props.postPic(this.canvas.current.toDataURL()).then((res) => {
                    this.props.postProd({categorie: this.props.match.params.cat, prod: {title, describ, price, img: res.payload.message}});
                });
            }
        } else {
            this.props.postProd({categorie: this.props.match.params.cat, prod: {title, describ, price}});
        }
    }

    handleZoom = (e) => {
        const { natHeight, natWidth, width, height, initialZoom } = this.state;
        const ratio = natWidth / natHeight;
        const zoom = (initialZoom + Number(e.target.value)) / 100;
        let pic = e.target.parentNode.children[0];
        let coord = pic.style.backgroundPosition.replaceAll("px", "").split(" ").map((v) => (Number(v)));
        let limitX = -1 * ((zoom * width) - width);
        let limitY = -1 * ((zoom * (width / ratio)) - height);
        if (coord[0] < limitX)
            coord[0] = limitX;
        if (coord[1] < limitY)
            coord[1] = limitY;
        this.setState({x: coord[0], y: coord[1]}, () => {
            pic.style.backgroundPosition = coord[0] + "px " + coord[1] + "px";
            pic.style.backgroundSize = (initialZoom + Number(e.target.value)) + "%";
        });
    }
    
    handleUp = (e) => {
        const { height, width, natWidth, natHeight, isDown } = this.state;
        const ratio = natWidth / natHeight;
        let zoom = Number(this.picRef.current.style.backgroundSize.replace("%", "")) / 100;
        let rect = this.picRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left - this.state.x;
        let y = e.clientY - rect.top - this.state.y;
        let limitX = -1 * ((zoom * width) - width);
        let limitY = -1 * ((zoom * (width / ratio)) - height);
        if (isDown) {
            x = (x <= 0) ? x : 0;
            x = (x > limitX) ? x : limitX;
            y = (y <= 0) ? y : 0;
            y = (y > limitY) ? y : limitY;
            this.setState({isDown: false, x: x, y: y});
        }
    }
    
    handleDown = (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left - this.state.x;
        let y = e.clientY - rect.top - this.state.y;
        this.setState({isDown: true, x: x, y: y});
    }
    
    handleMove = (e) => {
        const { height, width, natWidth, natHeight } = this.state;
        const ratio = natWidth / natHeight;
        const zoom = Number(this.picRef.current.style.backgroundSize.replace("%", "")) / 100;
        let rect = this.picRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left - this.state.x;
        let y = e.clientY - rect.top - this.state.y;
        let limitX = -1 * ((zoom * width) - width);
        let limitY = -1 * ((zoom * (width / ratio)) - height);
        if(this.state.isDown) {
            x = (x <= 0) ? x : 0;
            x = (x > limitX) ? x : limitX;
            y = (y <= 0) ? y : 0;
            y = (y > limitY) ? y : limitY;
            this.picRef.current.style.backgroundPosition = x + "px " + y + "px";
        }
    }
    

    handlePic = (e) => {
        const { height, width, initialZoom } = this.state;
        let reader = new FileReader();
        let img = new Image();
        reader.onloadend = () => {
            img.src = reader.result;
            img.onload = () => {
                let ratio = img.width / img.height;
                let res = (ratio * height) - width;
                let nZoom = initialZoom;
                if (img.width > img.height)
                    nZoom = initialZoom + Math.round((res / width) * 100);
                this.setState({
                    urlPic: reader.result, 
                    natWidth: img.width, 
                    natHeight: img.height, 
                    initialZoom: nZoom,
                });
            };
        };
        if (e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
    }

    render() {
        const { height, width, urlPic, initialZoom } = this.state;
        return(
            (this.redirect) ? <Redirect to="/manage"/>
                :
            <>
                <div className="border border-bottom d-flex align-items-center" style={{width: "100%", height: "50px", padding: "0px 10px", marginBottom: "25px", fontFamily: "Montserrat"}}>
                    <Link to="/">
                        <i className="fas fa-chevron-left"></i>
                    </Link>
                    <div style={{width: "100%"}}>
                        <h3 className="text-center">{this.props.match.params.cat}</h3>
                    </div>
                </div>
                <Container onMouseMove={(e) => this.handleMove(e)} onMouseUp={(e) => this.handleUp(e)}>
                    <Form style={{margin: "25px 0", fontFamily: "Montserrat"}}>
                        <Form.Group style={{margin: "5px 0"}}>
                            <Form.Label>Titre produit</Form.Label>
                            <Form.Control type="text" onChange={(e) => this.title = e.target.value} placeholder="Titre produit"/>
                        </Form.Group>
                        <Form.Group style={{margin: "5px 0"}}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => this.describ = e.target.value} placeholder="Description produit"/>
                        </Form.Group>
                        <Form.Group style={{margin: "5px 0"}}>
                            <Form.Label>Prix</Form.Label>
                            <Form.Control onChange={(e) => this.price = e.target.value} type="number" placeholder="Prix produit"/>
                        </Form.Group>
                    </Form>
                    <div className="d-flex justify-content-center align-items-center bg-light">
                        <div className="d-flex flex-column align-items-center" >
                            <div className="border border-dark" 
                                style={{
                                    width: width + "px", 
                                    height: height + "px", 
                                    backgroundImage: "url(" + urlPic + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: (initialZoom + 50) + "%",
                                    backgroundPosition: "0px 0px", 
                                    cursor: "grab"
                                }}
                                ref={this.picRef}
                                onMouseDown={(e) => this.handleDown(e)}
                                >
                            </div>
                            <canvas style={{marginTop: "15px", display: "none"}} width="300" height="300" ref={this.canvas}></canvas>
                            <input style={{margin: "15px 0"}} type="range" onChange={(e) => this.handleZoom(e)}/>
                            <FormControl onChange={(e) => this.handlePic(e)} type="file" name="pic"/>
                            <Button style={{margin: "5px 0"}} variant="outline-primary" onClick={() => this.handleProd()}>Ajouter</Button>
                        </div>
                    </div>
                </Container>
            </>
        );
    }
}

const mapDispatchToProps = {
    postProd,
    postPic
}

export default connect(null, mapDispatchToProps)(AddProduct);