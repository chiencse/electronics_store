import { Controller, Get, Post, Query, Body, Res } from '@nestjs/common';
import { PaymentService } from './VNpay.Service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @ApiProperty({ type: String, description: 'Create payment URL' })
    @Post('/vnpay')
    createPayment(
        @Body()
        body: {
            orderId: number;
            amount: number;
            orderDescription: string;
        },
    ) {
        const { orderId, amount, orderDescription } = body;
        console.log(orderId, amount, orderDescription);
        const paymentUrl = this.paymentService.createPaymentUrl(
            orderId,
            amount,
            orderDescription,
        );
        return { paymentUrl };
    }

    @Get('/vnpay-return')
    handleReturnUrl(@Query() query: any, @Res() res: Response) {
        const isVerified = this.paymentService.verifyPayment(query);
        if (isVerified && query.vnp_ResponseCode === '00') {
            // Thanh toán thành công, chuyển hướng tới trang thông báo
            return res.redirect(
                `${process.env.FE_HOST}/payment/success?orderId=${query.vnp_TxnRef}`,
            );
        } else {
            // Thanh toán thất bại, chuyển hướng tới trang lỗi
            return res.redirect(`${process.env.FE_HOST}/payment/failed`);
        }
    }
    @Post('/vnpay-ipn')
    handleIpn(@Body() query: any) {
        const isVerified = this.paymentService.verifyPayment(query);
        if (isVerified && query.vnp_ResponseCode === '00') {
            // Xử lý đơn hàng đã thanh toán thành công
            return {
                status: 'success',
                message: 'Payment notification received!',
            };
        } else {
            return {
                status: 'failed',
                message: 'Payment verification failed!',
            };
        }
    }
}
