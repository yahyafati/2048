import React from "react";
import {
    AiFillChrome,
    AiFillGithub,
    AiFillInstagram,
    AiFillMail,
} from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <p className="desc">
                This is just <span className="_2048">2048</span>.
            </p>
            <p className="desc">Who needs animation? Not me!</p>
            <div className="socials-container">
                <a className="social-icon" href="https://github.com/yahyafati">
                    <AiFillGithub />
                </a>
                <a className="social-icon" href="https://yahyafati.com">
                    <AiFillChrome />
                </a>
                <a
                    className="social-icon"
                    href="https://instagram.com/yahyafati8"
                >
                    <AiFillInstagram />
                </a>
                <a className="social-icon" href="mailto:yfati037@gmail.com">
                    <AiFillMail />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
