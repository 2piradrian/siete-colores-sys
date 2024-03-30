import { AxiosResponse } from "axios";
import { Statistics } from "@/types/types";
import { instance } from "@/adapters/instance";
import { useEffect, useState } from "react";

function useStatistics() {

	const [statistics, setStatistics] = useState<Statistics | undefined>();

	useEffect(() => {
		fetchStatistics().then((data) => setStatistics(data));
	}, []);

	const fetchStatistics = async () => {
		try {
			const response: AxiosResponse<Statistics> = await instance.get("/statistics/");
			return response.data;
		} 
		catch (error) {
			alert("Error al cargar las estadísticas: " + error);
		}
	}

	return {
		statistics
	};
}

export default useStatistics;
