import { Module } from '@nestjs/common';
import { VnpayModule } from 'nestjs-vnpay';
import { ignoreLogger } from 'vnpay';
import { PaymentService } from './VNpay.Service';
import { PaymentController } from './VNpay.controller';

@Module({
    imports: [
        // VnpayModule.register({
        //     tmnCode: 'YOUR_TMN_CODE',
        //     secureSecret: 'YOUR_SECURE_SECRET',
        //     vnpayHost: 'https://sandbox.vnpayment.vn',
        //     testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
        //     hashAlgorithm: 'SHA512', // tùy chọn
        //     /**
        //      * Sử dụng enableLog để bật/tắt logger
        //      * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
        //      */
        //     enableLog: true, // tùy chọn
        //     /**
        //      * Hàm `loggerFn` sẽ được gọi để ghi log
        //      * Mặc định, loggerFn sẽ ghi log ra console
        //      * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
        //      *
        //      * `ignoreLogger` là một hàm không làm gì cả
        //      */
        //     loggerFn: ignoreLogger, // tùy chọn
        // })
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class VNpayModule {}
