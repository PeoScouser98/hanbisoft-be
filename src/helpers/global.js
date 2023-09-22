export const decimalToJSON = (v, i, prev) => {
	if (v !== null && typeof v === 'object') {
		if (v.constructor.name === 'Decimal128') prev[i] = +v.toString();
		else Object.entries(v).forEach(([key, value]) => decimalToJSON(value, key, prev ? prev[i] : v));
	}
};
