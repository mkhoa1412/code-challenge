const emptyStringToUndefined = (value?: string) => (!value?.trim().length ? undefined : value);
const stringToBoolean = (value: string) => value === "true" || value === "1" || value === "on" || value === "yes";

const transforms = {
	emptyStringToUndefined,
	stringToBoolean,
	number: (value: string | number) => Number(value),
};

export default transforms;
