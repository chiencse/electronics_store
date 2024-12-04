import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Lấy token từ cookies

  // Kiểm tra nếu không có token
  if (!token) {
    // Redirect tới trang đăng nhập hoặc trả lỗi
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu token tồn tại, tiếp tục request
  return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ['/order', '/cart'], // Thêm các route cần middleware kiểm tra
};
