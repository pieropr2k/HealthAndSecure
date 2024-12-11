import React, { useEffect, useState } from "react";
import { patientSchema } from "../schemas/pacient";
import { z } from "zod";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../schemas/auth";

function PacientRegisterForm() {
    const { signup, errors: registerErrors, isAuthenticated } = useAuth();
    
    // Estado de los valores de cada campo
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    /*
    const [conditions, setConditions] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [medications, setMedications] = useState([]);
    const [surgeries, setSurgeries] = useState([]);
  */
    const [medicalConditions, setMedicalConditions] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [medications, setMedications] = useState([]);
    const [surgeries, setSurgeries] = useState([]);
    const [newCondition, setNewCondition] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [newMedication, setNewMedication] = useState("");
    const [newSurgery, setNewSurgery] = useState("");

    const [emergencyContactName, setEmergencyContactName] = useState("");
    const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
    const [terms, setTerms] = useState(false);

    // Estado de los errores de cada campo
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario pre");

        try {
            // Validación con Zod
            const registerData = patientSchema.parse({
                lastName,
                firstName,
                documentType,
                documentNumber,
                email,
                password,
                confirmPassword,
                phone,
                birthDate,
                gender,
                address,
                height: parseFloat(height),
                weight: parseFloat(weight),
                medicalConditions,
                allergies,
                medications,
                surgeries,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactRelationship,
                terms,
            });

            const json = {
                last_name: lastName,
                first_name: firstName,
                document_type: documentType,
                document_num: documentNumber,
                email: email,
                password: password,
                phone: phone,
                birth_date: birthDate,
                gender: gender,
                address: address,
                height: parseFloat(height),
                weight: parseFloat(weight),
                medical_conditions: medicalConditions,
                allergies: allergies,
                medications: medications,
                surgeries: surgeries,
                emergency_contact_name: emergencyContactName,
                emergency_contact_phone: emergencyContactPhone,
                emergency_contact_relationship: emergencyContactRelationship,
                role: 'client'
            }

            await signup(json);

            console.log(json)

            // Si la validación pasa, el formulario puede enviarse
            console.log("Formulario enviado");
            // Aquí puedes enviar los datos al servidor
        } catch (error) {
            // Si la validación falla, mostrar los errores
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
            }
        }
    };

    const handleChange = (e, setState) => {
        const { name, value } = e.target;
        setState(value);
    };

    const handleToggleChange = (e, setState) => {
        const { checked } = e.target;
        setState(checked);
    };

    const handleAddItem = (item, setItem, list, setList) => {
        if (item.trim()) {
            setList([...list, item]);
            setItem("");
        }
    };

    const handleRemoveItem = (item, list, setList) => {
        setList(list.filter((i) => i !== item));
    };

    const navigate = useNavigate();

    
    useEffect(() => {
        if (isAuthenticated) navigate("/client/appointments");
      }, [isAuthenticated]);
      

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    Formulario de Registro de Información
                </h2>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Apellidos</label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => handleChange(e, setLastName)}
                            placeholder="Ingresa tus apellidos por favor"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Nombres</label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => handleChange(e, setFirstName)}
                            placeholder="Ingresa tus nombres por favor"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
                    </div>
                    <div className="col-span-2 flex gap-4 justify-between">
                        <div className="grow-[1]">
                            <label className="block font-semibold text-gray-700 mb-2">Tipo de Documento</label>
                            <select
                                name="documentType"
                                value={documentType}
                                onChange={(e) => handleChange(e, setDocumentType)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Selecciona</option>
                                <option value="dni">DNI</option>
                                <option value="ce">CE</option>
                                <option value="passport">Pasaporte</option>
                            </select>
                            {errors.documentType && <p className="text-red-600">{errors.documentType}</p>}
                        </div>
                        <div className="grow-[6]">
                            <label className="block font-semibold text-gray-700 mb-2">Número de documento</label>
                            <input
                                type="text"
                                name="documentNumber"
                                value={documentNumber}
                                onChange={(e) => handleChange(e, setDocumentNumber)}
                                placeholder="Ingresa el número de documento"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.documentNumber && <p className="text-red-600">{errors.documentNumber}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                        <label className="block font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => handleChange(e, setEmail)}
                            placeholder="Ingresa tu email"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.email && <p className="text-red-600">{errors.email}</p>}
                    </div>

                    {/* Contraseñas */}
                    <div className="col-span-2">
                        <label className="block font-semibold text-gray-700 mb-2">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.password && <p className="text-red-600">{errors.password}</p>}
                    </div>

                    <div className="col-span-2">
                        <label className="block font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
                        <input
                           type="password"
                           name="password"
                           placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => handleChange(e, setConfirmPassword)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Teléfono</label>
                        <input
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={(e) => handleChange(e, setPhone)}
                            placeholder="Ingresa tu teléfono"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.phone && <p className="text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Fecha de nacimiento */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={birthDate}
                            onChange={(e) => handleChange(e, setBirthDate)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.birthDate && <p className="text-red-600">{errors.birthDate}</p>}
                    </div>

                    {/* Género */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Género</label>
                        <select
                            name="gender"
                            value={gender}
                            onChange={(e) => handleChange(e, setGender)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecciona</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="non-binary">No binario</option>
                        </select>
                        {errors.gender && <p className="text-red-600">{errors.gender}</p>}
                    </div>

                    {/* Dirección */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => handleChange(e, setAddress)}
                            placeholder="Ingresa tu dirección"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.address && <p className="text-red-600">{errors.address}</p>}
                    </div>

                    {/* Altura */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Altura</label>
                        <input
                            type="number"
                            name="height"
                            value={height}
                            onChange={(e) => handleChange(e, setHeight)}
                            placeholder="Ingresa tu altura en cm"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.height && <p className="text-red-600">{errors.height}</p>}
                    </div>

                    {/* Peso */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Peso (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={weight}
                            onChange={(e) => handleChange(e, setWeight)}
                            placeholder="Ingresa tu peso en kg"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.weight && <p className="text-red-600">{errors.weight}</p>}
                    </div>
                </div>
                {/* Dynamic Fields */}
                {[
                    {
                        label: "Medical Conditions",
                        list: medicalConditions,
                        newItem: newCondition,
                        setNewItem: setNewCondition,
                        setList: setMedicalConditions,
                    },
                    {
                        label: "Allergies",
                        list: allergies,
                        newItem: newAllergy,
                        setNewItem: setNewAllergy,
                        setList: setAllergies,
                    },
                    {
                        label: "Current Medications",
                        list: medications,
                        newItem: newMedication,
                        setNewItem: setNewMedication,
                        setList: setMedications,
                    },
                    {
                        label: "Previous Surgeries",
                        list: surgeries,
                        newItem: newSurgery,
                        setNewItem: setNewSurgery,
                        setList: setSurgeries,
                    },
                ].map(({ label, list, newItem, setNewItem, setList }) => (
                    <div key={label} className="mb-4">
                        <label className="block font-semibold text-gray-700 mb-2">{label}</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={`Add a ${label.toLowerCase()}`}
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleAddItem(newItem, setNewItem, list, setList)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                        <ul className="mt-2 space-y-2">
                            {list.map((item, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded">
                                    {item}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item, list, setList)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Emergency Contact */}
                <h3 className="text-xl font-bold text-blue-900 mt-6 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Nombre del contacto</label>
                        <input
                            type="text"
                            name="emergencyContactName"
                            value={emergencyContactName}
                            onChange={(e) => handleChange(e, setEmergencyContactName)}
                            placeholder="Nombre del contacto"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.emergencyContactName && <p className="text-red-600">{errors.emergencyContactName}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Teléfono del contacto</label>
                        <input
                            type="tel"
                            name="emergencyContactPhone"
                            value={emergencyContactPhone}
                            onChange={(e) => handleChange(e, setEmergencyContactPhone)}
                            placeholder="Teléfono del contacto"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.emergencyContactPhone && <p className="text-red-600">{errors.emergencyContactPhone}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Relacion de Parentesco</label>
                        <select
                            name="emergencyContactRelationship"
                            value={emergencyContactRelationship}
                            onChange={(e) => handleChange(e, setEmergencyContactRelationship)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecciona</option>
                            <option value="parent">Apoderado/a</option>
                            <option value="brother">Hermano/a</option>
                            <option value="familiar">Familiar</option>
                            <option value="couple">Pareja</option>
                            <option value="friend">Amigo</option>
                        </select>
                    </div>

                </div>

                {/* Terms & Conditions */}
                <div className="mt-6">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={terms}
                        onChange={(e) => handleToggleChange(e, setTerms)}
                        className="mr-2"
                    />
                    <label htmlFor="terms" className="text-gray-700">
                        Acepto los términos y condiciones
                    </label>
                    {errors.terms && <p className="text-red-600">{errors.terms}</p>}
                </div>

                {/* Botón de enviar */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Registrar
                    </button>
                </div>


            </form>
        </div>
    );
}

export default PacientRegisterForm;
