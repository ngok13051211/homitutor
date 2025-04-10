import React from 'react';
import styles from './TutorConfirmation.module.css';

export default function TutorConfirmation() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.logo}>superprof</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.infoBox}>
                    <h2 className={styles.infoTitle}>Good to know</h2>
                    <p className={styles.infoText}>
                        On Superprof you can teach over 1,000 subjects! Use the search engine to find the subject you teach and let the fun begin :)
                    </p>
                </div>
                <div className={styles.subjectBox}>
                    <h2 className={styles.subjectTitle}>
                        Which <span className={styles.highlight}>subjects</span> do you teach?
                    </h2>
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Try 'Math'"
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.subjectList}>
                        <button className={styles.subjectItem}>Mathematics</button>
                        <button className={styles.subjectItem}>Singing</button>
                        <button className={styles.subjectItem}>Spanish</button>
                        <button className={styles.subjectItem}>Piano</button>
                        <button className={styles.subjectItem}>English</button>
                    </div>
                </div>
            </main>
        </div>
    );
}