// Import our custom CSS
import { useEffect, useState } from 'react';
import './styles.scss';

function App() {
	const [idToSearch, setIdToSearch] = useState('');
	const [subArray, setSubArray] = useState([
		{
			subArray: 1,
			number: 10,
		},
		{
			subArray: 1,
			number: 11,
		},
	]);

	const onInputChange = e => {
		setIdToSearch(e.target.value);
	};

	const fetchApi = async () => {
		const response = await fetch('http://localhost:4000/csv', {
			method: 'GET',
		}).catch(err => console.error(err));
		const responseJSON = await response.json();
		setSubArray(responseJSON);
	};

	const fetchApiById = async id => {
		const response = await fetch(`http://localhost:4000/csv/${id}`, {
			method: 'GET',
		}).catch(err => console.error(err));
		const responseJSON = await response.json();
		setSubArray(responseJSON);
	};

	useEffect(() => {
		// fetchApi();
	}, []);

	return (
		<>
			<div className='container py-4 px-3 mx-auto'>
				<div className='d-flex w-100'>
					<div className='mb-3 mr-3 w-75'>
						<label for='idSubArray' className='form-label'>
							Id de subarreglo
						</label>
						<input
							className='form-control'
							id='idSubArray'
							aria-describedby='idHelp'
							onChange={onInputChange}
							value={idToSearch}
						/>
						<div id='idHelp' className='form-text'>
							El valor ingresado será la coincidencia de subarreglo a mostrar
						</div>
					</div>
					<div className='mt-3 w-25'>
						<button
							type='submit'
							style={{ marginLeft: '10px' }}
							onClick={() => {
								fetchApiById(idToSearch);
								setIdToSearch('');
							}}
							className='btn btn-primary mt-3'
						>
							Enviar
						</button>
					</div>
				</div>
				<div className='d-flex w-75'>
					<table class='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>Combinacion de Subarray</th>
								<th scope='col'>Número</th>
							</tr>
						</thead>
						<tbody>
							{subArray.map((item, index) => (
								<tr key={index}>
									<th scope='row'>{item.subArray}</th>
									<td>{item.number}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default App;
