import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJWT } from './app/utils/decodeJwt';
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get('token'); // Lấy token từ cookies

  const payload = decodeJWT(token?.value); // Giải mã token để lấy thông tin user
  console.log('Payload:', payload);

  // Kiểm tra nếu không có token
  if (!token) {
    // Redirect tới trang đăng nhập hoặc trả lỗi
    // return NextResponse.redirect(new URL('/login', request.url));
  }
  if (['/admin', '/admin/dashboard'].some((route) => url.startsWith(route))) {
    const token = request.cookies.get('token');
    const payload = decodeJWT(token?.value);

    if (!payload?.role || payload.role !== 'admin') {
      // Redirect to login if not an admin

      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }
  // Nếu token tồn tại, tiếp tục request
  return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ['/', '/admin', '/order', '/cart'], // Thêm các route cần middleware kiểm tra
};
