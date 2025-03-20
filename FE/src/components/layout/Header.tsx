'use client'
import { Container, Navbar, Form, Button, Nav, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { BsSearch, BsQuestionCircle, BsGeoAlt, BsPerson, BsEnvelope, BsGear, BsBoxArrowRight, BsChevronDown } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';

export default function Header() {
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Minh',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop'
    });

    useEffect(() => {
        setIsClient(true);
        const handleScroll = () => {
            // Hiển thị thanh tìm kiếm khi cuộn quá 600px (chiều cao của Hero section)
            const shouldShowSearch = window.scrollY > 600;
            setShowSearch(shouldShowSearch);
        };

        // Kiểm tra trạng thái đăng nhập từ localStorage
        const checkLoginStatus = () => {
            // Trong thực tế, bạn sẽ kiểm tra token hoặc session
            const token = localStorage.getItem('userToken');
            setIsLoggedIn(!!token);
        };

        window.addEventListener('scroll', handleScroll);
        checkLoginStatus();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShowLogin = () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
    };

    const handleShowSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
    };

    const handleBecomeTutor = () => {
        router.push('/become-tutor');
    };

    const handleLogin = () => {
        // Giả lập đăng nhập thành công
        localStorage.setItem('userToken', 'demo-token');
        setShowLoginModal(false);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
    };

    return (
        <>
            <Navbar fixed="top" bg="white" className={styles.header}>
                <Container className="d-flex align-items-center">
                    {/* Logo */}
                    <Navbar.Brand
                        onClick={() => router.push('/')}
                        className={styles.logo}
                        style={{ cursor: 'pointer' }}
                    >
                        superprof
                    </Navbar.Brand>

                    {/* Search Bar - Hidden by default */}
                    {isClient && (
                        <div className={`${styles.headerSearch} ${showSearch ? styles.show : ''}`}>
                            <Form className={styles.searchForm}>
                                <div className={styles.inputGroup}>
                                    <div className={styles.searchInput}>
                                        <BsSearch className={styles.inputIcon} />
                                        <Form.Control
                                            type="text"
                                            placeholder="Thử tìm 'Toán'"
                                        />
                                    </div>
                                    <div className={styles.locationInput}>
                                        <BsGeoAlt className={styles.inputIcon} />
                                        <Form.Control
                                            type="text"
                                            placeholder="Địa điểm học"
                                        />
                                    </div>
                                    <Button variant="danger" className={styles.searchButton}>
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    )}

                    {/* Navigation */}
                    <Nav className={styles.nav}>
                        <Button
                            variant="link"
                            className={styles.helpButton}
                        >
                            <BsQuestionCircle size={20} />
                        </Button>
                        <Button
                            variant="outline-danger"
                            className={styles.becomeButton}
                            onClick={handleBecomeTutor}
                        >
                            Trở thành gia sư
                        </Button>

                        {isLoggedIn ? (
                            <Dropdown align="end" className={styles.userDropdown}>
                                <Dropdown.Toggle as="div" className={styles.userToggle}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userAvatar}>
                                            <Image
                                                src={userData.avatar}
                                                alt="User avatar"
                                                width={32}
                                                height={32}
                                                className={styles.avatarImage}
                                            />
                                        </div>
                                        <span className={styles.userName}>{userData.name}</span>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className={styles.userMenu}>
                                    <Dropdown.Header>Xin chào, {userData.name}</Dropdown.Header>
                                    <Dropdown.Item as={Link} href="/dashboard" className={styles.dropdownItem}>
                                        <BsPerson className={styles.dropdownIcon} />
                                        Bảng điều khiển
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href="/messages" className={styles.dropdownItem}>
                                        <BsEnvelope className={styles.dropdownIcon} />
                                        Tin nhắn
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href="/settings" className={styles.dropdownItem}>
                                        <BsGear className={styles.dropdownIcon} />
                                        Thiết lập tài khoản
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout} className={styles.dropdownItem}>
                                        <BsBoxArrowRight className={styles.dropdownIcon} />
                                        Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Button
                                variant="link"
                                className={styles.loginButton}
                                onClick={() => setShowLoginModal(true)}
                            >
                                Đăng nhập
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            {isClient && (
                <>
                    <LoginModal
                        show={showLoginModal}
                        onHide={() => setShowLoginModal(false)}
                        onShowSignup={handleShowSignup}
                        onLogin={handleLogin}
                    />

                    <SignupModal
                        show={showSignupModal}
                        onHide={() => setShowSignupModal(false)}
                        onShowLogin={handleShowLogin}
                    />
                </>
            )}
        </>
    );
} 