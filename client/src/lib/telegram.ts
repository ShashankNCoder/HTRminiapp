// Telegram Web App API wrapper
// See documentation: https://core.telegram.org/bots/webapps

// Define the WebApp interface based on Telegram's WebApp API
interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  isExpanded: boolean;
  initData: string;
  initDataUnsafe: any;
  colorScheme: 'light' | 'dark';
  themeParams: any;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
  sendData(data: any): void;
  openLink(url: string): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback: (confirmed: boolean) => void): void;
  showPopup(params: { title?: string, message: string, buttons?: Array<{ id?: string, type?: string, text?: string }> }, callback?: (buttonId: string) => void): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive: boolean): void;
    hideProgress(): void;
  };
  BackButton: {
    isVisible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
}

// Declare global WebApp property
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

// Access Telegram Web App
export const tg = window.Telegram?.WebApp;

// Initialize Telegram Web App
export function initTelegramApp() {
  if (tg) {
    // Expand the Web App to take up the full screen
    tg.expand();
    
    // Notify Telegram that the Web App is ready
    tg.ready();
    
    // Enable closing confirmation
    tg.enableClosingConfirmation();
    
    // Apply dark theme if Telegram is in dark mode
    if (tg.colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    console.log('Telegram WebApp initialized');
  } else {
    console.warn('Telegram WebApp not available. Running in browser mode.');
  }
}

// Show a native Telegram alert
export function showAlert(message: string, callback?: () => void) {
  if (tg) {
    tg.showAlert(message, callback);
  } else {
    alert(message);
    if (callback) callback();
  }
}

// Show a native Telegram confirmation dialog
export function showConfirm(message: string, callback: (confirmed: boolean) => void) {
  if (tg) {
    tg.showConfirm(message, callback);
  } else {
    const result = window.confirm(message);
    callback(result);
  }
}

// Show a native Telegram popup
export function showPopup(params: { title?: string, message: string, buttons?: Array<{ id?: string, type?: string, text?: string }> }, callback?: (buttonId: string) => void) {
  if (tg) {
    tg.showPopup(params, callback);
  } else {
    alert(params.title ? `${params.title}\n${params.message}` : params.message);
    if (callback) callback('ok');
  }
}

// Get user information from Telegram
export function getUserInfo() {
  if (tg?.initDataUnsafe?.user) {
    return tg.initDataUnsafe.user;
  }
  return null;
}

// Copy text to clipboard and show confirmation
export function copyToClipboard(text: string, successMessage: string = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showPopup({
      title: 'Success',
      message: successMessage,
      buttons: [{type: 'ok'}]
    });
  }).catch(err => {
    console.error('Could not copy text: ', err);
    showAlert('Failed to copy to clipboard');
  });
}

// Trigger haptic feedback
export function hapticFeedback(type: 'impact' | 'notification' | 'selection', style?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'error' | 'success' | 'warning') {
  if (!tg?.HapticFeedback) return;
  
  try {
    switch (type) {
      case 'impact':
        tg.HapticFeedback.impactOccurred(style as 'light' | 'medium' | 'heavy' | 'rigid' | 'soft');
        break;
      case 'notification':
        tg.HapticFeedback.notificationOccurred(style as 'error' | 'success' | 'warning');
        break;
      case 'selection':
        tg.HapticFeedback.selectionChanged();
        break;
    }
  } catch (error) {
    console.error('Haptic feedback error:', error);
  }
}
