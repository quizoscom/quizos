import React from 'react';
import Logo from '../../assets/logo.png';

const emailTemplate = () => (
    <div style={{
        margin: '0 auto',
        width: '70%',
        background: 'linear-gradient(to right, #49a09d, #5f2c82)',
        marginTop: '3em',
        paddingBottom: '46px'
    }}>
        <div style={{
            textAlign: 'left',
            padding: '6px'
        }}>
            <img style={{width: '51px'}} src={Logo} alt="evaluiz.com Logo"/>
        </div>
        <div>
            <p style={{                
                color: '#fff',
                fontSize: '36px'
            }}>
                Reset Password
            </p>
            <a style={{
                    display: 'block',
                    width: '53%',
                    margin: '0 auto',
                    backgroundColor: '#f9a825',
                    padding: '2px 14px',
                    fontSize: '20px',
                    color: '#333',
                    textDecoration: 'none'
            }} href="http://localhost:3000"><p>Click to Reset your Password </p></a>
        </div>
    </div>
);

export default emailTemplate;