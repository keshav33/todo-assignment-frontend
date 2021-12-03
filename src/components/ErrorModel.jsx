import React from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'

const ErrorModel = (props) => {
  return (
    <Modal
      closeIcon
      open={props.open}
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
    >
      <Header icon='info' content='Please Check The Input' />
      <Modal.Content>
        <p>
            Looks like few fields are empty
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='blue' onClick={() => props.setOpen(false)}>
          <Icon name='checkmark' /> Okay
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ErrorModel;