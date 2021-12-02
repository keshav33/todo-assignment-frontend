import React from 'react';
import { Table, Checkbox, Button, Segment, Dimmer, Loader } from 'semantic-ui-react';

const TodoTable = (props) => {
    const generateTableBody = () => {
        if (props.allTodos.length > 0) {
            return (
                props.allTodos.map((todoObject, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell collapsing><Checkbox /></Table.Cell>
                            <Table.Cell width={8}>{todoObject.todo}</Table.Cell>
                            <Table.Cell>{todoObject.date}</Table.Cell>
                            <Table.Cell>{todoObject.time}</Table.Cell>
                            <Table.Cell>
                                <Button primary>Edit</Button>
                                <Button primary onClick={() => props.deleteTodo(todoObject._id)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })
            )
        } else {
            return (
                <div>
                    No Todo Added!
                </div>
            )
        }
    }

    const getLoader = () => {
        return (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        )
    }

    if (props.loading) {
        return getLoader()
    }
    return (
        <>
            <div>
                <h2 className='todoHeading'>All Todo's</h2>
            </div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Completed</Table.HeaderCell>
                        <Table.HeaderCell>Todo</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {generateTableBody()}
                </Table.Body>
            </Table>
        </>
    )
}

export default TodoTable;