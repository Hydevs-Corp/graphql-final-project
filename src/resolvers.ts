const doctorsData = [
    {
        name: "Samia Mekame",
        speciality: "OPHTALMOLOGIST",
    },
    {
        name: "Catherine Bedoy",
        speciality: "PSYCHOLOGIST",
    },
];

const colors = ["#FF5733", "#33FF57", "#3357FF"];

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function colorDistance(color1, color2) {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

export const resolvers = {
    Query: {
        doctors: (parent, args) => {
            console.log(args);
            if (!args.specialities) return doctorsData;
            return doctorsData.filter((doctor) =>
                args.specialities.includes(doctor.speciality)
            );
        },
        add: (parent, { number1, number2 }) => number1 + number2,
        subtract: (parent, { number1, number2 }) => number1 - number2,
        multiply: (parent, { number1, number2 }) => number1 * number2,
        divide: (parent, { number1, number2 }) => {
            if (number2 === 0) throw new Error("Cannot divide by zero");
            return number1 / number2;
        },
        closestColor: (parent, { color }) => {
            if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
                throw new Error("Invalid hex color format");
            }
            return colors.reduce((closest, current) =>
                colorDistance(color, current) < colorDistance(color, closest)
                    ? current
                    : closest
            );
        },
    },
};
