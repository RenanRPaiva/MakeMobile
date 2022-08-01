import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Order} from '../../entities/Order';
import {CustomText} from '../CustomText';

type Props = {
  order: Order;
  showService?: boolean;
};

export function OrderDetails({order, showService = false}: Props) {
  const friendlyId = `${order.friendlyId.substring(
    0,
    4,
  )}-${order.friendlyId.substring(4)}`;
  return (
    <>
      <IdStyled bold>#{friendlyId}</IdStyled>
      <SmallTextStyled bold>
        Nome: <SmallTextStyled>{order.name}</SmallTextStyled>
      </SmallTextStyled>
      <SmallTextStyled bold>
        Data e hora que precisa estar pronta:
      </SmallTextStyled>
      <CustomText>
        <SmallTextStyled bold>
          Data:{'  '} <SmallTextStyled>{order.date} </SmallTextStyled>
        </SmallTextStyled>
        <SmallTextStyled bold>
          Hora: <SmallTextStyled>{order.hours} </SmallTextStyled>
        </SmallTextStyled>
      </CustomText>
      {showService && (
        <>
          <LinhaWrapStyled>
            <SmallTextStyled bold>
              Telefone: <SmallTextStyled>{order.phone}</SmallTextStyled>{' '}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://api.whatsapp.com/send/?phone=55${order.phone}`,
                  );
                }}>
                <FontAwesomeIcon icon={faWhatsapp} color="#128c7e" />
              </TouchableOpacity>
            </SmallTextStyled>
          </LinhaWrapStyled>
          <LinhaWrapStyled>
            <SmallTextStyled>
              <CustomText bold>Local:</CustomText>{' '}
              {order.customerAddress.address}
            </SmallTextStyled>
            <SmallTextStyled>
              <CustomText bold>Ponto de Referencia:</CustomText> {order.coments}
            </SmallTextStyled>
            <LinhaWrapStyled>
              <SmallTextStyled bold>Serviços Contratados:</SmallTextStyled>
              <SmallTextStyled>
                {order.maquiagem !== 0 ? `Maquiagem: ${order.maquiagem}  ` : ''}
                {order.penteado !== 0 ? `Penteado: ${order.penteado}  ` : ''}
                {order.pacoteMc !== 0
                  ? `Pacote: Maquiagem + Cachos: ${order.pacoteMc}  `
                  : ''}
                {order.pacoteMp !== 0
                  ? `Pacote: Maquiagem + Penteado: ${order.pacoteMp}  `
                  : ''}
                {order.pacoteNoiva !== 0
                  ? `Pacote: Noiva/Debutante Maquiagem + Penteado: ${order.pacoteNoiva}  `
                  : ''}
                {order.atendimento !== 0
                  ? `Atendimento em festa: ${order.atendimento}  `
                  : ''}
              </SmallTextStyled>
            </LinhaWrapStyled>
          </LinhaWrapStyled>
          <LinhaWrapStyled>
            <View>
              <ValorTextStyled>Valor</ValorTextStyled>
              <ValorTextStyled bold>R$ {order.makeValue}</ValorTextStyled>
            </View>
          </LinhaWrapStyled>
        </>
      )}
    </>
  );
}

const IdStyled = styled(CustomText)`
  font-size: 16px;
  margin-bottom: 5px;
`;

const SmallTextStyled = styled(CustomText)`
  font-size: 12px;
  margin-bottom: 3px;
`;

const LinhaWrapStyled = styled.View`
  border-top-color: #e1e1e1;
  border-top-width: 1px;
  margin-top: 5px;
`;

const ValorTextStyled = styled(CustomText)`
  font-size: 12px;
  text-align: center;
`;
