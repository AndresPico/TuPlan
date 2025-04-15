let chart = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioAhorro");
  const exportarBtn = document.getElementById("exportarBtn");

  document.getElementById("anioActual").textContent = new Date().getFullYear();
  document.getElementById("fechaPDF").textContent = "Fecha: " + new Date().toLocaleDateString();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ingreso = parseFloat(document.getElementById("ingreso").value);
    const meta = parseFloat(document.getElementById("meta").value);
    const gasto = parseFloat(document.getElementById("gasto").value);
    const meses = parseInt(document.getElementById("meses").value);

    if (ingreso <= 0 || gasto < 0 || meses <= 0 || gasto > ingreso) {
      alert("Verifica los valores ingresados.");
      return;
    }

    const ahorroMensual = ingreso - gasto;
    const datos = [];

    for (let i = 1; i <= meses; i++) {
      datos.push({ mes: `Mes ${i}`, ahorro: ahorroMensual * i });
    }

    mostrarGrafico(datos);
    mostrarConsejo(ahorroMensual);
    enviarSimulacionAlServidor(ingreso, meta, gasto, ahorroMensual);
  });

  exportarBtn.addEventListener("click", exportarPDF);
});

function mostrarGrafico(data) {
  const container = document.getElementById("graficoAhorroContainer");
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.id = "graficoCanvas";
  canvas.width = 600;
  canvas.height = 300;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.mes),
      datasets: [{
        label: "Ahorro proyectado ($)",
        data: data.map(d => d.ahorro),
        borderColor: "#f72585",
        backgroundColor: "rgba(247, 37, 133, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#f72585"
      }]
    },
    options: {
      responsive: false,
      animation: false
    }
  });
}

function mostrarConsejo(ahorro) {
  const consejos = document.getElementById("consejos");

  if (ahorro < 100) {
    consejos.textContent = "Intenta reducir tus gastos o aumentar tus ingresos. Un ahorro bajo puede poner en riesgo tu estabilidad financiera.";
  } else if (ahorro < 500) {
    consejos.textContent = "¡Buen comienzo! Considera automatizar tu ahorro para mantener la constancia.";
  } else {
    consejos.textContent = "¡Excelente! Estás en buen camino para lograr tus metas financieras.";
  }
}

function exportarPDF() {
  const contenido = document.getElementById("contenidoPDF");

  html2canvas(contenido, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Encabezado
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Reporte de TuPlan", pageWidth / 2, 20, { align: "center" });

    // Fecha
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    const fecha = new Date().toLocaleString();
    pdf.text(`Fecha de generación: ${fecha}`, 20, 28);

    // Imagen del contenido
    pdf.addImage(imgData, "PNG", 10, 35, pdfWidth, pdfHeight);

    // Pie de página
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Generado automáticamente por TuPlan © 2025", 20, pageHeight - 10);

    pdf.save(`TuPlan_${new Date().toLocaleDateString()}.pdf`);
  });
}

function enviarSimulacionAlServidor(ingreso, meta, gasto, ahorroMensual) {
  const simulacion = {
    id_usuario: 1, // ← luego esto será dinámico cuando implementes login
    ingreso_mensual: ingreso,
    meta_ahorro: meta,
    gasto_mensual: gasto,
    ahorro_mensual: ahorroMensual
  };

  fetch("http://localhost:3000/api/simulaciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(simulacion)
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Simulación guardada:", data);
      mostrarAlertaGuardado();
    })
    .catch(err => {
      console.error("❌ Error al guardar la simulación:", err);
    });
}

function mostrarAlertaGuardado() {
  Swal.fire({
    title: '¡Guardado con éxito!',
    text: 'Tu simulación ha sido registrada en la base de datos.',
    icon: 'success',
    confirmButtonColor: '#f72585',
    confirmButtonText: 'Perfecto'
  });
}

function obtenerSimulaciones(usuario_id) {
  fetch(`http://localhost:3000/api/simulaciones/${usuario_id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Simulaciones obtenidas", data);
      // Aquí puedes mostrar las simulaciones en el frontend
    })
    .catch((error) => {
      console.error("Error al obtener las simulaciones", error);
    });
}
