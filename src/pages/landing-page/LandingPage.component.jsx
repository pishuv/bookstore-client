import { Link } from 'react-router-dom';
import './landing-page.styles.css'

import video from '../../assets/The Joy of Books.mp4';


const LandingPage = () => {
    
    return (
        <div>
          <section className="showcase">
            <div className="video-container" >
              <video src={video} autoPlay muted loop />
            </div>
            <div className="content">
              <h1>Welcome to the bookstore of EV</h1>
              <Link to="books" className="btn">Start Read</Link>
            </div>
          </section>
          <section id="about">
            <h1>About</h1>
            <p>
              This is a landing page with a full screen video background. 
            </p>
            <h2>Follow Me On Social Media</h2>
            <div className="social">
              <a href="https://www.linkedin.com/in/evyatarvaknin/" target="_blank"><i className="fab fa-twitter fa-3x" /></a>
              <a href="https://www.facebook.com/evyatar.vaknin/" target="_blank"><i className="fab fa-facebook fa-3x" /></a>
              <a href="https://github.com/EvyatarVaknin" target="_blank"><i className="fab fa-github fa-3x" /></a>
              <a href="https://www.instagram.com/evyatarvaknin/?hl=en" target="_blank"><i className="fab fa-linkedin fa-3x" /></a>
            </div>
          </section>
        </div>
      );
}

export default LandingPage;