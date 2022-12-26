import React from 'react';

interface PageHeaderProps {
    headerText: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ headerText }) => {
    return (
        <div className='Page-Header'>
            <div className="wrapper">
                <h1>{headerText}</h1>
            </div>
        </div>
    );
}

export default PageHeader;