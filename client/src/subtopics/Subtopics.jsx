import React from 'react';
import List, { Card } from '../common/List';
import NavBar from '../common/NavBar';

const Subtopics = () => {

    return (
        <>
            <NavBar />
            <List>
                <Card title='Subtopic 1' description='Description 1'></Card>
                <Card title='Subtopic 2' description='Description 2'></Card>
                <Card title='Subtopic 3' description='Description 3'></Card>
            </List>
        </>
    );
}

export default Subtopics;