document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("token-container");
  const inputAmount = document.getElementById("input-amount");
  const outputAmount = document.getElementById("output-amount");
  let selectedToken = null;
  let tokenPrices = {};

  try {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const tokens = await response.json();

    tokens.forEach((token) => {
      tokenPrices[token.currency] = token.price;
      const tokenElement = document.createElement("div");
      tokenElement.classList.add("token");
      tokenElement.dataset.currency = token.currency;
      tokenElement.dataset.price = token.price;

      const img = document.createElement("img");
      img.src = `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${token.currency}.svg`;
      img.alt = token.currency;

      const name = document.createElement("p");
      name.textContent = `${token.currency}: $${token.price}`;

      tokenElement.appendChild(img);
      tokenElement.appendChild(name);
      container.appendChild(tokenElement);

      tokenElement.addEventListener("click", () => {
        document
          .querySelectorAll(".token")
          .forEach((el) => el.classList.remove("selected"));
        tokenElement.classList.add("selected");
        selectedToken = token;
        updateConversion();
      });
    });
  } catch (error) {
    console.error("Error fetching token prices:", error);
  }

  function updateConversion() {
    if (selectedToken) {
      const amount = parseFloat(inputAmount.value) || 0;
      outputAmount.value = amount * selectedToken.price;
    }
  }

  inputAmount.addEventListener("input", updateConversion);
});
