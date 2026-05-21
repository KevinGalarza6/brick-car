CREATE USER admin_brick_car WITH SUPERUSER LOGIN PASSWORD 'brick-car';

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(20),
    mileage VARCHAR(50),
    transmission VARCHAR(50),
    fuelType VARCHAR(50),
    color VARCHAR(50),
    city VARCHAR(100) NOT NULL,
    acceptsTrade VARCHAR(10),
    price VARCHAR(50) NOT NULL,
    contactPhone VARCHAR(50),
    imageUrl TEXT
);

DELETE FROM cars;

INSERT INTO cars (brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone, imageUrl)
VALUES
('Chevrolet', 'Chevette 1.6', '1993', '170000', 'Manual', 'Gasolina', 'Prata', 'Caxias Do Sul - RS', 'Sim', 'R$ 35.000,00', '(54) 98765-4321', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8UxQNQmhki7CCwf_z55p_bDzDvYi2cxRug&s'),
('BMW', '320i 2.0 M Sport', '2024', '15000', 'Automático', 'Flex', 'Branco', 'Bento Gonçalves - RS', 'Sim', 'R$ 320.000,00', '(54) 99999-1111', 'https://destaqueauto-webdisk01.destaqueapp.com.br/ud5d5dda/thumbnails/1280_x_960/catalog/products_2026/TN5ijuJ6ysx9vlqRVawGGuwTRWQMxqqnO50MBreoxvNexcQfkfCPqLAvaHcXr5.jpg'),
('Renault', 'Clio', '2010', '145000', 'Manual', 'Gasolina', 'Preto', 'Caxias do Sul - RS', 'Sim', 'R$ 22.000,00', '(54) 96666-4444', 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202605/20260514/renault-clio-1.0-campus-16v-flex-2p-manual-wmimagem22512753247.jpg'),
('Mazda', 'RX-7 Veilside', '1997', '85000', 'Manual', 'Gasolina', 'Laranja e Preto', 'Farroupilha - RS', 'Não', 'R$ 450.000,00', '(54) 98888-2222', 'https://www.diariodocentrodomundo.com.br/wp-content/uploads/2025/07/mazda.png'),
('Nissan', '350Z', '2008', '110000', 'Manual', 'Gasolina', 'Cinza', 'Caxias Do Sul - RS', 'Sim', 'R$ 180.000,00', '(54) 97777-3333', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcX1IqJ7mLN_q4q6NKOoscxlYKSVuHVNffNg&s');

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) DEFAULT 'user_padrao',
    car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
    UNIQUE(user_id, car_id)
);