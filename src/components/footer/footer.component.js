import React from 'react';
import './footer.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSpinner, faChevronLeft, faPhoneVolume, faEnvelope, faAddressCard, faceboo } from '@fortawesome/free-solid-svg-icons';
import { SocialMediaIconsReact } from 'social-media-icons-react';

const Footer = () => (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col col-12 col-md-4 mt-4 mb-3">
                    <div className="content">
                        <h3 className="logo-txt mb-3">صنعتنا</h3>
                        <p>الموقع الأول في الصعيد للبحث عن الصنعة يعد موقع صنعتنا وجهة رئيسية للباحثين عن فرص العمل خاصة اصحاب المؤهلات المتوسطة وغيرها</p>
                    </div>
                </div>
                <div className="col col-12 col-md-4 mt-4 mb-3">
                    <div className="content">
                        <h2 className="mb-3">القائمة</h2>
                        <div className="row">
                            <div className="col-sm-4">
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            الرئيسية
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            الحرفيين
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            المنشورات
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-sm-4">
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            خدمات
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            عن التطبيق
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-12 col-md-4 mt-4 mb-3">
                    <div className="content">
                        <h2 className="mb-3"> تواصل معنا</h2>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                    01116113544
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    SANETNA.ESTABIENA@GMAIL.COM
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faAddressCard} />
                                    EGYPT-ELMINIA
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col col-12 border-t" >
                    <div className="col-md-6">
                        <p>&copy;  2020 San3etna. Privacy Policy
                        </p>
                    </div>
                    <div className="text-center col-md-6">
                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(27,227,248,1)" iconSize="4" roundness="50%" url="https://some-website.com/my-social-media-url" size="34" />

                        <SocialMediaIconsReact
                            borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(30,108,198,1)" iconSize="4" roundness="50%" url="https://some-website.com/my-social-media-url" size="34" />

                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="googleplus" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(211,61,90,1)" iconSize="4" roundness="50%" url="https://some-website.com/my-social-media-url" size="34" />
                    </div>

                </div>
            </div>
        </div>
    </footer>
)

export default Footer;