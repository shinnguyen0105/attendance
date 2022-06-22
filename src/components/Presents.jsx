import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
function AttendanceTable() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);

		axios
			.get("/students")
			.then((res) => {
				if (isMounted) {
					if (isMounted) {
						setData(res.data);
					}
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="container margin-bottom">
			{loading ? (
				<LoadingScreen marginTop="200px" />
			) : (
				<div className="text-center">
					{!data.length ? (
						<h2>No one is present yet</h2>
					) : (
						<div className="table-responsive border-bottom">
							<table className="table table-striped table-sm">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Section</th>
										<th className="text-center">Subject</th>
									</tr>
								</thead>
								<tbody>
									{data.map((student) => {
										return (
											<tr key={student._id}>
												<td>{student.classId}</td>
												<td>{student.name}</td>
												<td>{student.section}</td>
												<td className="text-center">{student.subject}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default AttendanceTable;
