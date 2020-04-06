import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import reactJsHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import javascript from "../../../assets/img/jpg/javascript-es6.jpg";
import wordpress from "../../../assets/img/jpg/wordpress.jpg";
import prestaShop from "../../../assets/img/jpg/prestashop-1-7.jpg";
import cssGrid from "../../../assets/img/jpg/css-grid.jpg";

import './HomeCourses.scss';

export default function HomeCourses() {
    return(
        <Row className="home-courses">
            <Col lg={24} className="home-courses__title">
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-courses">
                    <Col md={6}>
                        <CardCourse 
                            image={reactJsHooks}
                            title="React JS Hooks"
                            subtitle="Intermedio - React/Javascript"
                            link="https://germanps.com/courses/react"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={reactNative}
                            title="React Native Expo"
                            subtitle="Intermedio - React/Javascript"
                            link="https://germanps.com/courses/react-native-expo"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={javascript}
                            title="Javascript ES6"
                            subtitle="Básico - Javascript"
                            link="https://germanps.com/courses/javascript"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={wordpress}
                            title="Wordpress"
                            subtitle="Básico - Wordpress"
                            link="https://germanps.com/courses/wordpress"
                        />
                    </Col>
                    <Col md={6}> 
                        <CardCourse 
                            image={prestaShop}
                            title="Prestashop 1.7"
                            subtitle="Básico - React/Javascript"
                            link="https://germanps.com/courses/prestashop"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={cssGrid}
                            title="Css Grid"
                            subtitle="Intermedio - CSS"
                            link="https://germanps.com/courses/css-grid"
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
            <Col lg={24} className="home-courses__more">
                <Link to="/courses">
                    <Button>Ver más</Button>
                </Link>
            </Col>
        </Row>
    );
}


function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return(
        <a href={link} target="_blank" rel="noopen noreferrer">
            <Card
                className="home-courses__card"
                cover={<img src={image} alt={title} />}
                actions={[<Button>Ingresar</Button>]}
            >
                <Meta title={title} description={subtitle}/>
            </Card>
        </a>
    )
}