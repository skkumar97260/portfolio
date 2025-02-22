import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import bottomlogo from '../../assets/sinup.webp';
import image from '../../assets/siva.jpg';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './user.css';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import Slider from "react-slick";
import Rightbar from '../../components/rightbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { getIntro } from '../../api/intro';
import { getAbout } from '../../api/about';
import { getProjects } from '../../api/projects';
import { getExperience } from '../../api/experience';
import { getCertification } from '../../api/certification';
import { getEducation } from '../../api/education';
import { getContact } from '../../api/contact';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function User() {

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [intros, setIntros] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [eductionList, setEductionList] = useState([]);
  const [contacts, setContacts] = useState([]);
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
  };
  const handleChange4 = (event, newValue) => {
    console.log(newValue);
    setValue4(newValue);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = async () => {
    try {
      const res = await getIntro();
      console.log(res?.data?.result);
      const res1 = await getAbout();
      const res2 = await getProjects();
      const res3 = await getExperience();
      const res4 = await getCertification();
      const res5 = await getEducation();
      const res6 = await getContact();
      setIntros(res?.data?.result);
      setAbouts(res1.data.result);
      setProjects(res2.data.result);
      setExperiences(res3.data.result);
      setCertifications(res4.data.result);
      setEductionList(res5.data.result);
      setContacts(res6.data.result);
      
    } catch (error) {
      console.log(error);
    }
  };

  const DownloadCV = (about) => {
    if (!about || !about.resume) {
        alert('CV not available');
        return;
    }
    const resumeUrl = about.resume;
    // Fetch the PDF file
    fetch(resumeUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            
            // Create an invisible link element
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'cv.pdf'; // Set the file name here
            
            // Append the link to the body
            document.body.appendChild(a);
            
            // Click the link programmatically to trigger the download
            a.click();
            
            // Clean up
            URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error('Error fetching or processing PDF:', error);
            alert('Failed to download CV. Please try again.');
        });
};

  return (
    <>
      <Header />
      <Rightbar />
      <div className="container  p-3 mt-5">
        {/* Intro Section */}

        <div>
          <h2>Intros</h2>
          <hr />
          <div className='container-fluid developer_background p-5 d-flex justify-content-center align-items-center gap-2 user_intro mt-1 flex-column flex-lg-row'>
            {intros?.map((intro, index) => (
              <><div className='col-12 col-lg-6 col-md-6 mb-4 mb-lg-0'>
                <div className='text-white    '><h5>{intro?.title}</h5></div>
                <div className='d-flex gap-3 '>
                  <h1 className='user_intro_fullname'>{intro?.firstName}</h1>
                  <h1 className='user_intro_fullname'>{intro?.lastName}</h1>
                </div>
                <div>
                  <h2 className='text-white text-bold '>{intro?.caption}</h2>
                </div>
                <div className='text-white'>
                  {intro?.description}
                </div>
                <div className='mt-3'>
                  <Link to="/contactus">
                    <button href="/contactus" className='bg-white text-white text-bold border-2 border border-warning p-2 contact_me'>Contact Me</button>
                  </Link>
                </div>
              </div><div className='col-12 col-lg-6 col-md-6 d-flex justify-content-center align-items-center'>
                  <img className='rounded-circle' src={intro?.image} alt="Developer" height={"300px"} width={"300px"} />
                </div></>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className='mt-5'>
          <div>
            <h2>About</h2>
            <hr />
            {abouts?.map((about, index) => (

              <div className='container-fluid d-flex justify-content-center align-items-center row user_background '>
                <div className=' col-12 col-lg-6 col-md-6'>
                  <div><img src={about?.image} alt="Bottom Logo" height={"100%"} width={"100%"} /></div>
                </div>
                <div className=' col-12 col-lg-6 col-md-6  d-flex flex-column gap-5'>
                  <div className='mt-lg-5 mt-md-5 mt-2 '>
                    <span className='text-black '>
                      {about?.description1}
                    </span>
                  </div>
                  <div className='mt-lg-5 mt-md-5 mt-2 '>
                    <span className='text-black '>
                      {about?.description2}
                    </span>
                  </div>
                    <div>
                    
                        <button className='Download_CV' onClick={() => DownloadCV(about)}>
                          Download CV
                        </button>
                    </div>
                </div>
                <div className='mt-5 '>
                  <div className='text-black '>
                    Here are few technologies I have been working with recently:
                  </div>
                  <div className='col-12 col-lg-12 col-md-12 container-fluid row justify-content-center align-items-center text-center text-primary mb-3 mt-2  '>
                    <Slider {...settings}>
                      {about?.skills.map((skill, index) => (
                        <div className='col-4 col-lg-2 col-md-3 mt-2 border-box  justify-content-center align-items-center m-3'>
                          <div>
                            <div className='d-flex justify-content-center align-items-center'><img src={skill?.image} alt="HTML" className="img-fluid tech-logo " height={150} width={150} /></div>
                            <span className='text-white d-flex justify-content-center align-items-center '>{skill?.skill}</span>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Tabs Section */}
        <div className='mt-5'>
          <h2>Projects</h2>
          <hr />
          <div className='container-fluid row user_about mt-1 user_background1 '>
            <div className='col-12 col-lg-12 col-md-12 d-flex container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
             
              <div className='col-12 col-lg-4 col-md-3 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
                  <Box sx={{ bgcolor: 'background.paper', display: 'flex', height: 'auto', width: 'auto' }}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value1}
                      onChange={handleChange1}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: 'divider', color: "violet", fontWeight: "700", fontSize: "20px" }}
                    >
                       {projects?.map((project, index) => (
                      <Tab label={project?.title} />
                    ))}
                    </Tabs>

                  </Box>
                </div><div className='col-12 col-lg-8 col-md-9'>
                {projects?.map((project, index) => (
                    <div role="tabpanel" hidden={value1 !== index}>
                      <div className='col-12 col-lg-12 col-md-12 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2  '>
                        <div className=' col-12 col-lg-6 col-md-6'>
                          <a href={project?.image}><img src={project?.image} alt="Bottom Logo" height={"50%"} width={"50%"} /></a>
                        </div>
                        <div className=' col-12 col-lg-6 col-md-6  d-flex flex-column gap-2'>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {project?.title}
                            </span>
                          </div>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {project?.role}
                            </span>
                          </div>
                          <div className='mt-1'>
                            <span className='text-black '>
                             {project?.description}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                     ))}
                  </div>
               
            </div>
          </div>
        </div>

        {/* Vertical Tabs Section */}
        <div className='mt-5'>
          <h2>Experience</h2>
          <hr />
          <div className='container-fluid row user_about mt-1 user_background '>
            <div className='col-12 col-lg-12 col-md-12 d-flex container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
              
              <div className='col-12 col-lg-4 col-md-3 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
                  <Box sx={{ bgcolor: '#FCAD7D', display: 'flex', height: 'auto', width: 'auto' }}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value2}
                      onChange={handleChange2}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: 'divider', color: "violet", fontWeight: "700", fontSize: "20px" }}
                    >
                      {experiences?.map((experience, index) => (
                      <Tab label={experience?.year} />
                      ))}
                    </Tabs>

                  </Box>
                </div><div className='col-12 col-lg-8 col-md-9'>
                {experiences?.map((experience, index) => (
                    <div role="tabpanel" hidden={value2 !== index}>
                      <div className='col-12 col-lg-12 col-md-12 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2  '>
                        <div className=' col-12 col-lg-6 col-md-6'>
                          <div className='text-primary'>{experience?.year}</div>
                        </div>
                        <div className=' col-12 col-lg-6 col-md-6  d-flex flex-column gap-2'>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {experience?.company}
                            </span>
                          </div>
                          <div className='mt-1 '>
                            <span className='text-black '>
                             {experience?.role}
                            </span>
                          </div>
                          <div className='mt-1'>
                            <span className='text-black '>
                             {experience?.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>

            
            </div>
          </div>
        </div>

        {/* certification */}
        <div className='mt-5'>
          <h2>Certification</h2>
          <hr />
          <div className='container-fluid row user_about mt-1 user_background1 '>
            <div className='col-12 col-lg-12 col-md-12 d-flex container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
             
              <div className='col-12 col-lg-4 col-md-3 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
                  <Box sx={{ bgcolor: 'background.paper', display: 'flex', height: 'auto', width: 'auto' }}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value3}
                      onChange={handleChange3}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: 'divider', color: "violet", fontWeight: "700", fontSize: "20px" }}
                    >
                       {certifications?.map((certification, index) => (
                      <Tab label={certification?.title} />
                    ))}
                    </Tabs>

                  </Box>
                </div><div className='col-12 col-lg-8 col-md-9'>
                {certifications?.map((certification, index) => (
                    <div role="tabpanel" hidden={value3 !== index}>
                      <div className='col-12 col-lg-12 col-md-12 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2  '>
                        <div className=' col-12 col-lg-6 col-md-6'>
                          <a href={certification?.image}><img src={certification?.image} alt="Bottom Logo" height={"50%"} width={"50%"} /></a>
                        </div>
                        <div className=' col-12 col-lg-6 col-md-6  d-flex flex-column gap-2'>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {certification?.title}
                            </span>
                          </div>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {certification?.role}
                            </span>
                          </div>
                          <div className='mt-1'>
                            <span className='text-black '>
                              {certification?.description}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                     ))}
                  </div>
              
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h2>Education</h2>
          <hr />
          <div className='container-fluid row user_about mt-1 user_background1 '>
            <div className='col-12 col-lg-12 col-md-12 d-flex container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
              <div className='col-12 col-lg-4 col-md-3 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2 '>
                  <Box sx={{ bgcolor: 'background.paper', display: 'flex', height: 'auto', width: 'auto' }}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value4}
                      onChange={handleChange4}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: 'divider', color: "violet", fontWeight: "700", fontSize: "20px" }}
                    >
                        {eductionList?.map((education) => (
                      <Tab label={education?.education} />

                    ))}
                   
                    </Tabs>

                  </Box>
                </div>
               
                <div className='col-12 col-lg-8 col-md-9'>
                {eductionList?.map((education, index) => (
                    <div role="tabpanel" hidden={value4 !== index}>
                      <div className='col-12 col-lg-12 col-md-12 container-fluid row justify-content-center align-items-center text-center text-warning mb-3 mt-2  '>
                        <div className=' col-12 col-lg-6 col-md-6'>
                          <div className='text-primary'>{education?.academicPercentage}%</div>
                        </div>
                        <div className=' col-12 col-lg-6 col-md-6  d-flex flex-column gap-2'>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {education?.academicName}
                            </span>
                          </div>
                          <div className='mt-1 '>
                            <span className='text-black '>
                              {education?.academicPlace}
                            </span>
                          </div>
                          <div className='mt-1'>
                            <span className='text-black '>
                             {education?.academicYear}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                     ))}
                  </div>
               
            </div>
          </div>
        </div>
        {/* contact */}
        <div className='mt-5'>
          <h2>Contact</h2>
          <hr />
          <div className='container-fluid developer_background p-5 d-flex justify-content-center align-items-center gap-2 user_intro mt-1 flex-column flex-lg-row'>
            <div className='col-12 col-lg-6 col-md-6'>
              <div><img src={bottomlogo} alt="Bottom Logo" height={"100%"} width={"100%"} /></div>
            </div>
            {contacts?.map((contact, index) => (
            <div className='col-12 col-lg-6 col-md-6 d-flex flex-column gap-3'>
              <div className='text-white d-flex align-items-center'>name: <div className='text-black ms-2'>{contact?.name}</div></div>
              <div className='text-white d-flex align-items-center'>email: <div className='text-black ms-2'>{contact?.email}</div></div>
              <div className='text-white d-flex align-items-center'>age: <div className='text-black ms-2'>{contact?.age}</div></div>
              <div className='text-white d-flex align-items-center'>gender: <div className='text-black ms-2'>{contact?.gender}</div></div>
              <div className='text-white d-flex align-items-center'>address: <div className='text-black ms-2'>{contact?.address}</div></div>
              <div className='text-white d-flex align-items-center'>phone: <div className='text-black ms-2'>{contact?.phoneNumber}</div></div>
              <div className='text-white d-flex align-items-center'>Languages: <div className='text-black ms-2'>{contact?.languages}</div></div>
              <div className='d-flex justify-content-center'>
                <a href='https://linkedin.com/in/siva-kumar-6106092b4' className='text-white linkedin_icon me-3' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin />
                </a>
                <a href='https://github.com/skkumar97260/' className='text-white github_icon me-3' target='_blank' rel='noopener noreferrer'>
                  <FaGithub />
                </a>
                <a href='https://www.instagram.com/skkumar97260/' className='text-white instagram_icon me-3' target='_blank' rel='noopener noreferrer'>
                  <FaInstagram />
                </a>
              </div>
            </div>
             ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default User;
