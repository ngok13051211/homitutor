'use client'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './TutorSearch.module.css';
import Image from 'next/image';
import { BsStar, BsStarFill, BsHeart, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface FilterOption {
    id: string;
    label: string;
}

interface Tutor {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    description: string;
    image: string;
    level: string;
    firstLessonFree: boolean;
    teachingGrades: string[];
    teachingMethods: string[];
}

export default function TutorSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState({
        teachingMethod: [] as string[],
        priceRange: [] as string[],
        grades: [] as string[],
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const filters = {
        teachingMethod: [
            { id: 'online', label: 'Online' },
            { id: 'face-to-face', label: 'Trực tiếp' },
        ],
        priceRange: [
            { id: 'under-200', label: 'Dưới 200.000đ/giờ' },
            { id: 'over-200', label: 'Trên 200.000đ/giờ' },
        ],
        grades: [
            { id: 'grade-12', label: 'Lớp 12' },
            { id: 'grade-11', label: 'Lớp 11' },
            { id: 'grade-10', label: 'Lớp 10' },
            { id: 'grade-9', label: 'Lớp 9' },
            { id: 'grade-8', label: 'Lớp 8' },
            { id: 'grade-7', label: 'Lớp 7' },
            { id: 'grade-6', label: 'Lớp 6' },
        ],
    };

    // Mock data for tutors
    const tutors: Tutor[] = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            location: "Hà Nội (trực tiếp & online)",
            rating: 5,
            reviews: 12,
            price: 200000,
            description: "Giáo viên có 5 năm kinh nghiệm giảng dạy, chuyên môn sâu về Toán học",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face']
        },
        {
            id: 2,
            name: "Trần Thị B",
            location: "TP.HCM (online)",
            rating: 4.9,
            reviews: 28,
            price: 250000,
            description: "Thạc sĩ Toán học, 7 năm kinh nghiệm luyện thi đại học",
            image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['11', '12'],
            teachingMethods: ['online']
        },
        {
            id: 3,
            name: "Lê Văn C",
            location: "Đà Nẵng (trực tiếp)",
            rating: 4.8,
            reviews: 15,
            price: 180000,
            description: "Sinh viên năm cuối ĐH Bách Khoa, chuyên dạy Toán - Lý cho học sinh cấp 2, 3",
            image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop",
            level: "New",
            firstLessonFree: true,
            teachingGrades: ['8', '9', '10'],
            teachingMethods: ['face-to-face']
        },
        {
            id: 4,
            name: "Phạm Thị D",
            location: "Hà Nội (trực tiếp & online)",
            rating: 4.7,
            reviews: 89,
            price: 190000,
            description: "Giáo viên trường chuyên, 3 năm kinh nghiệm giảng dạy Hóa học",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: false,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face']
        },
        {
            id: 5,
            name: "Hoàng Văn E",
            location: "TP.HCM (trực tiếp & online)",
            rating: 4.6,
            reviews: 72,
            price: 185000,
            description: "Thạc sĩ Sinh học, 4 năm kinh nghiệm giảng dạy tại các trường THPT",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face']
        },
        {
            id: 6,
            name: "Đỗ Thị F",
            location: "Hà Nội (trực tiếp)",
            rating: 4.9,
            reviews: 118,
            price: 195000,
            description: "Giáo viên dạy Văn giỏi cấp Thành phố, 7 năm kinh nghiệm luyện thi THPT",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['face-to-face']
        },
        {
            id: 7,
            name: "Vũ Văn G",
            location: "TP.HCM (online)",
            rating: 4.8,
            reviews: 84,
            price: 175000,
            description: "Giảng viên khoa Lịch sử, 5 năm kinh nghiệm giảng dạy tại các trường THPT",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online']
        },
        {
            id: 8,
            name: "Ngô Thị H",
            location: "Đà Nẵng (trực tiếp & online)",
            rating: 4.7,
            reviews: 65,
            price: 170000,
            description: "Giáo viên trường chuyên, 3 năm kinh nghiệm giảng dạy Địa lý",
            image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face']
        },
        {
            id: 9,
            name: "Trịnh Văn I",
            location: "Hà Nội (online)",
            rating: 4.9,
            reviews: 92,
            price: 210000,
            description: "Thạc sĩ Vật lý, 6 năm kinh nghiệm giảng dạy, chuyên gia luyện thi đại học",
            image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['11', '12'],
            teachingMethods: ['online']
        },
        {
            id: 10,
            name: "Mai Thị K",
            location: "TP.HCM (trực tiếp & online)",
            rating: 4.8,
            reviews: 76,
            price: 195000,
            description: "Giáo viên Tiếng Anh, 5 năm kinh nghiệm, chuyên luyện thi IELTS và TOEIC",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face']
        }
    ];

    const handleFilterClick = (filterType: string) => {
        setActiveFilter(activeFilter === filterType ? null : filterType);
    };

    const handleOptionSelect = (filterType: string, option: string) => {
        setSelectedFilters(prev => {
            const currentFilters = [...prev[filterType as keyof typeof selectedFilters]];
            const index = currentFilters.indexOf(option);

            if (index === -1) {
                currentFilters.push(option);
            } else {
                currentFilters.splice(index, 1);
            }

            return {
                ...prev,
                [filterType]: currentFilters
            };
        });
    };

    const renderFilterDropdown = (filterType: string, options: { id: string; label: string }[]) => {
        if (activeFilter !== filterType) return null;

        return (
            <div className={styles.filterDropdown}>
                {options.map(option => (
                    <label key={option.id} className={styles.filterOption}>
                        <input
                            type="checkbox"
                            checked={selectedFilters[filterType as keyof typeof selectedFilters].includes(option.id)}
                            onChange={() => handleOptionSelect(filterType, option.id)}
                        />
                        {option.label}
                    </label>
                ))}
                <div className={styles.filterActions}>
                    <div
                        className={styles.applyButton}
                        onClick={() => setActiveFilter(null)}
                    >
                        Áp dụng
                    </div>
                </div>
            </div>
        );
    };

    const tutorsPerPage = 4;
    const totalPages = Math.ceil(tutors.length / tutorsPerPage);
    const currentTutors = tutors.slice(
        currentPage * tutorsPerPage,
        (currentPage + 1) * tutorsPerPage
    );

    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
    };

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
                <div className={styles.searchHeader}>
                    <h1 className={styles.title}>Gia sư tại khu vực của bạn</h1>
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <div className={styles.filterWrapper}>
                                <div
                                    className={`${styles.filterButton} ${activeFilter === 'teachingMethod' ? styles.active : ''}`}
                                    onClick={() => handleFilterClick('teachingMethod')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Hình thức học
                                </div>
                                {renderFilterDropdown('teachingMethod', filters.teachingMethod)}
                            </div>

                            <div className={styles.filterWrapper}>
                                <div
                                    className={`${styles.filterButton} ${activeFilter === 'priceRange' ? styles.active : ''}`}
                                    onClick={() => handleFilterClick('priceRange')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Học phí
                                </div>
                                {renderFilterDropdown('priceRange', filters.priceRange)}
                            </div>

                            <div className={styles.filterWrapper}>
                                <div
                                    className={`${styles.filterButton} ${activeFilter === 'grades' ? styles.active : ''}`}
                                    onClick={() => handleFilterClick('grades')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Lớp giảng dạy
                                </div>
                                {renderFilterDropdown('grades', filters.grades)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tutorCount}>
                    {tutors.length} gia sư có sẵn
                </div>

                <Row className="g-4">
                    {tutors.map((tutor) => (
                        <Col key={tutor.id} xs={12} md={6} lg={4}>
                            <Card
                                className={styles.tutorCard}
                                onClick={() => handleTutorClick(tutor.id)}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={styles.tutorImage}
                                        priority
                                    />
                                    <button
                                        className={styles.favoriteButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle favorite click
                                        }}
                                        aria-label="Add to favorites"
                                    >
                                        <BsHeart />
                                    </button>
                                </div>
                                <Card.Body className="p-3">
                                    <div className={styles.tutorInfo}>
                                        <h3 className={styles.tutorName}>{tutor.name}</h3>
                                        <p className={styles.tutorLocation}>{tutor.location}</p>
                                        <div className={styles.tutorRating}>
                                            {renderRating(tutor.rating)}
                                            <span className={styles.ratingText}>
                                                {tutor.rating.toFixed(1)} ({tutor.reviews} đánh giá)
                                            </span>
                                        </div>
                                        <p className={styles.tutorExperience}>{tutor.description}</p>
                                        <div className={styles.tutorPrice}>
                                            {isClient ? `${tutor.price.toLocaleString('vi-VN')}đ/giờ` : `${tutor.price}đ/giờ`}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* {isClient && (
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
                )} */}
            </Container>
        </section>
    );
} 