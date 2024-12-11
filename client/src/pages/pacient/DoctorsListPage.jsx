import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDoctors } from "../../context/doctorsContext";
//import { useDoctors } from "../../context/doctorsContext";

let doctorsData = [
  {
    id: 1,
    fullName: "Dr. Juan Pérez Gómez",
    specialty: "Cardiology",
    location: "Los Olivos",
    experience: 10,
    rating: 4.8,
    reviews: 45,
    fee: 50,
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    fullName: "Dr. Ana García López",
    specialty: "Dermatology",
    location: "Miraflores",
    experience: 8,
    rating: 4.6,
    reviews: 30,
    fee: 80,
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    fullName: "Dr. Carlos Fernández",
    specialty: "Pediatrics",
    location: "San Isidro",
    experience: 12,
    rating: 4.9,
    reviews: 60,
    fee: 70,
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    fullName: "Dr. María Torres",
    specialty: "Gynecology",
    location: "Surco",
    experience: 6,
    rating: 4.7,
    reviews: 50,
    fee: 60,
    photo: "https://via.placeholder.com/150"
  }
];

const DoctorsListPage = () => {
  
  const { doctors, getDoctors } = useDoctors();
  doctorsData = doctors;
  console.log(doctors, "doctores")

  useEffect(() => {
    getDoctors();
  }, []);
  

  const [specialty, setSpecialty] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [order, setOrder] = useState({
    priceHigh: false,
    priceLow: false,
    alphabeticalAZ: false,
    alphabeticalZA: false,
    ratingHigh: false,
    ratingLow: false
  });

  const filterDoctors = () => {
    let filteredDoctors = [...doctorsData];

    if (specialty) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    if (minRating > 0) {
      filteredDoctors = filteredDoctors.filter((doctor) => doctor.rating >= minRating);
    }

    if (minPrice || maxPrice) {
      filteredDoctors = filteredDoctors.filter((doctor) => {
        const meetsMin = minPrice ? doctor.fee >= Number(minPrice) : true;
        const meetsMax = maxPrice ? doctor.fee <= Number(maxPrice) : true;
        return meetsMin && meetsMax;
      });
    }

    if (order.priceHigh) {
      filteredDoctors.sort((a, b) => b.fee - a.fee);
    }
    if (order.priceLow) {
      filteredDoctors.sort((a, b) => a.fee - b.fee);
    }
    if (order.alphabeticalAZ) {
      filteredDoctors.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    if (order.alphabeticalZA) {
      filteredDoctors.sort((a, b) => b.fullName.localeCompare(a.fullName));
    }
    if (order.ratingHigh) {
      filteredDoctors.sort((a, b) => b.rating - a.rating);
    }
    if (order.ratingLow) {
      filteredDoctors.sort((a, b) => a.rating - b.rating);
    }

    return filteredDoctors;
  };

  const toggleOrder = (key) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [key]: !prevOrder[key]
    }));
  };

  const filteredDoctors = filterDoctors();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Filters */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filtros</h2>
          
          {/* Specialty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidad</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Ej. Cardiología"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Min Rating Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mínimo Rating</label>
            <input
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              placeholder="Ej. 4"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rango de Precio</label>
            <div className="flex gap-4">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Mín"
                className="w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Máx"
                className="w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          {/* Sorting Options */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-4">Ordenado por:</h3>
  
            {/* Price Sorting */}
            <div className="mb-4">
              <p className="font-medium text-gray-700">Precio</p>
              <label className="block text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={order.priceHigh}
                  onChange={() => toggleOrder("priceHigh")}
                  className="mr-2"
                />
                De alto a bajo
              </label>
              <label className="block text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={order.priceLow}
                  onChange={() => toggleOrder("priceLow")}
                  className="mr-2"
                />
                De bajo a alto
              </label>
            </div>
  
            {/* Alphabetical Sorting */}
            <div className="mb-4">
              <p className="font-medium text-gray-700">Por alfabeto</p>
              <label className="block text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={order.alphabeticalAZ}
                  onChange={() => toggleOrder("alphabeticalAZ")}
                  className="mr-2"
                />
                A a Z
              </label>
              <label className="block text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={order.alphabeticalZA}
                  onChange={() => toggleOrder("alphabeticalZA")}
                  className="mr-2"
                />
                Z a A
              </label>
            </div>
  
            {/* Rating Sorting */}
            <div>
              <p className="font-medium text-gray-700">Rating</p>
              <label className="block text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={order.ratingHigh}
                  onChange={() => toggleOrder("ratingHigh")}
                  className="mr-2"
                />
                De alto a bajo
              </label>
              <label className="block text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={order.ratingLow}
                  onChange={() => toggleOrder("ratingLow")}
                  className="mr-2"
                />
                De bajo a alto
              </label>
            </div>
          </div>
        </div>
  
        {/* Doctors List */}
        <div className="w-3/4">
          {filteredDoctors.map((doctor) => (
            <Link
              to={`./${doctor.id}`}
              key={doctor.id}
              className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6 mb-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Doctor's Photo */}
              <img
                src={doctor.photo || 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'}
                alt={`Photo of ${doctor.fullName}`}
                className="w-40 h-40 rounded-full object-cover shadow-md mr-2"
              />
  
              {/* Doctor's Information */}
              <div className="flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-gray-800">{doctor.fullName}</h3>
                <p className="text-yellow-500 font-semibold flex items-center gap-1 text-lg">
                  {"★".repeat(Math.floor(doctor.rating))}
                  {"☆".repeat(5 - Math.floor(doctor.rating))}
                  <span className="text-sm text-gray-500">
                    {doctor.rating} ({doctor.reviews ? 50 : 90} reseñas)
                  </span>
                </p>
                <p className="text-gray-700 text-sm">Especialidad: {doctor.specialty}</p>
                <p className="text-gray-700 text-sm flex items-center gap-2 mt-2">
                  <span className="material-icons text-gray-500">Distrito:</span>
                  {doctor.location}
                </p>
                <p className="text-gray-700 text-sm">Experiencia: {doctor.experience} años</p>
                <p className="text-gray-700 text-sm font-semibold mt-2">
                  Desde ${doctor.fee} USD por hora
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default DoctorsListPage;
