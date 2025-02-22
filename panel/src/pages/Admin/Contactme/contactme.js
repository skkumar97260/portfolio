import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CgSortAz } from 'react-icons/cg';
import { CiFilter } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getContactMe, deleteContactMe } from '../../../api/contactme';
import './contactme.css';
import Header from '../../../components/header';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  padding: 10px;
  width: 100%;
`;

const SearchIcon = styled.span`
  margin-right: 10px;
  color: #b0b3b8;
  font-size: 20px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #b0b3b8;
  font-size: 16px;
  width: 100%;
`;

const ContactmeList = () => {
  const [contactmeList, setContactmeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  useEffect(() => {
    getContactmeList();
  }, []);

  const getContactmeList = () => {
    getContactMe()
      .then((res) => {
        setContactmeList(res?.data?.result);
        console.log("News list", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSerialNumber = (index) => {
    return index + 1 + (currentPage - 1) * newsPerPage;
  };

  const handleDeleteNews = (id) => {
    deleteContactMe(id)
      .then((res) => {
        toast.success(res?.data?.message);
        console.log(res);
        getContactmeList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentcontactme = contactmeList.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(contactmeList.length / newsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h1>Contactme List</h1>
        <Row className="mb-4 d-flex justify-content-between">
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <SearchBarContainer>
              <SearchIcon><CiSearch /></SearchIcon>
              <SearchInput type="text" placeholder="Search Articles ..." />
            </SearchBarContainer>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-start gap-3">
            <div>
              <button className='btn btn-white article_sort'>Sort<CgSortAz /></button>
            </div>
            <div>
              <button className='btn btn-white article_sort'>Filter<CiFilter /></button>
            </div>
          </Col>
        </Row>
        <Table responsive="sm">
          <thead className='bg_table_color'>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Email</th>
              <th scope='col'>Message</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentcontactme.map((data, index) => (
              <tr key={index}>
                <td>{getSerialNumber(index)}</td>
                <td>{data?.name}</td>
                <td>{data?.mobileNumber}</td>
                <td>{data?.email}</td>
                <td>{data?.message}</td>
                <td>{data?.dateTime}</td>
                <td>
                  <div className="dropdown dropdown-action">
                    <button
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-horizontal"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        onClick={() => handleDeleteNews(data?._id)}
                        to={{
                          pathname: "/dashboard/news/newslist",
                        }}
                      >
                        <i className="far fa-eye me-2"></i>
                        &nbsp;Delete
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="mt-4">
          <Col>
            <Pagination className="justify-content-center">
              <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactmeList;
