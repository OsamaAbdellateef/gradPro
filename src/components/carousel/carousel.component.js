import React from 'react';
import {BrowserRouter ,Link} from 'react-router-dom';
import './carousel.style.scss';
import {carousel} from 'react-bootstrap';
import BtnLink from './../button/btn.component';
import path from './../../images/member images/member5.jpg'
import CarouselLogo from '../../images/worker.png';


var p = require('./../../images/member images/member5.jpg');

const Carousel = () => (
<header className="mainView">


        <div className="carousel-content text-center">
            <img className="mb-3" width="30%" src={CarouselLogo} />
            <h1 className="title text-center mb-4">مرحبابكم في موقع صنعتنا</h1>
            <p className="text-center mb-4 font-md">يعد موقع صنعتنا وجهة رئيسية للباحثين عن فرص العمل خاصة اصحاب المؤهلات المتوسطة وغيرها</p>
            <BrowserRouter>
                <BtnLink className="but " to="noPlace">نشر وظيفة</BtnLink>
                <BtnLink className="but " to="notyet ">البحث عن راغبي العمل</BtnLink>
            </BrowserRouter>         
        </div>

    </header>    
)

export default Carousel;