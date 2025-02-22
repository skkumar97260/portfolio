import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import React from 'react';
const rightbar = () => {
    return (
        <div className='rightbar d-flex '>
        <div className=" d-flex flex-column  ">
      <a href='https://www.linkedin.com/in/siva-kumar-6106092b4/' className='text-primary  linkedin_icon me-3' target='_blank' rel='noopener noreferrer'>
        <FaLinkedin />
      </a>
      <a href='https://github.com/skkumar97260/' className='text-primary github_icon me-3' target='_blank' rel='noopener noreferrer'>
        <FaGithub />
      </a>
      <a href='https://www.instagram.com/skkumar97260/' className='text-primary instagram_icon me-3' target='_blank' rel='noopener noreferrer'>
        <FaInstagram />
      </a>
      
    </div>
    </div>
    )
}   

export default rightbar;