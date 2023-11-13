import React, { useState, useRef } from "react";

export default function PictureForm({ children, initialSrc, onSave }) {
	const [file, setFile] = useState(null);
	if (file) console.log(URL.createObjectURL(file));

	const inputEl = useRef(null);
	return (
		<div className=" flex flex-col gap-2">
			<div>
				{children(file ? URL.createObjectURL(file) : initialSrc, () =>
					inputEl.current.click()
				)}
			</div>
			<div className="flex justify-between items-center">
				<input
					type="file"
					className="hidden"
					ref={inputEl}
					onChange={(e) => {
						if (e.target.files[0]) {
							setFile(e.target.files[0]);
						}
					}}
				/>
				{file ? (
					<>
						<button onClick={() => onSave(file)}>Save</button>
						<button
							onClick={() => {
								inputEl.current.value = "";
								setFile(null);
							}}
						>
							Cancel
						</button>
					</>
				) : (
					<button
						className="mx-auto"
						onClick={() => inputEl.current.click()}
					>
						Edit
					</button>
				)}
			</div>
		</div>
	);
}
