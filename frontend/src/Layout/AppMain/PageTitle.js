import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import BreadCrumb from './BreadCrumb/BreadCrumb';

const PageTitle = ({
    enablePageTitleIcon,
    enablePageTitleSubheading,
    heading,
    icon,
    subheading
}) => {
    return (
        <div className="app-page-title">
            <div className="page-title-wrapper">
                <div className="page-title-heading">
                    <div className={cx('page-title-icon', { 'd-none': !enablePageTitleIcon })}>
                        <i className={icon} />
                    </div>
                    <div>
                        {heading}
                        <div className={cx('page-title-subheading', { 'd-none': !enablePageTitleSubheading })}>
                            {subheading}
                        </div>
                    </div>
                </div>
                <div className="page-title-actions">
                    <BreadCrumb />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
