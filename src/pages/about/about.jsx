import React from 'react';
import './about.scss';
import OurTeamPreview from '../../components/our-team-preview/our-team-preview.component';
//import AppImage from '../../images/background/header-image.jpg';
import AppImg from '../../images/header-image.jpg';
import UnderlineHeader from '../../components/underline-header/underline-header.component';


const About =  () => (

    <section className="about container " style={{marginTop:"100px"}}>
        <div className="about-app">
            <div className="row">
                <div className=" col col-12 col-md-6">
                    <UnderlineHeader>
                        عن التطبيق
                    </UnderlineHeader>
                    <p> يهدف  صنعتنا الى مساعدة ابناء الصعيد في الاماكن  النائية الراغبين في فرص  عمل في الأماكن والمضطرين الي السفر في وجه بحري او حتى خارج الدولة مما يساهم في زيادة فرص العمل على مستوى الصعيد وتخفيف الضغط على الوجه البحري وقد تم اصدار تطبيق خاص بصنعتنا  </p>
                </div>
                <div className="col col-12 col-md-6">
                    <img  src={AppImg} />                   
                </div>
            </div>
        </div>
        <OurTeamPreview />
    </section>

)


export default About;