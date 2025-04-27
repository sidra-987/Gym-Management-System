const plans = [
  {
    goal: "weight-loss",
    title: "Breakfast",
    items: ["Oatmeal with berries", "Boiled eggs", "Green tea"],
  },
  {
    goal: "weight-loss",
    title: "Lunch",
    items: ["Grilled chicken breast", "Steamed vegetables", "Brown rice"],
  },
  {
    goal: "muscle-gain",
    title: "Breakfast",
    items: ["Protein shake", "Whole eggs", "Banana", "Peanut butter toast"],
  },
  {
    goal: "muscle-gain",
    title: "Lunch",
    items: ["Grilled salmon", "Quinoa", "Avocado salad"],
  },
  {
    goal: "maintenance",
    title: "Dinner",
    items: ["Chicken wrap", "Mixed salad", "Low-fat yogurt"],
  },
  {
    goal: "maintenance",
    title: "Snacks",
    items: ["Almonds", "Greek yogurt", "Apple slices"],
  },
];

function filterDietPlan() {
  const goal = document.getElementById("goal").value;
  const container = document.getElementById("dietPlans");
  container.innerHTML = "";

  const filteredPlans =
    goal === "all" ? plans : plans.filter((p) => p.goal === goal);

  filteredPlans.forEach((plan) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${plan.title}</h3>
      <ul>${plan.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
    container.appendChild(card);
  });
}

// Load all plans by default
window.onload = filterDietPlan;
