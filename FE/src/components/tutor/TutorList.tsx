'use client'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import Image from 'next/image';
import styles from './TutorList.module.css';
import { BsStar, BsStarFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Tutor {
    id: number;
    name: string;
    subject: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    experience: string;
}

const tutors: Tutor[] = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        subject: "Toán học",
        rating: 4.9,
        reviews: 128,
        price: 200000,
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
        experience: "5 năm kinh nghiệm"
    },
    {
        id: 2,
        name: "Trần Thị B",
        subject: "Tiếng Anh",
        rating: 4.8,
        reviews: 95,
        price: 180000,
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
        experience: "4 năm kinh nghiệm"
    },
    {
        id: 3,
        name: "Lê Văn C",
        subject: "Vật lý",
        rating: 5.0,
        reviews: 156,
        price: 220000,
        image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop",
        experience: "6 năm kinh nghiệm"
    },
    {
        id: 4,
        name: "Phạm Thị D",
        subject: "Hóa học",
        rating: 4.7,
        reviews: 89,
        price: 190000,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        experience: "3 năm kinh nghiệm"
    },
    {
        id: 5,
        name: "Hoàng Văn E",
        subject: "Sinh học",
        rating: 4.6,
        reviews: 72,
        price: 185000,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
        experience: "4 năm kinh nghiệm"
    },
    {
        id: 6,
        name: "Đỗ Thị F",
        subject: "Ngữ văn",
        rating: 4.9,
        reviews: 118,
        price: 195000,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        experience: "7 năm kinh nghiệm"
    },
    {
        id: 7,
        name: "Vũ Văn G",
        subject: "Lịch sử",
        rating: 4.8,
        reviews: 84,
        price: 175000,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        experience: "5 năm kinh nghiệm"
    },
    {
        id: 8,
        name: "Ngô Thị H",
        subject: "Địa lý",
        rating: 4.7,
        reviews: 65,
        price: 170000,
        image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop",
        experience: "3 năm kinh nghiệm"
    }
];

export default function TutorList() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const tutorsPerPage = 4;
    const totalPages = Math.ceil(tutors.length / tutorsPerPage);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
    };

    // Lấy danh sách tutors cho trang hiện tại
    const currentTutors = tutors.slice(
        currentPage * tutorsPerPage,
        (currentPage + 1) * tutorsPerPage
    );

    const handleTutorClick = (tutorId: number) => {
        router.push(`/tutor/${tutorId}`);
    };

    const renderRating = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <span key={index}>
                {index < Math.floor(rating) ? (
                    <BsStarFill className={styles.starFilled} />
                ) : (
                    <BsStar className={styles.star} />
                )}
            </span>
        ));
    };

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    return (
        <section className={styles.tutorListSection}>
            <Container>
                <h2 className={styles.sectionTitle}>Gia sư nổi bật</h2>
                <p className={styles.sectionSubtitle}>
                    Khám phá những gia sư xuất sắc nhất của chúng tôi
                </p>
                <Row className="g-4">
                    {currentTutors.map((tutor) => (
                        <Col key={tutor.id} xs={12} sm={6} lg={3}>
                            <Card
                                className={styles.tutorCard}
                                onClick={() => handleTutorClick(tutor.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        width={300}
                                        height={300}
                                        className={styles.tutorImage}
                                    />
                                </div>
                                <Card.Body>
                                    <h3 className={styles.tutorName}>{tutor.name}</h3>
                                    <p className={styles.tutorSubject}>{tutor.subject}</p>
                                    <div className={styles.tutorRating}>
                                        {renderRating(tutor.rating)}
                                        <span className={styles.ratingText}>
                                            {tutor.rating} ({tutor.reviews} đánh giá)
                                        </span>
                                    </div>
                                    <p className={styles.tutorExperience}>{tutor.experience}</p>
                                    <p className={styles.tutorPrice}>
                                        {isClient ? tutor.price.toLocaleString('vi-VN') : tutor.price}đ/giờ
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {isClient && (
                    <div className={styles.paginationContainer}>
                        <div className={styles.paginationButtonWrapper}>
                            <button
                                className={styles.paginationButton}
                                onClick={handlePrevPage}
                                disabled={isFirstPage}
                                aria-label="Trang trước"
                            >
                                <BsChevronLeft />
                            </button>
                        </div>

                        <div className={styles.paginationInfo}>
                            Trang {currentPage + 1} / {totalPages}
                        </div>

                        <div className={styles.paginationButtonWrapper}>
                            <button
                                className={styles.paginationButton}
                                onClick={handleNextPage}
                                disabled={isLastPage}
                                aria-label="Trang tiếp theo"
                            >
                                <BsChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
} 