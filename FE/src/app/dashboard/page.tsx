'use client';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RequireRole } from '@/components/ui';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function DashboardPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Trả về trang trống nếu đang ở server-side
  if (!isClient) return null;

  return (
    <Container className="py-5 my-3">
      <h1 className="text-center mb-5">Bảng điều khiển</h1>

      {/* Khách không đăng nhập */}
      {!user && (
        <Card className="text-center p-5 shadow-sm">
          <Card.Body>
            <Card.Title className="mb-4">Bạn chưa đăng nhập</Card.Title>
            <Card.Text>
              Vui lòng đăng nhập để truy cập bảng điều khiển của bạn.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => router.push('/')}
              className="mt-3"
            >
              Về trang chủ
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Chuyển hướng Admin */}
      <RequireRole role="admin" user={user}>
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <Card.Title className="d-flex align-items-center mb-3">
              <span className="bg-danger text-white p-2 rounded me-3">Admin</span>
              <h2 className="m-0">Quản trị hệ thống</h2>
            </Card.Title>
            <Card.Text>
              Chào mừng quản trị viên! Từ đây bạn có thể quản lý toàn bộ hệ thống, người dùng và nội dung.
            </Card.Text>
            <div className="mt-4">
              <Button
                variant="outline-danger"
                onClick={() => router.push('/admin/dashboard')}
                className="me-3"
              >
                Quản lý hệ thống
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => router.push('/admin/users')}
              >
                Quản lý người dùng
              </Button>
            </div>
          </Card.Body>
        </Card>
      </RequireRole>

      {/* Chuyển hướng Gia sư */}
      <RequireRole role="tutor" user={user}>
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <Card.Title className="d-flex align-items-center mb-3">
              <span className="bg-success text-white p-2 rounded me-3">Gia sư</span>
              <h2 className="m-0">Quản lý lớp dạy</h2>
            </Card.Title>
            <Card.Text>
              Chào mừng gia sư! Từ đây bạn có thể quản lý các lớp dạy, học viên và lịch dạy của mình.
            </Card.Text>
            <div className="mt-4">
              <Button
                variant="outline-success"
                onClick={() => router.push('/tutor/dashboard')}
                className="me-3"
              >
                Lớp dạy của tôi
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => router.push('/tutor/schedule')}
              >
                Lịch dạy
              </Button>
            </div>
          </Card.Body>
        </Card>
      </RequireRole>

      {/* Chuyển hướng Học viên */}
      <RequireRole role="student" user={user}>
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <Card.Title className="d-flex align-items-center mb-3">
              <span className="bg-primary text-white p-2 rounded me-3">Học viên</span>
              <h2 className="m-0">Học tập</h2>
            </Card.Title>
            <Card.Text>
              Chào mừng học viên! Từ đây bạn có thể xem các khóa học, gia sư và lịch học của mình.
            </Card.Text>
            <div className="mt-4">
              <Button
                variant="outline-primary"
                onClick={() => router.push('/student/dashboard')}
                className="me-3"
              >
                Lớp học của tôi
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => router.push('/student/find-tutor')}
              >
                Tìm gia sư
              </Button>
            </div>
          </Card.Body>
        </Card>
      </RequireRole>
    </Container>
  );
}