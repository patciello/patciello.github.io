document.addEventListener("DOMContentLoaded", () => {
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.15,
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");

				if (entry.target.classList.contains("stat-item")) {
					const counter = entry.target.querySelector(".number");
					if (counter && !counter.classList.contains("counted")) {
						animateValue(counter, 0, parseInt(counter.getAttribute("data-target")), 2000);
						counter.classList.add("counted");
					}
				}

				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	document.querySelectorAll(".fade-up").forEach((element) => {
		observer.observe(element);
	});

	function animateValue(obj, start, end, duration) {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			obj.innerHTML = Math.floor(easeOutQuart * (end - start) + start);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	function createContactForm() {
		const section = document.createElement("section");
		section.className = "section light-bg contact-section fade-up delay-1";

		const heading = document.createElement("h3");
		heading.textContent = "Contato";
		section.appendChild(heading);

		const form = document.createElement("form");
		form.className = "contact-form";
		form.setAttribute("novalidate", "");

		function buildField(labelText, type, name, placeholder) {
			const wrapper = document.createElement("div");
			wrapper.className = "contact-field";

			const label = document.createElement("label");
			label.htmlFor = name;
			label.textContent = labelText;

			let input;
			if (type === "textarea") {
				input = document.createElement("textarea");
				input.rows = 6;
			} else {
				input = document.createElement("input");
				input.type = type;
			}
			input.name = name;
			input.id = name;
			input.placeholder = placeholder || "";
			input.required = true;
			input.setAttribute("aria-required", "true");

			const error = document.createElement("div");
			error.className = "contact-error";
			error.setAttribute("aria-live", "polite");

			wrapper.appendChild(label);
			wrapper.appendChild(input);
			wrapper.appendChild(error);
			return { wrapper, input, error };
		}

		const nameField = buildField("Nome", "text", "name", "Seu nome");
		const emailField = buildField("E-mail", "email", "email", "seu@exemplo.com");
		const messageField = buildField("Mensagem", "textarea", "message", "Escreva sua mensagem");

		form.appendChild(nameField.wrapper);
		form.appendChild(emailField.wrapper);
		form.appendChild(messageField.wrapper);

		const actions = document.createElement("div");
		actions.className = "contact-actions";
		const submit = document.createElement("button");
		submit.type = "submit";
		submit.className = "contact-submit slide-button";
		submit.textContent = "Enviar mensagem";
		actions.appendChild(submit);
		form.appendChild(actions);

		const success = document.createElement("div");
		success.className = "contact-success";
		success.setAttribute("aria-live", "polite");
		form.appendChild(success);

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			[nameField.error, emailField.error, messageField.error].forEach((el) => (el.textContent = ""));

			let valid = true;
			const nameVal = nameField.input.value.trim();
			const emailVal = emailField.input.value.trim();
			const msgVal = messageField.input.value.trim();

			if (!nameVal) {
				nameField.error.textContent = "Por favor, insira seu nome.";
				valid = false;
			}
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailVal || !emailRegex.test(emailVal)) {
				emailField.error.textContent = "Por favor, insira um e-mail válido.";
				valid = false;
			}
			if (!msgVal) {
				messageField.error.textContent = "Por favor, escreva uma mensagem.";
				valid = false;
			}

			if (!valid) return;

			submit.disabled = true;
			const originalText = submit.textContent;
			submit.textContent = "Enviando...";
			success.textContent = "";

			setTimeout(() => {
				submit.disabled = false;
				submit.textContent = originalText;
				form.reset();
				success.textContent = "Obrigado — sua mensagem foi enviada!";

				setTimeout(() => (success.textContent = ""), 6000);
			}, 1200);
		});

		section.appendChild(form);
		document.body.appendChild(section);
		// garantir que o observer reveja o novo elemento para ativar a animação
		if (typeof observer !== "undefined" && observer && section.classList.contains("fade-up")) {
			observer.observe(section);
		} else {
			section.classList.add("visible");
		}
	}

	createContactForm();
});
