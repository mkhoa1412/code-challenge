import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const useSystemTheme = () => {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	useEffect(() => {
		const onThemeChange = (event: MediaQueryListEvent) => {
			setTheme(event.matches ? "dark" : "light");
		};

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", onThemeChange);

		return () => {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.removeEventListener("change", onThemeChange);
		};
	}, []);
};

export default useSystemTheme;
