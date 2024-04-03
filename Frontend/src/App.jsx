// Import our custom CSS
import { useEffect, useState } from 'react';
import './styles.scss';

// {
// 	subArray: 1,
// 	number: 10,
// },
// {
// 	subArray: 1,
// 	number: 11,
// },

function App() {
	const [idToSearch, setIdToSearch] = useState('');
	const [subArray, setSubArray] = useState([]);

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
		await fetch(`http://localhost:4000/csv/${id}`, {
			method: 'GET',
		})
			.then(async r => {
				const data = await r.json();
				if (data.length === undefined) {
					alert('No se encontraron resultados');
				} else {
					setSubArray(data);
				}
			})
			.catch(err => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return (
		<>
			<div className='container py-4 px-3 mx-auto'>
				<div className='d-flex w-100'>
					<div className='mb-3 mr-3 w-75'>
						<label for='idSubArray' className='form-label'>
							Id de subarreglo {idToSearch}
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
								if (idToSearch === '') {
									fetchApi();
								} else {
									fetchApiById(idToSearch);
								}
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
							{subArray &&
								subArray.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.number}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default App;
