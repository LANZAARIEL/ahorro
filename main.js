// main.js

// Mostrar formulario al hacer clic
function mostrarFormulario() {
  document.getElementById("gastoForm").style.display = "block";
}

// Referencias a elementos
const form = document.getElementById("gastoForm");
const totalDisplay = document.getElementById("totalDisplay");

// Guardar gasto en Firestore
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const detalle = document.getElementById("detalle").value.trim();
  const monto = parseFloat(document.getElementById("monto").value);
  if (!detalle || isNaN(monto) || monto <= 0) {
    alert("Por favor ingresa un detalle válido y un monto mayor a 0");
    return;
  }
  try {
    await db.collection("gastos").add({
      detalle,
      monto,
      fecha: new Date()
    });
    form.reset();
    form.style.display = "none";
    cargarTotal();
  } catch (error) {
    alert("Error al guardar el gasto: " + error.message);
  }
});

// Cargar total de gastos y mostrar
async function cargarTotal() {
  let total = 0;
  const snapshot = await db.collection("gastos").get();
  snapshot.forEach((doc) => {
    total += doc.data().monto;
  });
  totalDisplay.textContent = `Total disponible: Bs ${total.toFixed(2)}`;
}

// Cargar total al iniciar la app
cargarTotal();
