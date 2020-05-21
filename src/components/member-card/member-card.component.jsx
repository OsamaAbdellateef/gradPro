import React from 'react';
import './member-card.style.scss';
import './../../'
const MemberCard = ({ name, job, imgSrc, link, desc }) => (
    <div className="member-card col col-12 col-md-6 col-lg-4 text-center" style={{ overflow: 'hidden' }}>
        <div className="inner-content text-center">
            <div className="img-container">
                <img src={require(`./../../images/member images/${imgSrc}`)} />
            </div>
            <h3 className="text-center">{name}</h3>
            <span className="member-job">{job}</span>
            <p className="text-center">{desc}</p>
        </div>
    </div>
)

export default MemberCard;