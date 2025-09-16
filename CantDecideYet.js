document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".buy-title");
  const subtitle = document.querySelector(".buy-subtitle");
  const optionBtns = document.querySelectorAll(".option-btn");
  const popup = document.getElementById("recommendationPopup");
  const recList = document.getElementById("recommendationList");
  const closeBtn = document.getElementById("closeRecommendation");

  setTimeout(() => title.style.opacity = 1, 200);
  setTimeout(() => subtitle.style.opacity = 1, 1000);

  const recommendations = {
    tummy: ["Boar Dragon's Burning Meat", "Special Elven Salad", "Sake & Beverages"],
    light: ["Omlet Extra Mild (Griffin Edition)", "Halfling Special", "Ceasar's Lofty Bread"],
    works: ["Royalty of Sora", "Quil Lava Gravy", "Sake & Beverages"]
  };

  optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const choice = btn.dataset.choice;
      recList.innerHTML = "";
      recommendations[choice].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        recList.appendChild(li);
      });
      popup.classList.add("show");
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
  });
});
