const BOT_TOKEN = '8318381464:AAH2YMr_oZP8f27UZ1q2l7I0_eOaIaIFVWI';
const RIDERS_GROUP_ID = '-1001003046741577';

export async function notifyNewOrder(order: any) {
    const message = `
🚨 <b>NEW ORDER ALERT!</b> 🚨

<b>Order #${order.order_number}</b>
--------------------------------
<b>Customer:</b> ${order.customer_name}
<b>Phone:</b> ${order.customer_phone || 'N/A'}
<b>Address:</b> ${order.delivery_address}
<b>Total:</b> $${order.total_price.toFixed(2)}
<b>Notes:</b> ${order.notes || 'None'}

<b>Items:</b>
${order.items.map((i: any) => `• ${i.quantity}x ${i.name}`).join('\n')}

--------------------------------
<i>Accept this order to start delivery!</i>
  `.trim();

    // Create Inline Keyboard with Accept Button
    // callback_data format: accept_order_{orderId}_{customerName}
    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: '✅ Accept Order',
                    callback_data: `accept_order_${order.id}_${encodeURIComponent(order.customer_name)}`
                }
            ]
        ]
    };

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: RIDERS_GROUP_ID,
                text: message,
                parse_mode: 'HTML',
                reply_markup: keyboard,
            }),
        });

        const data = await response.json();
        if (!data.ok) {
            console.error('Failed to send Telegram notification:', data);
        }
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}
