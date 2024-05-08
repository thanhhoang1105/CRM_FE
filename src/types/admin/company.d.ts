export interface ICompany {
    companyId: number;
    prefixKeyContract: string;
    companyName: string;
    companyNameEN: string;
    companyAcronym: string;
    companyAddress: string;
    companyOwner: string;
    ownerPosition: string;
    companyPhone: string;
    companyFax: string;
    companyTaxId: string;
    createdOn: string;
    lastModifiedOn: string;
    isActive: boolean;
    statusName: 'Active' | 'Inactive';
}
