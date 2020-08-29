import React, {useEffect, useState} from 'react'
import '../App.css'
import {Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faBullseye, faHourglassEnd} from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format'

const Dashboard = (props) => {


    const {
        country,
        totalConfirmed, 
        totalRecovered,
        totalDeaths
    } = props;

    return(
        <div className = "dashboard">
            <Container>

                <div className = "border-left-primary text-uppercase p-2 text-primary mb-3"> {country === "" ? "GLOBAL COVID19 REPORT" : country}</div>
                <Row>
                    <Col md="4">
                        <Card className = "border-left-primary py-2 border-radius-10 shadow my-3">
                            <CardBody>
                                <Row className = "no-gutters align-items-center">
                                    <Col className = "mr-2">
                                        <div className = "text-primary font-weight-bold text-uppercase">Total Confirmed</div>
                                        <div className = "text-uppercase h4 font-weight-normal text-gray-d text-info mb-0">
                                            <NumberFormat value={totalConfirmed} displayType={'text'} thousandSeparator={true} />
                                            </div>
                                        <div className = "card-icons"><FontAwesomeIcon className = "text-gray-l fa-2x" icon={faGlobe} /></div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md="4">
                        <Card className = "border-left-success py-2 border-radius-10 shadow my-3">
                            <CardBody>
                                <Row className = "no-gutters align-items-center">
                                        <Col className = "mr-2">
                                            <div className = "text-primary font-weight-bold text-uppercase">Total Recovered</div>
                                            <div className = "text-uppercase h4 font-weight-normal text-gray-d text-info mb-0">
                                            <NumberFormat value={totalRecovered} displayType={'text'} thousandSeparator={true} />
                                                </div>
                                            <div className = "card-icons"><FontAwesomeIcon className = "text-gray-l fa-2x" icon={faBullseye} /></div>
                                        </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md="4">
                        <Card className = "border-left-warning py-2 border-radius-10 shadow my-3">
                            <CardBody>
                                <Row className = "no-gutters align-items-center">
                                        <Col className = "mr-2">
                                            <div className = "text-primary font-weight-bold text-uppercase">Total Deaths</div>
                                            <div className = "text-uppercase h4 font-weight-normal text-gray-d text-info mb-0">
                                            <NumberFormat value={totalDeaths} displayType={'text'} thousandSeparator={true} />
                                                </div>
                                            <div className = "card-icons"><FontAwesomeIcon className = "text-gray-l fa-2x" icon={faHourglassEnd} /></div>
                                        </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard