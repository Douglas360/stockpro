import React, { Fragment } from 'react';
import {
  DropdownToggle, DropdownMenu,
  Nav, Button, NavItem, NavLink,
  UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';
import {
  toast,
  Bounce
} from 'react-toastify';
import {
  faCalendarAlt,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import imgAvatar from '../../../../../frontend/src/assets/utils/images/avatars/avatarBlank.png';
import { useAuth } from '../../../context/AuthContext/useAuth';

const UserBox = () => {
  const notify2 = () => {
    toast("You don't have any new items in your calendar for today! Go out and play!", {
      transition: Bounce,
      closeButton: true,
      autoClose: 5000,
      position: 'bottom-center',
      type: 'success'
    });
  };

  const { user,signOut } = useAuth();


  const handleLogout = () => {
    signOut();
  }

  return (
    <Fragment>
      <div className="header-btn-lg pe-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0">
                  <img width={42} className="rounded-circle" src={imgAvatar} alt="" />
                  <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu end className="rm-pointers dropdown-menu-lg">
                  <Nav vertical>
                    <NavItem className="nav-item-header">
                      Conta
                    </NavItem>
                    <NavItem>
                      <NavLink href={`/configuracao/usuario/editar/${user?.id}`}>
                        Configurações
                        <div className="ms-auto badge bg-success">New</div>
                      </NavLink>
                    </NavItem>
                    <NavItem>

                    </NavItem>
                    <NavItem>
                      <NavLink href="#" onClick={handleLogout}>
                        Sair
                      </NavLink>                      
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <div className="widget-content-left  ms-3 header-user-info">
              <div className="widget-heading">
                {user?.nome}
              </div>
              {/* <div className="widget-subheading">
                VP People Manager
  </div>*/}
            </div>
            {/*<div className="widget-content-right header-user-info ms-3">
              <Button className="btn-shadow p-1" size="sm" onClick={notify2} color="info" id="Tooltip-1">
                <FontAwesomeIcon className="me-2 ms-2" icon={faCalendarAlt} />
              </Button>
              <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                Click for Toastify Notifications!
              </UncontrolledTooltip>
</div>*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserBox;
