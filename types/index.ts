

type IQuotationItem = {
    itemName: string;
    quantityQuoted: number;
    unit: string;
}

export type IQuotation = Document & {
    date: Date;
    buyerName: string;
    address: string;
    contact: string;
    quotationItems: IQuotationItem[];
}


type POItem = {
    itemName: string;
    quantityOrdered: number;
    unit: string;
    ratePerUnit?: number;
    priceExcOfTax?: number;
    salesTax?: number;
    priceIncOfTax?: number;
}

export type Po = {
    email:string,
    poNo: string;
    poDate: string;
    deleviryAddress: string;
    salesTaxRegNo: string;
    ntnNo: string;
    buyerName: string;
    address: string;
    contact: string;
  poItems: POItem[];
}
