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
    leftPress: PropTypes.func.isRequired,
    rightPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onDismiss:PropTypes.func,
    dismissable:PropTypes.bool
  };

  static defaultProps = {
    leftText: I18n.t('cancel'),
    rightText: I18n.t('yes'),
    dismissable:false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    let {
      title,
      description,
      visible,
      leftPress,
      rightPress,
      leftText,
      rightText,
      dismissable,
      onDismiss
    } = this.props;
    return (
      <PaperDialog visible={visible} dismissable={dismissable} onDismiss={onDismiss}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Paragraph>{description}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button color={Colors.teal500} onPress={leftPress}>
            {leftText}
          </Button>
          <Button primary onPress={rightPress}>
            {rightText}
          </Button>
        </DialogActions>
      </PaperDialog>
    );
  }
}
