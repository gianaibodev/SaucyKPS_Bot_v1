import { createClient } from '@supabase/supabase-js';
import type { MenuItem, Order } from '../types';
import { notifyNewOrder } from './telegramBot';
import { getMenuImage } from '../utils/images';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ojuhzknpzxneilvxhlcm.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdWh6a25wenhuZWlsdnhobGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTU1NjUsImV4cCI6MjA3Njg3MTU2NX0.ngjHcMcDZarhe4wIDGU97MFWt5I7Rz-zsrboAaplyys';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch menu items from Supabase with timeout
 */
export async function fetchMenuWithTimeout(timeout = 5000): Promise<MenuItem[]> {
    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out after 5 seconds')), timeout)
    );

    const fetchPromise = supabase.from('menuitems').select('*');

    try {
        const result = await Promise.race([fetchPromise, timeoutPromise]);

        if ('error' in result && result.error) {
            throw result.error;
        }

        const data = result.data || [];

        // Transform data to match interface
        return data.map((item: any) => ({
            id: item.name,
            name: item.name,
            description: item.description || '',
            price: parseFloat(item.price),
            category: item.category,
            popular: item.popular || false,
            emoji: item.imageurl || '🍽️',
            // Use DB image if valid URL (and not generic unsplash source), otherwise generate one
            imageURL: (item.imageurl && item.imageurl.length > 10 && !item.imageurl.includes('source.unsplash.com'))
                ? item.imageurl
                : getMenuImage(item.name, item.category),
        }));
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
}

/**
 * Submit order to Supabase
 */
export async function submitOrder(order: Order): Promise<{ orderId: string; orderNumber: string }> {
    try {
        // Insert main order
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert([{
                customer_name: order.customer_name,
                customer_phone: order.customer_phone,
                delivery_address: order.delivery_address,
                total_price: order.total_price,
                payment_status: order.payment_status,
                notes: order.notes || '',
                customer_telegram_chat_id: order.customer_telegram_chat_id,
                order_number: `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`, // Generate client-side for now
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        const orderId = orderData.id;
        const orderNumber = orderData.order_number;

        // Insert order items
        const orderItems = order.items.map((item) => ({
            order_id: orderId,
            item_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // Notify Riders Group
        // We construct a full order object for the notification
        const fullOrderForNotification = {
            ...orderData, // contains database fields like id, order_number
            items: order.items // contains the item details
        };

        // Fire and forget notification (don't block the UI)
        notifyNewOrder(fullOrderForNotification).catch(err => console.error('Notification failed', err));

        return { orderId, orderNumber };
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error;
    }
}

/**
 * Fallback menu data
 */
export function getFallbackMenu(): MenuItem[] {
    return [
        {
            id: 'CHICK SILOG',
            name: 'CHICK SILOG',
            description: 'Chicken with garlic rice and egg',
            price: 8.99,
            category: 'FILIPINO SUNRICE',
            popular: true,
            emoji: '🍳',
            imageURL: '🍳',
        },
        {
            id: 'PORK TAPSILOG',
            name: 'PORK TAPSILOG',
            description: 'Tapa, sinangag, at itlog',
            price: 8.99,
            category: 'FILIPINO SUNRICE',
            popular: true,
            emoji: '🍳',
            imageURL: '🍳',
        },
        {
            id: 'TOCILOG',
            name: 'TOCILOG',
            description: 'Tocino with garlic rice and egg',
            price: 8.99,
            category: 'FILIPINO SUNRICE',
            popular: true,
            emoji: '🍳',
            imageURL: '🍳',
        },
        {
            id: 'FRIED CHICKEN WITH GRAVY',
            name: 'FRIED CHICKEN WITH GRAVY',
            description: 'Crispy fried chicken with rich gravy',
            price: 12.99,
            category: 'DISH OF THE DAY',
            popular: true,
            emoji: '🍗',
            imageURL: '🍗',
        },
        {
            id: 'CHICKEN ADOBO',
            name: 'CHICKEN ADOBO',
            description: 'Classic Filipino chicken adobo',
            price: 9.99,
            category: 'DISH OF THE DAY',
            popular: true,
            emoji: '🍗',
            imageURL: '🍗',
        },
    ];
}
