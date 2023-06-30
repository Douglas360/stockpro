import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => path !== '');

  return (
    <Breadcrumb className="mb-0">
      <BreadcrumbItem>
        <Link to="/dashboards/basic" className="breadcrumb-menu">
          <FontAwesomeIcon icon={faDashboard} />
          <span> Dashboard</span>
        </Link>
      </BreadcrumbItem>

      {pathnames.map((pathname, index) => {
        const route = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <BreadcrumbItem key={route} active={index === pathnames.length - 1}>
            {index === pathnames.length - 1 ? (
              <>
                <FontAwesomeIcon icon={faBusinessTime} />
                <span> {capitalizeFirstLetter(pathname)}</span>
              </>
            ) : (             
             
              <a href={route}>{capitalizeFirstLetter(pathname)}</a>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
