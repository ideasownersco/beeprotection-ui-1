import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dialog as PaperDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paragraph,
  Colors,
} from 'react-native-paper';
import I18n from 'utils/locale';

export default class Dialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    close: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    closeText: I18n.t('cancel'),
    confirmText: I18n.t('yes'),
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    let {
      title,
      description,
      visible,
      close,
      confirm,
      closeText,
      confirmText,
    } = this.props;
    return (
      <PaperDialog visible={visible} dismissable={false}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Paragraph>{description}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button color={Colors.teal500} onPress={close}>
            {closeText}
          </Button>
          <Button primary onPress={confirm}>
            {confirmText}
          </Button>
        </DialogActions>
      </PaperDialog>
    );
  }
}
