-- Слои карты (GeoJSON данные)
CREATE TABLE t_p1974216_project_zenith_porta.layers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#e74c3c',
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    opacity FLOAT NOT NULL DEFAULT 0.7,
    geojson TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Экологические данные по зонам и годам
CREATE TABLE t_p1974216_project_zenith_porta.eco_data (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    value FLOAT NOT NULL,
    year INTEGER NOT NULL,
    zone TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Демо-данные: слой потери растительности
INSERT INTO t_p1974216_project_zenith_porta.eco_data (name, value, year, zone, description) VALUES
('Потеря растительности', 4.2, 2020, '12-А', 'Умеренная деградация'),
('Потеря растительности', 5.1, 2021, '12-А', 'Рост потерь'),
('Потеря растительности', 3.8, 2022, '12-А', 'Снижение'),
('Потеря растительности', 6.3, 2023, '12-А', 'Засуха'),
('Потеря растительности', 2.9, 2024, '12-А', 'Восстановление'),
('Потеря растительности', 7.1, 2020, '8-Б', 'Вырубка'),
('Потеря растительности', 6.5, 2021, '8-Б', 'Продолжение'),
('Потеря растительности', 8.2, 2022, '8-Б', 'Критический рост'),
('Потеря растительности', 5.4, 2023, '8-Б', 'Снижение'),
('Потеря растительности', 4.1, 2024, '8-Б', 'Стабилизация'),
('Потеря растительности', 9.4, 2020, '15-Г', 'Засуха 2020'),
('Потеря растительности', 8.1, 2021, '15-Г', 'Восстановление'),
('Потеря растительности', 7.0, 2022, '15-Г', 'Медленное восстановление'),
('Потеря растительности', 6.2, 2023, '15-Г', 'Улучшение'),
('Потеря растительности', 5.5, 2024, '15-Г', 'Норма');
