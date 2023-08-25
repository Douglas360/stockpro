import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Slider } from "react-burgers";
import AppMobileMenu from '../AppMobileMenu';
import { setEnableClosedSidebar, setEnableMobileMenu, setEnableMobileMenuSmall } from '../../reducers/ThemeOptions';
import { useAuth } from '../../context/AuthContext/useAuth';

const imgDefault = "utils/logo/logo.png";
function HeaderLogo(props) {
    const [active, setActive] = useState(false);
    const { user } = useAuth();
    const toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar, setEnableClosedSidebar } = props;
        setEnableClosedSidebar(!enableClosedSidebar);
    }

    const imgLogo = user?.logo ? user.logo : imgDefault;

    const { enableClosedSidebar } = props;

    return (
        <React.Fragment>
            <div className="app-header__logo">
                {/*<img src={imgLogo} alt="logo" width="95%" height="95%" style={{ marginRight: 10 }} />*/}
                <img
                    src={imgLogo}
                    alt="logo"
                    style={{ maxWidth: '100%', maxHeight: '100%', margin: 10 }}
                />
                <div className="header__pane ms-auto">
                    <div onClick={toggleEnableClosedSidebar}>
                        <Slider
                            active={enableClosedSidebar}
                            type="elastic"
                            onClick={() => setActive(!active)}
                        />
                    </div>
                </div>
            </div>
            <AppMobileMenu />
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({
    setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
    setEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
