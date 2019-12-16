import { Toast } from "native-base";

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

const showToast = (type: ToastType, text: string): void => {
  Toast.show({
    text: text,
    buttonText: 'Okay',
    buttonTextStyle: { color: '#008000' },
    buttonStyle: { backgroundColor: type === ToastType.SUCCESS ? '#5cb85c': 'red' },
  });
};

export default showToast;
