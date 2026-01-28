import { useEffect, useState } from 'react';

// Simple Telegram WebApp types (avoiding deprecated SDK)
interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
    MainButton: {
        setText: (text: string) => void;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
    };
    initDataUnsafe: {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
        };
    };
    themeParams: {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
    };
}

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}

export function useTelegram() {
    const [tg, setTg] = useState<TelegramWebApp | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.ready();
            webApp.expand();

            setTg(webApp);
            setUser(webApp.initDataUnsafe.user || {
                id: 123456,
                first_name: 'Customer',
                username: 'telegram_user',
            });
        }
    }, []);

    return { tg, user };
}
