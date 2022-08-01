import {OrderStatus} from '../entities/OrderStatus';
import firestore from '@react-native-firebase/firestore';

export enum ActionTypes {
  accept,
  finish,
  cancel,
  reject,
}

type ExecuteOrderActionInput = {
  orderId: string;
  userId: string;
  action: ActionTypes;
};

export const executeOrderAction = async ({
  orderId,
  userId,
  action,
}: ExecuteOrderActionInput) => {
  let data;
  switch (action) {
    case ActionTypes.accept:
      data = {
        status: OrderStatus.ACCEPTED,
        make: userId,
      };
      break;
    case ActionTypes.cancel:
      data = {
        status: OrderStatus.CREATED,
        make: null,
      };
      break;
    case ActionTypes.finish:
      data = {
        status: OrderStatus.FINISHED,
      };
      break;
    case ActionTypes.reject:
      data = {
        status: OrderStatus.REJECTED,
        make: userId,
      };
      break;
  }
  await firestore().collection('orders').doc(orderId).update(data);
};
