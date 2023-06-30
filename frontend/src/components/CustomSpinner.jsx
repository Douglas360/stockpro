import React from 'react'
import { Spinner } from 'reactstrap';

export const CustomSpinner = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50
            }}
        >
            <Spinner style={{ width: '10rem', height: '10rem' }} color="primary" />
        </div>
    )
}
