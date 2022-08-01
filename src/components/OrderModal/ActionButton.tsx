import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {CustomText} from '../CustomText';

export function ActionButton({children, ...otherProps}: TouchableOpacityProps) {
  return (
    <ButtonStyled {...otherProps}>
      <CustomText>{children}</CustomText>
      <FontAwesomeIcon icon={faChevronRight} />
    </ButtonStyled>
  );
}

const ButtonStyled = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-color: #e1e1e1;
  border-bottom-width: 1px;
  padding: 10px;
  ${props =>
    props.disabled &&
    `
    opacity: 0.4;
  `}
`;
