import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, withMobileDialog } from '@material-ui/core';

class SimpleDialog extends Component {

    render() {
        const { fullScreen, open, onClose } = this.props;

        return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="simple-dialog">
                <DialogTitle id="simple-dialog-title">Beer details</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(SimpleDialog);
