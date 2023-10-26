import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await axios.post("http://localhost:3001/api/products", {
			name: name,
			price: parseInt(price),
		});
		navigate("/");
	};

	return (
		<div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
			<form className="my-10">
				<div className="flex flex-col">
					<div className="mb-5">
						<label className="font-bold text-slate-700">
							Product Name
						</label>
						<input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"
							placeholder="Product Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-5">
						<label className="font-bold text-slate-700">
							Product Price
						</label>
						<input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"
							placeholder="Product Name"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<button onClick={onSubmit} className="py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
						Add Product
					</button>
				</div>
			</form>
		</div>
	);
}