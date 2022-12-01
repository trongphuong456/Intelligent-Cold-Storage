import React from 'react'
import "./footer.css"
export default function Footer() {
  return (
    <div className='footer'>
        <footer>
            <div className='row'>
                <div className='col'>
                    <img src="images/logo_mind.png" alt='logo' className="logo" />
                </div>
                <div className='col'>
                    <h3>Contact <div className="underline"><span></span></div></h3>
                    <p>377 Nguyen Van Linh</p>
                    <p>Da Nang City, VietNam</p>
                    <p className='"email-id'>info@iotmind.vn</p>
                    <h4>(+84) 905 559562</h4>
                </div>
                <div className="col">
                    <h3>Links <div className="underline"><span></span></div></h3>
                    <ul>
                        <li><a href="">HOME</a></li>
                        <li><a href="#MONITORING">MONITORING BOARD</a></li>
                        <li><a href="#DASHBOARD">DASHBOARD</a></li>
                        <li><a href="#WARNING">WARNING TABLE</a></li>
                        <li><a href="#WAREHOUSE">WAREHOUSE</a></li>
                    </ul>
                </div>
                <div className="col">
                    <h3>Newsletter <div className="underline"><span></span></div></h3>
                    <form action="">
                        <i className='ti ti-email'></i>
                        <input type="emali" placeholder='Enter your email id' required />
                        <button type='submit'><i className='ti ti-arrow-circle-right'></i></button>
                    </form>
                    <div className="social-icons">
                        <i className='ti ti-facebook'></i>
                        <i className='ti ti-twitter-alt'></i>
                        <i className='ti ti-youtube'></i>
                        <i className='ti ti-pinterest-alt'></i>                    
                    </div>
                </div>
            </div>
        </footer>
        <hr/>
    </div>
  )
}
