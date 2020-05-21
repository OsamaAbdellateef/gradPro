import React from 'react';
import Carousel from '../../components/carousel/carousel.component';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Footer from '../../components/footer/footer.component';
class Home extends React.Component {
    render() {
        return(
            <section>
            <Carousel />
            </section>
            )
    }
}

export default Home;