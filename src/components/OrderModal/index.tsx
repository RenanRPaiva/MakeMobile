import React, {useState} from 'react';
import {Alert, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {Order} from '../../entities/Order';
import {OrderStatus} from '../../entities/OrderStatus';
import {
  ActionTypes,
  executeOrderAction,
} from '../../services/executeOrderAction';
import {selectUser} from '../../store/slices/userSlice';
import {OrderDetails} from '../OrderDetails';
import {ActionButton} from './ActionButton';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../store/store';
import {loadOrders} from '../../store/slices/ordersSlice';

type Props = {
  order: Order;
  visible: boolean;
  onRequestClose: () => void;
};
export function OrderModal({order, visible, onRequestClose}: Props) {
  const user = useSelector(selectUser);
  const userId = user?.id || '';
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleExecuteAction = async (action: ActionTypes) => {
    try {
      setLoading(true);
      await executeOrderAction({
        orderId: order.id,
        userId,
        action,
      });
      Alert.alert('Pedido atualizado com sucesso.');
      dispatch(loadOrders(userId));
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Falha ao atualizar pedido. Tente novamente.',
      });
    }
    setLoading(false);
  };
  const handleClodse = () => {
    if (!loading) {
      onRequestClose();
    }
  };
  return (
    <Modal visible={visible} onRequestClose={handleClodse} transparent>
      <CenteredViewStyled>
        <BackdropStyled onPress={handleClodse} disabled={loading} />
        <ContentWrapStyled>
          <OrderDetails order={order} showService />
          {loading && <LoadingStyled size={'large'} color="#BD8085" />}
          <ButtonsWrapStyle>
            <ActionButton onPress={handleClodse} disabled={loading}>
              Voltar
            </ActionButton>
            {order.status === OrderStatus.CREATED && (
              <>
                <ActionButton
                  disabled={loading}
                  onPress={() => handleExecuteAction(ActionTypes.accept)}>
                  Aceitar
                </ActionButton>
                <ActionButton
                  disabled={loading}
                  onPress={() => handleExecuteAction(ActionTypes.reject)}>
                  Rejeitar
                </ActionButton>
              </>
            )}
            {order.status === OrderStatus.ACCEPTED && (
              <>
                <ActionButton disabled={loading}>
                  Traçar rota para cliente
                </ActionButton>
                <ActionButton
                  disabled={loading}
                  onPress={() => handleExecuteAction(ActionTypes.finish)}>
                  Finalizar
                </ActionButton>
                <ActionButton
                  disabled={loading}
                  onPress={() => handleExecuteAction(ActionTypes.cancel)}>
                  Cancelar
                </ActionButton>
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

const LoadingStyled = styled.ActivityIndicator`
  margin-top: 16px;
`;
