interface ValidDuration {
  success: boolean;
  message: string;
}

const weeklyArray = [7, 8, 14, 15, 21, 28, 29, 30];
const biweeklyArray = [15, 30];

export const getPayments = (periosity: string, duration: number): number => {
  switch (periosity) {
    case 'daily':
      return duration;

    case 'weekly': {
      if (duration === 7 || duration === 8) {
        return 1;
      }

      if (duration === 14 || duration === 15) {
        return 2;
      }

      if (duration === 21) {
        return 3;
      }

      if (duration === 28 || duration === 29 || duration === 30) {
        return 4;
      }

      return 0;
    }

    case 'biweekly': {
      if (duration === 15) {
        return 1;
      }

      if (duration === 30) {
        return 2;
      }

      return 0;
    }

    case 'monthly':
      return 1;

    default:
      return 0;
  }
};

export const getPercent = (specialCredit: boolean): number => {
  let percent: number = 0;

  if (!specialCredit) {
    percent = 20;
  }

  return percent;
};

export const getPaymentAmount = (
  advancement: string,
  amount: string,
  payments: string,
  specialCredit: boolean,
  isSpecialCredit?: boolean,
  _percent?: string,
) => {
  const percent = !isSpecialCredit
    ? getPercent(specialCredit)
    : parseFloat(_percent as string);
  const _advancement = advancement || '0';
  const percent_amount = parseFloat(amount) * (percent / 100);
  const balance =
    parseFloat(amount) + percent_amount - parseFloat(_advancement);
  const _payment_amount =
    (parseFloat(amount) + percent_amount) / parseFloat(payments);

  return {
    _payment_amount,
    balance,
  };
};

export const getIsValidDuration = (
  periosity: string,
  duration: number,
): ValidDuration => {
  const message = 'La duración en días no concuerda con la forma de pago.';
  switch (periosity) {
    case 'daily': {
      return {
        success: true,
        message: '',
      };
    }

    case 'weekly': {
      const isValid = weeklyArray.includes(duration);

      return {
        success: isValid,
        message: isValid ? '' : message,
      };
    }

    case 'biweekly': {
      const isValid = biweeklyArray.includes(duration);

      return {
        success: isValid,
        message: isValid ? '' : message,
      };
    }

    case 'monthly': {
      const isValid = duration === 30;

      return {
        success: isValid,
        message: isValid ? '' : message,
      };
    }

    default: {
      return {
        success: false,
        message,
      };
    }
  }
};

export const getIsValidAmount = (
  amount: string,
  balance: string,
): ValidDuration => {
  const _amount = parseFloat(amount);
  const _balance = parseFloat(balance);

  if (_amount === _balance) {
    return {
      success: true,
      message: '',
    };
  }

  if (_amount > _balance) {
    return {
      success: false,
      message: `El valor debe ser máximo de ${balance}.`,
    };
  }

  return {
    success: true,
    message: '',
  };
};

export const getPeriosity = (periosity: string) => {
  let response = 0;
  switch (periosity) {
    case 'daily': {
      response = 1;
      break;
    }

    case 'weekly': {
      response = 7;
      break;
    }

    case 'biweekly': {
      response = 15;
      break;
    }

    case 'monthly': {
      response = 30;
      break;
    }

    default:
      response = 0;
      break;
  }

  return response;
};

export const getIsValidCreditAmount = (
  min: number,
  max: number,
  value: string,
) => {
  const parseValue = parseInt(value, 0);
  let success = true;
  let message = '';

  if (parseValue < min || parseValue > max) {
    success = false;
    message = `El crédito debe ser mínimo de ${min} y máximo de ${max}`;
  }

  return {
    success,
    message,
  };
};
