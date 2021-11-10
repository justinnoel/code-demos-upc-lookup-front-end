import { useState } from "preact/hooks";
import { useGetJson } from "../utils";

const UPC_API = "https://upc-lookup-api.codedemos.dev/api/upc/";

export default function UpcLookupForm() {
	const [upc, setUpc] = useState("");
	const { error, data, inProgress, sendRequest, setRequestInfo } = useGetJson();
	const formattedData = data ? JSON.stringify(data, null, 3) : "";

	function handleInput(event) {
		setUpc(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (!upc) {
			alert("Please enter an 11 digit UPC code");
			return;
		}

		if (!inProgress) {
			setRequestInfo(`${UPC_API}${upc}`);
			sendRequest(true);
		}
	}

	return (
		<>
			<form name="upc-lookup" action="#" method="post" onSubmit={handleSubmit}>
				<label for="upc">UPC</label>
				<input
					type="text"
					name="upc"
					id="upc"
					placeholder="Enter a UPC"
					value={upc}
					onInput={handleInput}
				/>
				<p class="error">{error}</p>
				<div>
					<input
						type="submit"
						value="Lookup"
						class={inProgress ? "hidden" : ""}
					></input>
				</div>
			</form>

			{data ? <pre>{formattedData}</pre> : null}
		</>
	);
}
