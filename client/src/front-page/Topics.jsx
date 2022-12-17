import React from 'react';
import List, { Card } from '../common/List';

const Topics = () => {
    return (
        <List>
            <Card title='Title 1' description='Description 1'></Card>
            <Card title='Title 2' description='Description 2'></Card>
            <Card title='Title 3' description='Description 3'></Card>
            <Card title='Title 4' description='Description 4'></Card>
        </List>
    );
}

export default Topics;