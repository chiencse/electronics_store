import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
    constructor(private readonly configService: ConfigService) {}

    createPaymentUrl(
        orderId: number,
        amount: number,
        orderDescription: string,
    ): string {
        const tmnCode = this.configService.get<string>('VNP_TMNCODE');
        const hashSecret = this.configService.get<string>('VNP_HASHSECRET');
        const vnpUrl = this.configService.get<string>('VNP_URL');
        const returnUrl = this.configService.get<string>('VNP_RETURNURL');

        const params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: orderDescription,
            vnp_OrderType: 'billpayment',
            vnp_Amount: amount * 100, // Chuyển đổi sang đơn vị VNPay (VND * 100)
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate: new Date()
                .toISOString()
                .slice(0, 19)
                .replace(/[-:T]/g, ''),
        };

        const sortedParams = Object.keys(params)
            .sort()
            .reduce((acc, key) => {
                acc[key] = params[key];
                return acc;
            }, {});

        const queryString = new URLSearchParams(sortedParams as any).toString();
        const secureHash = crypto
            .createHmac('sha512', hashSecret)
            .update(queryString)
            .digest('hex');

        return `${vnpUrl}?${queryString}&vnp_SecureHash=${secureHash}`;
    }

    verifyPayment(query: any): boolean {
        const hashSecret = this.configService.get<string>('VNP_HASHSECRET');
        const secureHash = query.vnp_SecureHash;

        delete query.vnp_SecureHash;
        delete query.vnp_SecureHashType;

        const sortedQuery = Object.keys(query)
            .sort()
            .reduce((acc, key) => {
                acc[key] = query[key];
                return acc;
            }, {});

        const queryString = new URLSearchParams(sortedQuery as any).toString();
        const hash = crypto
            .createHmac('sha512', hashSecret)
            .update(queryString)
            .digest('hex');

        return hash === secureHash;
    }
}
