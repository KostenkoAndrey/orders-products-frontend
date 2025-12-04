'use server';

import { revalidatePath } from 'next/cache';
import { createOrder, deleteOrder, addOrder } from '@/api/api-order';

export async function deleteOrderAction(orderId: string) {
  try {
    await deleteOrder(orderId);
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Delete order error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete order',
    };
  }
}

export async function addOrderAction(credential: addOrder) {
  try {
    await createOrder(credential);
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Add order error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add order',
    };
  }
}
