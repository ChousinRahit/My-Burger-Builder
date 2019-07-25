import React from "react";
import myLogo from "../../../Assets/Images/myLogo.jpg";
import classes from "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedinIn,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

function footer() {
  return (
    <div>
      <footer className={classes.Footer}>
        <div className={classes.FooterLeft}>
          <img src={myLogo} alt="of my logo" />
        </div>
        <div className={classes.FooterRight}>
          <a
            href="https://twitter.com/KChousin"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.Twitter}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.linkedin.com/in/chousinRahitK"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.Linkedin}
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://github.com/ChousinRahit"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.Github}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <p style={{ fontSize: "0.6em" }}>
          Dev. <span style={{ fontFamily: "Rock Salt" }}>Rahit K.C</span> &copy;
          2019
        </p>
      </footer>
    </div>
  );
}

export default footer;
