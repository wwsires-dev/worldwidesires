export const FormatDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	const day = date.getDay();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return String.prototype.concat(year + "-" + month + "-" + day);
};
