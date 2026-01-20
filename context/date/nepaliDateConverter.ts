import { convertToAD, convertToBS, parse } from "./nepali-date-helper";

export function bsToAd(bsDateString: string): string {
	const { year, month, date } = parse(bsDateString);
	const { AD } = convertToAD({ year, month, date });
	return `${AD.year}-${pad(AD.month + 1)}-${pad(AD.date)}`;
}

export function adToBs(adDateString: string): string {
	const adParts = adDateString.split("-").map((n) => parseInt(n, 10));
	const jsDate = new Date(Date.UTC(adParts[0], adParts[1] - 1, adParts[2]));
	const { BS } = convertToBS(jsDate);
	return `${BS.year}-${pad(BS.month + 1)}-${pad(BS.date)}`;
}

function pad(value: number): string {
	return value.toString().padStart(2, "0");
}
