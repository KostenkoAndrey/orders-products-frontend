'use server';

import { revalidatePath } from 'next/cache';
import { deleteOrder } from '@/api/api-order';

export async function deleteOrderAction(productId: string) {
  try {
    await deleteOrder(productId);
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
