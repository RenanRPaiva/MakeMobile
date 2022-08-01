import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {Order} from '../../entities/Order';
import {OrderStatus} from '../../entities/OrderStatus';
import {OrderDetails} from '../OrderDetails';
import {ActionButton} from './ActionButton';

type Props = {
  order: Order;
  visible: boolean;
  onRequestClose: () => void;
};
export function OrderModal({order, visible, onRequestClose}: Props) {
  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent>
      <CenteredViewStyled>
        <BackdropStyled onPress={onRequestClose} />
        <ContentWrapStyled>
          <OrderDetails order={order} showService />
          <ButtonsWrapStyle>
            <ActionButton>Voltar</ActionButton>
            {order.status === OrderStatus.CREATED && (
              <>
                <ActionButton>Aceitar</ActionButton>
                <ActionButton>Rejeitar</ActionButton>
              </>
            )}
            {order.status === OrderStatus.ACCEPTED && (
              <>
                <ActionButton>Traçar rota para cliente</ActionButton>
                <ActionButton>Finalizar</ActionButton>
                <ActionButton>Cancelar</ActionButton>
              </>
            )}
          </ButtonsWrapStyle>
        </ContentWrapStyled>
      </CenteredViewStyled>
    </Modal>
  );
}

const CenteredViewStyled = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BackdropStyled = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ContentWrapStyled = styled.View`
  background-color: #fff;
  padding: 20px;
  margin: 0 20px;
  align-self: stretch;
  border-radius: 6px;
`;

const ButtonsWrapStyle = styled.View`
  margin-top: 30px;
  border-top-color: #e1e1e1;
  border-top-width: 1px;
`;
