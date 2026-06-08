export default {

	setAuth: async (user) => {
		await storeValue("usuarioLogueado", user);
	},

	logout: async () => {
		await storeValue("usuarioLogueado", null);
		await storeValue("defaultTab", null);

		navigateTo("Login");
	},


	isTecnico: () =>
	appsmith.store.usuarioLogueado?.rol === "TECNICO",

	isOperador: () =>
	appsmith.store.usuarioLogueado?.rol === "OPERADOR",


	setActiveReporte: async (reporte) => {
		await storeValue("activeEditReporte", reporte);
	},

	clearActiveReporte: async () => {
		await storeValue("activeEditReporte", null);
	},

	openEditReporte: async (reporte) => {
		await storeValue("activeEditReporte", reporte);
		showModal("mdl_reporte");
	},

	createReporte: async () => {

		await createReporte.run();

		closeModal("mdl_reporte");

		showAlert("Reporte creado correctamente", "success");

		getReportes.run();
	},

	updateReporte: async () => {

		await updateReporte.run();

		closeModal("mdl_reporte");

		showAlert("Reporte actualizado correctamente", "success");

		getReportes.run();
	},

	openReporteByRole: async (reporte) => {

		await storeValue("activeEditReporte", reporte);

		if (appsmith.store.usuarioLogueado?.rol === "TECNICO") {
			showModal("mdl_reporte");
		} else {
			showAlert("No tienes permisos", "error");
		}
	}

};