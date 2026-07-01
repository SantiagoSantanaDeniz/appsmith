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

			const domain = "dev-2np4xfz0bw7lheit.us.auth0.com";
			const clientId = "JEZzmfchqgtIDasxXr8BMJvd7EBwsTxO";
			const redirectUri = encodeURIComponent("https://teti-grupo-10.appsmith.com/app/reporteincidentes/home-6a09e03b51fac745267a1ce7");

			navigateTo(
				`https://${domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email&acr_values=http://schemas.openid.net/policyidentifiers/mfa`,
				{},
				"SAME_WINDOW"
			);
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
}