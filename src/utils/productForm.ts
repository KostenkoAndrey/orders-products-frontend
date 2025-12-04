export interface ProductFormData {
  serialNumber: number;
  isNew: boolean;
  title: string;
  type: string;
  specification: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  priceUSD: number;
  priceUAH: number;
  defaultCurrency: 'USD' | 'UAH';
  photo?: File;
}

export const buildProductFormData = (
  data: ProductFormData,
  orderId: string,
): FormData => {
  const formData = new FormData();

  const simpleFields = {
    serialNumber: data.serialNumber.toString(),
    isNew: data.isNew.toString(),
    title: data.title,
    type: data.type,
    specification: data.specification,
    orderId: orderId,
    date: new Date().toISOString(),
  };

  Object.entries(simpleFields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('guarantee[start]', data.guaranteeStart);
  formData.append('guarantee[end]', data.guaranteeEnd);

  const prices = [
    {
      value: data.priceUSD,
      symbol: 'USD',
      isDefault: data.defaultCurrency === 'USD',
    },
    {
      value: data.priceUAH,
      symbol: 'UAH',
      isDefault: data.defaultCurrency === 'UAH',
    },
  ];

  prices.forEach((price, index) => {
    formData.append(`price[${index}][value]`, price.value.toString());
    formData.append(`price[${index}][symbol]`, price.symbol);
    formData.append(`price[${index}][isDefault]`, price.isDefault.toString());
  });

  if (data.photo) {
    formData.append('photo', data.photo);
  }

  return formData;
};
