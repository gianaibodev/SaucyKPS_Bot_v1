// TypeScript interfaces for menu and cart

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    popular: boolean;
    emoji: string;
    imageURL: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface Cart {
    [itemId: string]: CartItem;
}

export interface Order {
    customer_name: string;
    customer_phone: string;
    delivery_address: string;
    total_price: number;
    items: CartItem[];
    notes?: string;
    payment_status: string;
    customer_telegram_chat_id?: string;
}

export type Category =
    | 'all'
    | 'FILIPINO SUNRICE'
    | 'DISH OF THE DAY'
    | 'VEGETABLE MEAL'
    | 'SEAFOOD'
    | 'SNACKS';

