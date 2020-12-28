import React from "react";
import "./AppComponent.css";

const AppComponent = () => {
	const [description, setDescription] = React.useState("");
	const [isfulltime, setIsFullTime] = React.useState(false);
	const [location, setLocation] = React.useState("");
	const [data, setData] = React.useState([]);

	console.log(data);

	React.useEffect(() => {
		console.log("rendered");

		const getData = async () => {
			try {
				const response = await fetch(
					`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${description}&full_time=${isfulltime}&location=${location}`
				);
				const result = await response.json();
				console.log(result);
				setData(result);
			} catch (e) {
				console.log(e);
			}
		};
		getData();
	}, [description, isfulltime, location]);

	return (
		<div className="appComponent">
			<div className="header--tag">
				<h1 className="header--tag__in">GitHub Jobs</h1>
			</div>
			<div className="inputFields">
				<div className="description">
					<label>Description</label>
					<input
						type="text"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</div>
				<div className="location">
					<label>Location</label>
					<input
						type="text"
						onChange={(e) => {
							setLocation(e.target.value);
						}}
					/>
				</div>
				<div className="checkbox">
					<label>Only Full Time</label>
					<input
						type="checkbox"
						onClick={() => {
							setIsFullTime(!isfulltime);
						}}
					/>
				</div>
			</div>

			<div className="cards">
				{data.map((el, index) => (
					<div className="card" key={index}>
						<div className="card--header">
							<div className="card--header__name">
								{el.title} - <small>{el.company}</small>
							</div>
							<div className="card--header__image">
								<img
									src={el.company_logo}
									className="card--header__imageIn"
									alt="company logo"
								/>
							</div>
						</div>
						<div className="card--details">
							<div className="card--date">{el.created_at}</div>
							<div className="card--jobposition">
								{el.type} in {el.location}
							</div>
							<a href={el.company_url} className="card--link">
								{el.company_url}
							</a>
							<div className="btn">
								<button className="card--button">View Details</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AppComponent;
