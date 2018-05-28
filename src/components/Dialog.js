import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dialog as PaperDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paragraph,
  Colors,
} from 'react-native-paper';
import I18n from 'utils/locale';
import Button from 'components/Button';

export default class Dialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.element,
    leftButtonPress: PropTypes.func.isRequired,
    rightButtonPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func,
    dismissable: PropTypes.bool,
  };

  static defaultProps = {
    leftButtonText: I18n.t('cancel'),
    rightButtonText: I18n.t('yes'),
    dismissable: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    let {
      title,
      description,
      visible,
      leftButtonPress,
      rightButtonPress,
      leftButtonText,
      rightButtonText,
      rightButtonStyle,
      dismissable,
      onDismiss,
    } = this.props;
    return (
      <PaperDialog
        visible={visible}
        dismissable={dismissable}
        onDismiss={onDismiss}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Paragraph>{description}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button
            onPress={leftButtonPress}
            title={leftButtonText}
            color={Colors.grey700}
          />
          <Button
            color={Colors.teal500}
            primary
            onPress={rightButtonPress}
            title={rightButtonText}
            {...rightButtonStyle}
          />
        </DialogActions>
      </PaperDialog>
    );
  }
}
