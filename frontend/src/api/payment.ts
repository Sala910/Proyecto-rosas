
export interface PaymentData {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  holderName: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const processPayment = async (paymentData: PaymentData): Promise<PaymentResult> => {
  // Имитация обработки платежа
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Простая валидация для демонстрации
  const { cardNumber, expiryDate, cvv, holderName } = paymentData;
  
  if (!cardNumber || cardNumber.length !== 16) {
    return { success: false, error: 'Неверный номер карты' };
  }
  
  if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
    return { success: false, error: 'Неверная дата истечения карты' };
  }
  
  if (!cvv || cvv.length !== 3) {
    return { success: false, error: 'Неверный CVV код' };
  }
  
  if (!holderName || holderName.length < 2) {
    return { success: false, error: 'Введите имя держателя карты' };
  }
  
  // Имитация успешного платежа (90% успешных транзакций)
  const isSuccess = Math.random() > 0.1;
  
  if (isSuccess) {
    return {
      success: true,
      transactionId: 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };
  } else {
    return {
      success: false,
      error: 'Ошибка обработки платежа. Попробуйте еще раз.'
    };
  }
};
