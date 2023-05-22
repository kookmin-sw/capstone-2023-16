import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchQuery(operation: any, variables: object) {
	return await fetch("https://api.postona.xyz/graphql", {
		method: "POST",
		mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: operation.text,
			variables,
		}),
	}).then((response) => {
		return response.json();
	}).then(responseData => {
		if (responseData.errors) {
			throw new Error(responseData.errors[0].message);
		}
		return responseData;
	});
};

const environment = new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource()),
});

export default environment;
