export default {

	signIn: async () => {

		const password = InputLoginPassword.text.trim();

		const result = await loginUsuario.run();

		const user = result?.[0];

		if (!user) {
			showAlert("Usuario no encontrado", "error");
			return;
		}

		if (password === String(user.contrasenia).trim()) {

			await storeValue("usuarioLogueado", user);

			showAlert("Login correcto", "success");

			navigateTo("Home");

		} else {
			showAlert("Credenciales incorrectas", "error");
		}
	},

	register: async () => {

		const result = await createUsuario.run();
		const user = result?.[0];

		if (user) {

			await storeValue("usuarioLogueado", user);
			await storeValue("defaultTab", "Sign In");

			showAlert("Usuario creado correctamente", "success");

		} else {
			showAlert("Error al crear usuario", "error");
		}
	},

	setDefaultTab: async (newTab) => {
		await storeValue("defaultTab", newTab);
	}

};