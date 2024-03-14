import { faker } from "@faker-js/faker";
import fs from "node:fs";

const problems = [
    "Transmission slipping",
    "Won't start",
    "Radiator leaking",
    "Engine knocking",
    "Brakes squealing",
    "Check engine light on",
    "Tires worn out",
    "Battery dead",
    "Oil leaking",
    "A/C not working",
    "Exhaust loud",
    "Steering loose",
    "Suspension noisy",
    "Fuel smell",
    "Transmission noisy",
    "Coolant smell",
    "Electrical short",
    "Engine overheating",
    "Brakes pulsating",
    "Tires flat",
    "Battery weak",
    "Oil low",
    "A/C noisy",
    "Exhaust smelly",
    "Steering stiff",
    "Suspension bouncy",
];

const problemCategories = [
    "cooling",
    "electrical",
    "engine",
    "brakes",
    "transmission",
    "suspension",
    "exhaust",
    "tires",
    "steering",
    "fuel"
];

const getRandomProblem = () => {
    return problems[Math.floor(Math.random() * problems.length)];
}

const getRandomProblemCategory = () => {
    return problemCategories[Math.floor(Math.random() * problemCategories.length), Math.floor(Math.random() * problemCategories.length)];
}



export const createRandomVehicleLead = () => {
    return {
        id: faker.string.uuid(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: 2010,
        color: faker.vehicle.color(),
        fuel: faker.vehicle.fuel(),
        type: faker.vehicle.type(),
        problems: [getRandomProblem()],
        problemCategory: getRandomProblemCategory(),
    };
}


export const createRandomVehicles = (count) => {
    const vehicles = [];
    for (let i = 0; i < count; i++) {
        vehicles.push(createRandomVehicleLead());
    }
    return vehicles;
}

export const getDetectors = () => {
    return [
        fs.readFileSync('detectors/1.js', 'utf-8'),
        fs.readFileSync('detectors/2.js', 'utf-8'),
        fs.readFileSync('detectors/3.js', 'utf-8'),
        fs.readFileSync('detectors/4.js', 'utf-8'),
        // fs.readFileSync('detectors/5.js', 'utf-8'),
    ]
}
