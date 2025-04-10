'use client'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { BsCamera, BsPersonCircle, BsGeoAlt, BsKey } from 'react-icons/bs';
import styles from './settings.module.css';
import Image from 'next/image';

export default function Settings() {
    const [userData, setUserData] = useState({
        firstName: 'Nguyễn',
        lastName: 'Nam',
        email: 'tranhuu.loi1@dtu.edu.vn',
        phone: '',
        skype: '',
        googleMeetId: '',
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle image upload logic here
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Saving user data:', userData);
    };

    const handleCancel = () => {
        // Reset form or navigate back
        console.log('Canceling changes');
    };

    return (
        <div className={styles.settingsPage}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className={styles.settingsContainer}>
                            {/* General Information Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <BsPersonCircle className={styles.sectionIcon} />
                                    Thông tin chung
                                </h2>
                                <div className={styles.sectionContent}>
                                    <Row>
                                        <Col md={4}>
                                            <div className={styles.avatarSection}>
                                                <div className={styles.avatarWrapper}>
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                                                        alt="Profile"
                                                        width={200}
                                                        height={200}
                                                        className={styles.avatar}
                                                    />
                                                    <label htmlFor="avatar-upload" className={styles.uploadButton}>
                                                        <BsCamera />
                                                        <input
                                                            type="file"
                                                            id="avatar-upload"
                                                            hidden
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={8}>
                                            <Form>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Họ</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={userData.firstName}
                                                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Tên</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={userData.lastName}
                                                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        value={userData.email}
                                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </section>

                            {/* Contact Information Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <BsGeoAlt className={styles.sectionIcon} />
                                    Thông tin liên hệ
                                </h2>
                                <div className={styles.sectionContent}>
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        value={userData.phone}
                                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                        placeholder="Nhập số điện thoại"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Skype</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={userData.skype}
                                                        onChange={(e) => setUserData({ ...userData, skype: e.target.value })}
                                                        placeholder="Nhập ID Skype"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Google Meet ID</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={userData.googleMeetId}
                                                        onChange={(e) => setUserData({ ...userData, googleMeetId: e.target.value })}
                                                        placeholder="Nhập Google Meet ID"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </section>

                            {/* Password Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <BsKey className={styles.sectionIcon} />
                                    Đổi mật khẩu
                                </h2>
                                <div className={styles.sectionContent}>
                                    <Button variant="danger" className={styles.changePasswordButton}>
                                        Đổi mật khẩu
                                    </Button>
                                </div>
                            </section>

                            {/* Form Actions */}
                            <section className={styles.section}>
                                <div className={styles.formActions}>
                                    <Button
                                        variant="outline-secondary"
                                        className={styles.cancelButton}
                                        onClick={handleCancel}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant="success"
                                        className={styles.saveButton}
                                        onClick={handleSave}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
} 