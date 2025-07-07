
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}

window.onload = () => {
  const ctx = document.getElementById('financeChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Revenus entreprise', 'Bénéfice patron'],
        datasets: [{
          label: 'Montants (€)',
          data: [15000, 5993],
          backgroundColor: ['#4bc0c0', '#ff6384']
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  const commandeCtx = document.getElementById('commandeChart');
  if (commandeCtx) {
    const commandeChart = new Chart(commandeCtx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Commandes vs Exercées',
          data: [],
          borderColor: '#36a2eb',
          backgroundColor: '#36a2eb',
          fill: false,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7,
          parsing: false
        }]
      },
      options: {
        parsing: false,
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Exercées'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Commandes'
            },
            beginAtZero: true
          }
        }
      }
    });

    document.getElementById('commandeForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const y = parseInt(document.getElementById('commande').value);
      const x = parseInt(document.getElementById('exerce').value);
      if (!isNaN(x) && !isNaN(y)) {
        commandeChart.data.datasets[0].data.push({x: x, y: y});
        commandeChart.update();
        this.reset();
      }
    });

    document.getElementById("effacerBtn").addEventListener("click", () => {
      commandeChart.data.datasets[0].data = [];
      commandeChart.update();
    });

    document.getElementById("retourBtn").addEventListener("click", () => {
      commandeChart.data.datasets[0].data.pop();
      commandeChart.update();
    });
  }

  document.getElementById("financeAuthForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (document.getElementById("pinFinance").value === "01062025") {
      showSection("finance");
    } else {
      alert("Code incorrect !");
    }
  });

  document.getElementById("commandeAuthForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (document.getElementById("pinCommande").value === "01062025") {
      showSection("commandes");
    } else {
      alert("Code incorrect !");
    }
  });

  document.getElementById("envoyerProblemeBtn").addEventListener("click", function () {
    window.location.href = "mailto:codenova1203@gmail.com?subject=Problème signalé&body=Bonjour, voici les problèmes sélectionnés.";
    showSection("messageContainer");
    setTimeout(() => {
      showSection("home");
    }, 3000);
  });
};
