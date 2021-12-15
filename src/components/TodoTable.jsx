import React from 'react';
import { Table, Checkbox, Button, Dimmer, Loader, Message } from 'semantic-ui-react';

const TodoTable = (props) => {
    const generateTableBody = () => {
        if (props.allTodos.length > 0) {
            return (
                props.allTodos.map((todoObject, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell collapsing>
                                <Checkbox
                                    checked={todoObject.completed}
                                    onClick={() => props.markCompleted(todoObject._id, todoObject.completed)}
                                />
                            </Table.Cell>
                            <Table.Cell width={9}>{todoObject.todo}</Table.Cell>
                            <Table.Cell>{todoObject.date}</Table.Cell>
                            <Table.Cell>{todoObject.time}</Table.Cell>
                            <Table.Cell>
                                <Button primary onClick={() => props.deleteTodo(todoObject._id)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })
            )
        } else {
            return (
                <Table.Row>
                    <Table.Cell colSpan='5'>
                        <Message style={{ textAlign: 'center' }}>No Todo's Added!</Message>
                    </Table.Cell>
                </Table.Row>
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
            <Table color='blue' >
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