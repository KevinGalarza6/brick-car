// Se estiver testando no Emulador Android, use '10.0.2.2'.
// Se estiver usando o Expo Go no celular físico, coloque o IP IPv4 do seu computador (ex: '192.168.1.15').
const API_URL = 'http://10.0.2.2:3000/api/cars';

const formatCarData = (car: any) => ({
    ...car,
    fuelType: car.fueltype || car.fuelType,
    acceptsTrade: car.acceptstrade || car.acceptsTrade,
    contactPhone: car.contactphone || car.contactPhone,
    imageUrl: car.imageurl || car.imageUrl
});

export const api = {
    getCars: async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data.map(formatCarData);
    },
    getCarById: async (id: string) => {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        return formatCarData(data);
    },
    createCar: async (carData: any) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(carData)
        });
        return res.json();
    },
    updateCar: async (id: string, carData: any) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(carData)
        });
        return res.json();
    },
    deleteCar: async (id: string) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    },
    toggleFavorite: async (carId: string, isFavorite: boolean) => {
        const method = isFavorite ? 'DELETE' : 'POST';
        const url = isFavorite ? `${API_URL.replace('/cars', '/favorites')}/${carId}` : `${API_URL.replace('/cars', '/favorites')}`;
        const body = isFavorite ? null : JSON.stringify({ car_id: carId });

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body
        });
    },
    getFavorites: async () => {
        const res = await fetch('http://10.0.2.2:3000/api/favorites');
        const data = await res.json();
        return data.map(formatCarData);
    },
};