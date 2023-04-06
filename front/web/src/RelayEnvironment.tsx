import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchQuery(operation: any, variables: object) {
	return await fetch("https://persona-backend.herokuapp.com/graphql", {
		method: "POST",
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
