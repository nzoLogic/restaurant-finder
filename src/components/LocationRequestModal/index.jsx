import React, { Component } from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'

export default class LocationRequestModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true
    }
  }

  handleClose = (e) => {
    const permission = e.target.dataset.permission === 'true'
    const { handlePermission } = this.props
    this.setState({isOpen: false})
    handlePermission(permission)
  }

  render() {
    return(
      <Modal size="small"
        open={this.state.isOpen}
        onClose={this.handleClose}>
        <Modal.Header>Restaurant Finder</Modal.Header>

        <Modal.Content>
          <Header>Improve your search results by searching for restaurants near you.</Header>
        </Modal.Content>

        <Modal.Actions>
          <Button negative color="red" onClick={this.handleClose} data-permission='false'>
            <Icon name="close" />
            Maybe Later
          </Button>
          <Button positive color="green" onClick={this.handleClose} data-permission='true'>
            <Icon name='checkmark' />
            Accept
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
