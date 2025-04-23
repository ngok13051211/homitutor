'use client';
import { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs, Badge, Form } from 'react-bootstrap';
import Image from 'next/image';
import { RequireRole } from '@/components/ui';
import { useCurrentUser, useUserWithRole } from '@/hooks/useCurrentUser';

export default function TutorDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState('about');

    // Trong môi trường thực tế, sử dụng useCurrentUser() thay vì useUserWithRole()
    // const user = useCurrentUser();
    const user = useUserWithRole('student'); // Thay đổi giá trị để test các vai trò khác nhau

    // Mock data - trong ứng dụng thực tế sẽ lấy từ API
    const tutor = {
        id: params.id,
        name: 'Nguyễn Văn A',
        role: 'tutor',
        avatar: 'https://via.placeholder.com/150',
        title: 'Thạc sĩ Toán học ứng dụng',
        rating: 4.8,
        totalReviews: 124,
        totalStudents: 48,
        hourlyRate: 250000,
        about: `Thạc sĩ Toán học ứng dụng với hơn 5 năm kinh nghiệm giảng dạy. 
            Tôi đã từng giảng dạy tại Đại học Khoa học Tự nhiên và có kinh nghiệm 
            dạy học sinh từ cấp 2 đến đại học. Phương pháp giảng dạy của tôi tập trung 
            vào việc xây dựng nền tảng vững chắc và giúp học sinh phát triển tư duy logic.`,
        experience: [
            { id: 1, position: 'Giảng viên Toán', institution: 'Đại học Khoa học Tự nhiên', period: '2018 - 2021' },
            { id: 2, position: 'Trưởng nhóm Toán', institution: 'Trung tâm gia sư XYZ', period: '2016 - 2018' }
        ],
        education: [
            { id: 1, degree: 'Thạc sĩ Toán học ứng dụng', institution: 'Đại học Khoa học Tự nhiên', year: '2018' },
            { id: 2, degree: 'Cử nhân Toán học', institution: 'Đại học Khoa học Tự nhiên', year: '2016' }
        ],
        subjects: ['Toán đại số', 'Giải tích', 'Hình học', 'Xác suất thống kê'],
        reviews: [
            { id: 1, studentName: 'Học sinh A', rating: 5, comment: 'Phương pháp dạy rất dễ hiểu và hiệu quả.', date: '10/03/2025' },
            { id: 2, studentName: 'Học sinh B', rating: 4, comment: 'Thầy rất nhiệt tình và luôn giải đáp thắc mắc nhanh chóng.', date: '05/03/2025' }
        ],
        schedule: [
            { day: 'Thứ 2', periods: ['08:00 - 10:00', '14:00 - 16:00'] },
            { day: 'Thứ 3', periods: ['09:00 - 11:00', '15:00 - 17:00'] },
            { day: 'Thứ 4', periods: ['08:00 - 10:00'] },
            { day: 'Thứ 5', periods: ['14:00 - 16:00', '19:00 - 21:00'] },
            { day: 'Thứ 6', periods: ['08:00 - 10:00', '14:00 - 16:00'] },
            { day: 'Thứ 7', periods: ['09:00 - 11:00', '14:00 - 16:00'] },
            { day: 'Chủ nhật', periods: ['14:00 - 16:00'] }
        ]
    };

    return (
        <Container className="py-5">
            <Row>
                {/* Thông tin chính */}
                <Col lg={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row>
                                <Col md={4} className="text-center mb-4 mb-md-0">
                                    <div className="position-relative" style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                                        <Image
                                            src={tutor.avatar}
                                            alt={tutor.name}
                                            className="rounded-circle"
                                            fill
                                            sizes="150px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <h2>{tutor.name}</h2>
                                    <p className="text-muted">{tutor.title}</p>

                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-3">
                                            <span className="text-warning">★</span> {tutor.rating} ({tutor.totalReviews} đánh giá)
                                        </div>
                                        <div>
                                            <span className="text-primary">{tutor.totalStudents}</span> học viên
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {tutor.subjects.map((subject, index) => (
                                            <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                                                {subject}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <p className="mb-0 me-3">
                                            <strong>{new Intl.NumberFormat('vi-VN').format(tutor.hourlyRate)} đ</strong> / giờ
                                        </p>

                                        {/* Nút "Đặt lịch học" chỉ hiển thị cho học sinh */}
                                        <RequireRole role="student" user={user}>
                                            <Button variant="primary" className="me-2">Đặt lịch học</Button>
                                        </RequireRole>

                                        {/* Nút "Nhắn tin" hiển thị cho tất cả người dùng đã đăng nhập */}
                                        <RequireRole role={['student', 'tutor', 'admin']} user={user}>
                                            <Button variant="outline-primary">Nhắn tin</Button>
                                        </RequireRole>

                                        {/* Nút "Đăng nhập để đặt lịch" hiển thị cho khách */}
                                        <RequireRole role="guest" user={user}>
                                            <Button variant="outline-secondary">Đăng nhập để đặt lịch</Button>
                                        </RequireRole>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            <Tabs
                                activeKey={activeTab}
                                onSelect={(k) => setActiveTab(k || 'about')}
                                className="mb-3"
                            >
                                <Tab eventKey="about" title="Giới thiệu">
                                    <h5>Về tôi</h5>
                                    <p>{tutor.about}</p>

                                    <h5 className="mt-4">Kinh nghiệm</h5>
                                    {tutor.experience.map(exp => (
                                        <div key={exp.id} className="mb-3">
                                            <h6>{exp.position}</h6>
                                            <p className="mb-1">{exp.institution}</p>
                                            <small className="text-muted">{exp.period}</small>
                                        </div>
                                    ))}

                                    <h5 className="mt-4">Học vấn</h5>
                                    {tutor.education.map(edu => (
                                        <div key={edu.id} className="mb-3">
                                            <h6>{edu.degree}</h6>
                                            <p className="mb-1">{edu.institution}</p>
                                            <small className="text-muted">{edu.year}</small>
                                        </div>
                                    ))}
                                </Tab>

                                <Tab eventKey="reviews" title="Đánh giá">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Đánh giá ({tutor.reviews.length})</h5>

                                        {/* Form đánh giá chỉ hiển thị cho học sinh */}
                                        <RequireRole role="student" user={user}>
                                            <Button variant="outline-primary" size="sm">Viết đánh giá</Button>
                                        </RequireRole>
                                    </div>

                                    {tutor.reviews.map(review => (
                                        <Card key={review.id} className="mb-3">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <h6>{review.studentName}</h6>
                                                    <div className="text-warning">
                                                        {"★".repeat(review.rating)}
                                                        {"☆".repeat(5 - review.rating)}
                                                    </div>
                                                </div>
                                                <p>{review.comment}</p>
                                                <small className="text-muted">{review.date}</small>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Tab>

                                <Tab eventKey="schedule" title="Lịch dạy">
                                    <h5 className="mb-3">Lịch trống trong tuần</h5>
                                    <Row>
                                        {tutor.schedule.map((item, index) => (
                                            <Col key={index} md={6} className="mb-3">
                                                <Card>
                                                    <Card.Header className="py-2">
                                                        <strong>{item.day}</strong>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {item.periods.map((period, pidx) => (
                                                            <div key={pidx} className="mb-2">
                                                                <Badge bg="light" text="dark" className="p-2">
                                                                    {period}
                                                                </Badge>

                                                                {/* Nút đặt lịch học cho từng khung giờ chỉ hiển thị cho học sinh */}
                                                                <RequireRole role="student" user={user}>
                                                                    <Button
                                                                        variant="outline-primary"
                                                                        size="sm"
                                                                        className="ms-2"
                                                                    >
                                                                        Đặt lịch
                                                                    </Button>
                                                                </RequireRole>
                                                            </div>
                                                        ))}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Sidebar */}
                <Col lg={4}>
                    {/* Form đặt lịch học nhanh - chỉ hiển thị cho học sinh */}
                    <RequireRole role="student" user={user}>
                        <Card className="mb-4">
                            <Card.Header>
                                <h5 className="mb-0">Đặt lịch học nhanh</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Môn học</Form.Label>
                                        <Form.Select>
                                            {tutor.subjects.map((subject, index) => (
                                                <option key={index}>{subject}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Ngày học</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Khung giờ</Form.Label>
                                        <Form.Select>
                                            <option>08:00 - 10:00</option>
                                            <option>14:00 - 16:00</option>
                                            <option>19:00 - 21:00</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Ghi chú</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>

                                    <Button variant="primary" className="w-100">Đặt lịch ngay</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </RequireRole>

                    {/* Thông tin liên hệ - hiển thị cho tất cả */}
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 className="mb-0">Thông tin liên hệ</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>
                                <strong>Liên hệ trực tiếp:</strong> Đăng nhập để xem
                            </p>
                            <p>
                                <strong>Chat trực tuyến:</strong> Có sẵn
                            </p>
                            <p>
                                <strong>Thời gian phản hồi:</strong> Trong vòng 24 giờ
                            </p>
                        </Card.Body>
                    </Card>

                    {/* Quản lý hồ sơ - chỉ hiển thị nếu xem hồ sơ của chính mình và là gia sư */}
                    <RequireRole role="tutor" user={user}>
                        <Card>
                            <Card.Header>
                                <h5 className="mb-0">Quản lý hồ sơ</h5>
                            </Card.Header>
                            <Card.Body>
                                <Button variant="outline-secondary" className="w-100 mb-2">Chỉnh sửa hồ sơ</Button>
                                <Button variant="outline-secondary" className="w-100 mb-2">Quản lý lịch dạy</Button>
                                <Button variant="outline-secondary" className="w-100">Thống kê đánh giá</Button>
                            </Card.Body>
                        </Card>
                    </RequireRole>
                </Col>
            </Row>
        </Container>
    );
}