import React from 'react';
import Helmet from 'react-helmet';
import {IMetaProps} from './type';

const Meta = (props: IMetaProps) => {
    return (
        <Helmet>
            <title>{props.title}</title>
            {props.description && (
                <meta name='description' content={props.description} />
            )}
        </Helmet>
    );
};

export default Meta;
