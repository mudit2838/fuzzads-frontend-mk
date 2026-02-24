
export const ERROR_CODES = {
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  daily_limit: 'DAILY_LIMIT_EXCEEDED'
};

export const ERROR_CONFIG = {
  [ERROR_CODES.INSUFFICIENT_FUNDS]: {
    title: "Insufficient Balance",
    message: "Your wallet balance is too low to complete this order.",
    iconColor: "text-yellow-500",
    buttonText: "Add Money",
    actionType: "OPEN_WALLET"
  },
  [ERROR_CODES.NETWORK_ERROR]: {
    title: "Connection Failed",
    message: "Please check your internet connection and try again.",
    iconColor: "text-red-500",
    buttonText: "Retry",
    actionType: "RETRY"
  },
  DEFAULT: {
    title: "Order Failed",
    message: "Something went wrong. Please contact support.",
    iconColor: "text-gray-500",
    buttonText: "Close",
    actionType: "CLOSE"
  }
};