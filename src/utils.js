import { useEffect, useState } from "preact/hooks";

export async function getJson(url, options) {
	try {
		const response = await fetch(url, options);

		if (
			!response.ok ||
			response.headers.get("content-type") === "application/json"
		) {
			return { data: null, error: response.statusText };
		}

		const data = await response.json();

		return { data, error: false };
	} catch (e) {
		return { data: null, error: "Request Failed" };
	}
}

const defaultState = {
	error: false,
	inProgress: false,
	data: null,
	trigger: false,
	url: "",
	options: null,
};

export function useGetJson() {
	const [hookState, setHookState] = useState(defaultState);

	const setTrigger = (triggered) => {
		setHookState((currentHookState) => {
			return {
				...currentHookState,
				trigger: triggered,
			};
		});
	};

	const setRequestInfo = (url, options) => {
		setHookState((currentHookState) => {
			return {
				...currentHookState,
				url,
				options,
			};
		});
	};

	const callGetJson = async () => {
		const { data, error } = await getJson(hookState.url, hookState.options);

		setHookState((currentHookState) => ({
			...currentHookState,
			inProgress: false,
			error,
			data,
		}));
	};

	useEffect(() => {
		(async function () {
			if (hookState.trigger) {
				setHookState((currentHookState) => ({
					...currentHookState,
					inProgress: true,
					error: false,
					data: null,
					trigger: false,
				}));
				callGetJson();
			}
		})();
	}, [hookState.trigger, setHookState]);

	const { error, data, inProgress } = hookState;

	return { error, data, inProgress, sendRequest: setTrigger, setRequestInfo };
}
