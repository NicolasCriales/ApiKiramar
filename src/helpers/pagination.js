export const pagination = (model, myPage, myLimit) => {
	const page = parseInt(myPage);
	const limit = parseInt(myLimit);

	// calcular el índice inicial y final
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const results = {};
	if (endIndex < model.length) {
		results.next = {
			page: page + 1,
			limit: limit,
			articles: model.length,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit,
			articles: model.length,
		};
	}

	results.results = model.slice(startIndex, endIndex);

	return results;
};
