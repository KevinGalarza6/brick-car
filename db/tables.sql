-- Extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Usuários (Pode ser sincronizada com o Firebase Auth via UID)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid VARCHAR(255) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Veículos (Anúncios)
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    manufacture_year INT NOT NULL,
    color VARCHAR(50),
    fuel_type VARCHAR(50),      -- Gasolina, Flex, etc.
    transmission VARCHAR(50),   -- Manual, Automático
    doors INT,
    mileage INT NOT NULL,       -- Quilometragem
    body_type VARCHAR(50),      -- Cupê, Hatch, Sedan
    license_plate_end CHAR(1),  -- Final da placa
    price DECIMAL(10, 2) NOT NULL,
    city VARCHAR(100) NOT NULL, -- Ex: Caxias Do Sul - RS
    description TEXT,
    is_sold BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fotos do Veículo
CREATE TABLE vehicle_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    view_angle VARCHAR(50),     -- 'frente', 'lateral_direita', 'lateral_esquerda', 'traseira'
    is_main BOOLEAN DEFAULT FALSE
);

-- Tabela de Propostas (Mensagens para o vendedor)
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Caso o usuário esteja logado
    sender_name VARCHAR(255) NOT NULL,
    sender_phone VARCHAR(20) NOT NULL,
    sender_city VARCHAR(100),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Favoritos
CREATE TABLE favorites (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, vehicle_id)
);