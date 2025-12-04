import { Product } from '@/api/api-product';

const getUniqueTypes = (data: Product[]) => {
  return [...new Set(data.map((item) => item.type))].map((type) => ({
    label: type,
    value: type,
  }));
};

export default getUniqueTypes;
