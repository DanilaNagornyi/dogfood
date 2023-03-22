import React from 'react';
import Accordion from "../../components/Accordion/Accordion";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import {fagData} from "./data";

const FAQPage = () => {
    return (
        <div>
            <ContentHeader title="Часто спрашивают"/>

            {fagData.map(({title, content}) => <Accordion key={title} title={title}>{content}</Accordion>)}
        </div>
    );
};

export default FAQPage;
