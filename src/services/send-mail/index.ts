import axiosClient from '../axios-client';

export interface ISendMail {
    recipient: string;
    subject: string;
    message: string;
    loadTemplate?: boolean;
}

const apiURL = '/mails';

const SendMailService = {
    sendMail: (params: ISendMail): Promise<ISendMail> => {
        const url = apiURL;
        return axiosClient.post(url, params);
    },

    sendMailWithTemplate: (id: string, params: ISendMail): Promise<ISendMail> => {
        const url = apiURL + `/template/${id}`;
        return axiosClient.post(url, params);
    },

    sendMailQuotation: (id: string, params: ISendMail): Promise<ISendMail> => {
        const url = apiURL + `/quotation/opportunity/${id}`;
        return axiosClient.post(url, params);
    }
};

export default SendMailService;
