'use server';

import { revalidatePath } from 'next/cache';
import { deleteProduct, createProductWithFile } from '@/api/api-product';

export async function deleteProductAction(productId: string) {
  try {
    await deleteProduct(productId);
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Delete product error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to delete product',
    };
  }
}

export async function addProductAction(formData: FormData) {
  try {
    await createProductWithFile(formData);
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    console.error('Add product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add product',
    };
  }
}
