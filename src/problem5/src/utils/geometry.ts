export const makeGeometryPoint = (options: { latitude: number; longitude: number }) => {
	const { latitude, longitude } = options;

	if (typeof latitude !== "number" || typeof longitude !== "number") {
		throw new Error("Latitude and longitude must be numbers.");
	}

	return {
		type: "Point",
		coordinates: [longitude, latitude],
	};
};
