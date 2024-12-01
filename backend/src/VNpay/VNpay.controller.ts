import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { PaymentService } from './VNpay.Service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiProperty({ type: String, description: 'Create payment URL' })
  @Post('/vnpay')
  createPayment(@Body() body: { orderId: number; amount: number; orderDescription: string }) {
    const { orderId, amount, orderDescription } = body;
    console.log(orderId, amount, orderDescription);
    const paymentUrl = this.paymentService.createPaymentUrl(orderId, amount, orderDescription);
    return { paymentUrl };
  }

  @Get('/vnpay-return')
  handleReturnUrl(@Query() query: any) {
    const isVerified = this.paymentService.verifyPayment(query);
    if (isVerified && query.vnp_ResponseCode === '00') {
      return { status: 'success', message: 'Payment successful!' };
    } else {
      return { status: 'failed', message: 'Payment verification failed!' };
    }
  }

  @Post('/vnpay-ipn')
  handleIpn(@Body() query: any) {
    const isVerified = this.paymentService.verifyPayment(query);
    if (isVerified && query.vnp_ResponseCode === '00') {
      // Xử lý đơn hàng đã thanh toán thành công
      return { status: 'success', message: 'Payment notification received!' };
    } else {
      return { status: 'failed', message: 'Payment verification failed!' };
    }
  }
}
