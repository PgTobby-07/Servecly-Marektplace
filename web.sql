-- MySQL does not use PRAGMA. Foreign keys are enabled by default in InnoDB.
-- SET FOREIGN_KEY_CHECKS = 1;

create database servecly;
USE servecly;


-- =========================
-- 1.roles
-- =========================
CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (role_id)
) ENGINE=InnoDB;
-- =========================
-- 2. USERS TABLE
-- =========================
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30) UNIQUE,
    role_id INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id) REFERENCES roles(role_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;


-- ============================
-- 3.profiles
-- ============================
CREATE TABLE profiles (
    profile_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    profile_image VARCHAR(255),
    bio TEXT,
    city VARCHAR(100),
    address_text TEXT,
    date_of_birth DATE,
    nationality VARCHAR(100),
    gender VARCHAR(20),
    PRIMARY KEY (profile_id),
    CONSTRAINT fk_profiles_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 4. TASKER
-- =========================
CREATE TABLE Tasker (
    tasker_id INT NOT NULL,
    bio TEXT,
    hourly_rate DECIMAL(10, 2),
    background_check_status VARCHAR(50),
    PRIMARY KEY (tasker_id),
    CONSTRAINT fk_tasker_user FOREIGN KEY (tasker_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 5. CLIENT
-- =========================
CREATE TABLE Client (
    client_id INT NOT NULL,
    PRIMARY KEY (client_id),
    CONSTRAINT fk_client_user FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 6. CATEGORY
-- =========================
CREATE TABLE MainCategory (
    maincategory_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (maincategory_id)
) ENGINE=InnoDB;
CREATE TABLE Category (
    category_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (category_id),
    maincategory_id INT NOT NULL,
    CONSTRAINT fk_maincategory_category 
        FOREIGN KEY (maincategory_id) 
        REFERENCES MainCategory(maincategory_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =======================
-- 7.service
-- =======================
CREATE TABLE Service (
    service_id INT NOT NULL AUTO_INCREMENT,
    category_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2),
    is_active TINYINT(1) DEFAULT 1,
    PRIMARY KEY (service_id),
    CONSTRAINT fk_service_category
        FOREIGN KEY (category_id) REFERENCES Category(category_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


-- ===========================
-- 8. ADDRESS
-- ===========================
CREATE TABLE Address (
    address_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    street VARCHAR(255),
    postal_code VARCHAR(20),
    details TEXT,
    PRIMARY KEY (address_id),
    CONSTRAINT fk_address_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 9. TASK
-- =========================
CREATE TABLE Task (
    task_id INT NOT NULL AUTO_INCREMENT,
    client_id INT NOT NULL,
    category_id INT,
    service_id INT NOT NULL,
    address_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    budget DECIMAL(10,2),
    scheduled_time DATETIME,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id),
    CONSTRAINT fk_task_client 
        FOREIGN KEY (client_id) REFERENCES Client(client_id),
    CONSTRAINT fk_task_category 
        FOREIGN KEY (category_id) REFERENCES Category(category_id),
    CONSTRAINT fk_task_service
        FOREIGN KEY (service_id) REFERENCES Service(service_id),
        CONSTRAINT fk_task_address
        FOREIGN KEY (address_id) REFERENCES Address(address_id)
        ON DELETE SET NULL
) ENGINE=InnoDB;


-- =========================
-- 10 BOKKINGSTATUS
-- ========================
CREATE TABLE BookingStatus (
    booking_status_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (booking_status_id)
) ENGINE=InnoDB;

INSERT INTO BookingStatus (name) VALUES
('pending'),
('accepted'),
('in_progress'),
('completed'),
('cancelled');

-- =========================
-- 11. BOOKING (CORE TABLE)
-- =========================
CREATE TABLE Booking (
    booking_id INT NOT NULL AUTO_INCREMENT,
    task_id INT NOT NULL,
    tasker_id INT NOT NULL,
    scheduled_time DATETIME,
    booking_status_id INT NOT NULL,
    notes TEXT,
    agreed_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (booking_id),
    CONSTRAINT fk_booking_task 
        FOREIGN KEY (task_id) REFERENCES Task(task_id),
    CONSTRAINT fk_booking_tasker 
        FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id),
    CONSTRAINT fk_booking_status
        FOREIGN KEY (booking_status_id) REFERENCES BookingStatus(booking_status_id)
) ENGINE=InnoDB;

-- =========================
-- 12 PaymentStatus
-- ========================
CREATE TABLE PaymentStatus (
    payment_status_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (payment_status_id)
) ENGINE=InnoDB;

INSERT INTO PaymentStatus (name) VALUES
('pending'),
('paid'),
('failed'),
('refunded');

-- =========================
-- 13. PAYMENT
-- =========================
CREATE TABLE Payment (
    payment_id INT NOT NULL AUTO_INCREMENT,
    booking_id INT NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_ref VARCHAR(100) UNIQUE,
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (payment_id),
    CONSTRAINT fk_payment_booking 
        FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_payment_status
        FOREIGN KEY (payment_status_id) REFERENCES PaymentStatus(payment_status_id)
) ENGINE=InnoDB;

-- =========================
-- 14. INVOICE
-- =========================
CREATE TABLE Invoice (
    invoice_id INT NOT NULL AUTO_INCREMENT,
    booking_id INT NOT NULL UNIQUE,
    subtotal DECIMAL(10, 2) NOT NULL,
    taxes DECIMAL(10, 2) DEFAULT 0.00,
    service_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    invoice_status VARCHAR(50) DEFAULT 'issued',
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id),
    CONSTRAINT fk_invoice_booking 
        FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 15. REVIEW
-- =========================
CREATE TABLE Review (
    review_id INT NOT NULL AUTO_INCREMENT,
    booking_id INT NOT NULL UNIQUE,
    client_id INT NOT NULL,
    tasker_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (review_id),
    CONSTRAINT ck_rating CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT fk_review_booking 
        FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_review_client 
        FOREIGN KEY (client_id) REFERENCES Client(client_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_review_tasker 
        FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 16. SKILL
-- =========================

CREATE TABLE Skill (
    skill_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (skill_id),
    category_id INT NOT NULL,
    CONSTRAINT fk_skill_category 
        FOREIGN KEY (category_id) 
        REFERENCES Category(category_id) 
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 17. TASKER_SKILL (M:N)
-- =========================
CREATE TABLE TaskerSkill (
    tasker_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (tasker_id, skill_id),
    CONSTRAINT fk_ts_tasker FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id),
    CONSTRAINT fk_ts_skill FOREIGN KEY (skill_id) REFERENCES Skill(skill_id)
) ENGINE=InnoDB;

-- =========================
-- 18.TaskerService
-- ========================
CREATE TABLE TaskerService (
    tasker_id INT NOT NULL,
    service_id INT NOT NULL,
    custom_price DECIMAL(10,2),
    experience_years INT,
    is_available TINYINT(1) DEFAULT 1,
    PRIMARY KEY (tasker_id, service_id),
    CONSTRAINT fk_taskerservice_tasker
        FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_taskerservice_service
        FOREIGN KEY (service_id) REFERENCES Service(service_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 19. AVAILABILITY
-- =========================
CREATE TABLE Availability (
    availability_id INT NOT NULL AUTO_INCREMENT,
    tasker_id INT NOT NULL,
    available_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available TINYINT(1) DEFAULT 1,
    PRIMARY KEY (availability_id),
    CONSTRAINT fk_avail_tasker 
        FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


-- =========================
-- 19  NOTIFICATION
-- =========================
CREATE TABLE Notification (
    notification_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    related_booking_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (notification_id),
    CONSTRAINT fk_notif_user 
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_notif_booking
        FOREIGN KEY (related_booking_id) REFERENCES Booking(booking_id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- ===============================
-- 20 VettingStatus
-- ==============================
CREATE TABLE VettingStatus (
    vetting_status_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (vetting_status_id)
) ENGINE=InnoDB;

INSERT INTO VettingStatus (name) VALUES
('pending'),
('approved'),
('rejected');

-- ================================
-- 21 VettingRequest
-- ================================
CREATE TABLE VettingRequest (
    vetting_id INT NOT NULL AUTO_INCREMENT,
    tasker_id INT NOT NULL,
    national_id VARCHAR(100),
    document_url VARCHAR(255),
    vetting_status_id INT NOT NULL,
    admin_notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    PRIMARY KEY (vetting_id),
    CONSTRAINT fk_vetting_tasker
        FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_vetting_status
        FOREIGN KEY (vetting_status_id) REFERENCES VettingStatus(vetting_status_id)
) ENGINE=InnoDB;
-- ==========================
-- 22 FavoriteTasker
-- ==========================
CREATE TABLE FavoriteTasker (
    client_id INT NOT NULL,
    tasker_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (client_id, tasker_id),
    CONSTRAINT fk_fav_client
        FOREIGN KEY (client_id) REFERENCES Client(client_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_fav_tasker
        FOREIGN KEY (tasker_id) REFERENCES Tasker(tasker_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================
-- 23 Message 
-- =============================
CREATE TABLE Message (
    message_id INT NOT NULL AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    booking_id INT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id),
    CONSTRAINT fk_message_sender
        FOREIGN KEY (sender_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_message_receiver
        FOREIGN KEY (receiver_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_message_booking
        FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
        ON DELETE SET NULL
) ENGINE=InnoDB;



 

