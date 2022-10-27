let turno = 0;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let findeljuego = false;

let textoVictoriaJugador1 = document.getElementById("textoVictoriaJugador1");
let textoVictoriaJugador2 = document.getElementById("textoVictoriaJugador2");
let turnoDelJugador = document.getElementById("turnoDelJugador");
let datos = document.getElementById("datos");
let datosJugador1 = document.getElementById("datosJugador1");
let datosJugador2 = document.getElementById("datosJugador2");
let datosEmpates = document.getElementById("datosEmpates");
let datosPartidasJugadas = document.getElementById("datosPartidasJugadas");

//Botones menú
let btnIniciar = document.getElementById("iniciar");
let btnReset = document.getElementById("reset");
let btnMuestraDatos = document.getElementById("muestraDatos");
let btnGuardarDatos = document.getElementById("guardarDatos");
let btnCargarDatos = document.getElementById("cargarDatos");
let btnSalir = document.getElementById("salir");

let tablero = (document.getElementById("tablero").style.visibility = "hidden");
let partidasJugadas = 0;
let puntosJugador1 = 0;
let puntosJugador2 = 0;
let empates = 0;
let botones = Array.from(document.getElementsByName("botonesJuego"));

//addEventListener para los botones
botones.forEach((x) => x.addEventListener("click", ponerFicha));
btnIniciar.addEventListener("click", iniciarPartida);
btnReset.addEventListener("click", reset);
btnMuestraDatos.addEventListener("click", muestraDatos);
btnGuardarDatos.addEventListener("click", guardarDatos);
btnCargarDatos.addEventListener("click", cargarDatos);
btnSalir.addEventListener("click", salir);

//Funcion para resetear contadores
function reset() {
  partidasJugadas = 0;
  puntosJugador1 = 0;
  puntosJugador2 = 0;
  empates = 0;
  turnoDelJugador.innerHTML = "";
  document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
  document.getElementById("puntosJugador1").innerHTML = puntosJugador1;
  document.getElementById("puntosJugador2").innerHTML = puntosJugador2;
  document.getElementById("empates").innerHTML = empates;
  botones.forEach((x) => (x.disabled = "false"));
}

//Funcion para mostrar datos
function muestraDatos() {
  document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
  document.getElementById("puntosJugador1").innerHTML = puntosJugador1;
  document.getElementById("puntosJugador2").innerHTML = puntosJugador2;
  document.getElementById("empates").innerHTML = empates;
}
//funcion para guardar datos
function guardarDatos() {
  //comprobamos primero si el navegador permite el almacenamiento local
  if (typeof Storage !== "undefined") {
    localStorage.setItem("partidasJugadas", partidasJugadas);
    localStorage.setItem("puntosJugador1", puntosJugador1);
    localStorage.setItem("puntosJugador2", puntosJugador2);
    localStorage.setItem("empates", empates);
    alert("Guardado correctamente");
  } else {
    alert("Tu navegador no soporta el almacenamiento local");
  }
}

//funcion para cargar datos
function cargarDatos() {
  if (typeof Storage !== "undefined") {
    partidasJugadas = localStorage.getItem("partidasJugadas");
    puntosJugador1 = localStorage.getItem("puntosJugador1");
    puntosJugador2 = localStorage.getItem("puntosJugador2");
    empates = localStorage.getItem("empates");
    alert("Datos cargados correctamente");
    muestraDatos();
  } else {
    alert("Tu navegador no soporta el almacenamiento local");
  }
}

//Funcion salir
function salir() {
  window.open("", "_self", "");
  window.close();
}
//Funcion para iniciar partida
function iniciarPartida() {
  if (
    nombreJugador1.value != "" &&
    nombreJugador2.value != "" &&
    partidasMax % 2 != 0
  ) {
    tablero = document.getElementById("tablero").style.visibility = "visible";
    turnoDelJugador.style.visibility = "visible";
    turnoDelJugador.innerHTML = "Jugador 1";
    botones.forEach((x) => (x.innerHTML = ""));
    botones.forEach((x) => (x.disabled = false));
    turno = 0;
    puestas = 0;
    partidaAcabada = false;
    partidasMax = document.getElementById("partidasMax").value;
  } else {
    alert(
      "Introduce los nombres de los jugadores y una cantidad de partidas IMPAR"
    );
  }
}
//turno jugador 1
function turnoJugador1() {
  if (turno == 0) {
    turnoDelJugador.innerHTML = "Turno de jugador 1:" + nombreJugador1.value;
    turno = 1;
  }
}
//turno jugador 2
function turnoJugador2() {
  if (turno == 1) {
    turnoDelJugador.innerHTML = "Turno de jugador 2:" + nombreJugador2.value;
    turno = 0;
  }
}
//funcion para poner ficha
function ponerFicha(e) {
  if (partidaAcabada == false) {
    if (e.target.innerHTML == "" && turno == 1) {
      e.target.innerHTML = "X";
      comprobarVictoria();
      turnoJugador2();
      puestas++;
    } else if (e.target.innerHTML == "" && turno == 0) {
      e.target.innerHTML = "O";
      comprobarVictoria();
      turnoJugador1();
      puestas++;
    }
  }
}

//Funcion para comprobar victoria del jugador1 o jugador2
function comprobarVictoria() {
  if (
    (botones[0].innerHTML == "X" &&
      botones[1].innerHTML == "X" &&
      botones[2].innerHTML == "X") ||
    (botones[3].innerHTML == "X" &&
      botones[4].innerHTML == "X" &&
      botones[5].innerHTML == "X") ||
    (botones[6].innerHTML == "X" &&
      botones[7].innerHTML == "X" &&
      botones[8].innerHTML == "X") ||
    (botones[0].innerHTML == "X" &&
      botones[3].innerHTML == "X" &&
      botones[6].innerHTML == "X") ||
    (botones[1].innerHTML == "X" &&
      botones[4].innerHTML == "X" &&
      botones[7].innerHTML == "X") ||
    (botones[2].innerHTML == "X" &&
      botones[5].innerHTML == "X" &&
      botones[8].innerHTML == "X") ||
    (botones[0].innerHTML == "X" &&
      botones[4].innerHTML == "X" &&
      botones[8].innerHTML == "X") ||
    (botones[2].innerHTML == "X" &&
      botones[4].innerHTML == "X" &&
      botones[6].innerHTML == "X")
  ) {
    puntosJugador1++;
    partidasJugadas++;
    if (partidasJugadas == partidasMax) {
      botones.forEach((x) => (x.disabled = true));
      btnReset.disabled = false;
      muestraDatos();
      turnoDelJugador.style.visibility = "hidden";
      textoVictoriaJugador1.style.visibility = "visible";
      return;
    }
    resetTablero();
  } else if (
    (botones[0].innerHTML == "O" &&
      botones[1].innerHTML == "O" &&
      botones[2].innerHTML == "O") ||
    (botones[3].innerHTML == "O" &&
      botones[4].innerHTML == "O" &&
      botones[5].innerHTML == "O") ||
    (botones[6].innerHTML == "O" &&
      botones[7].innerHTML == "O" &&
      botones[8].innerHTML == "O") ||
    (botones[0].innerHTML == "O" &&
      botones[3].innerHTML == "O" &&
      botones[6].innerHTML == "O") ||
    (botones[1].innerHTML == "O" &&
      botones[4].innerHTML == "O" &&
      botones[7].innerHTML == "O") ||
    (botones[2].innerHTML == "O" &&
      botones[5].innerHTML == "O" &&
      botones[8].innerHTML == "O") ||
    (botones[0].innerHTML == "O" &&
      botones[4].innerHTML == "O" &&
      botones[8].innerHTML == "O") ||
    (botones[2].innerHTML == "O" &&
      botones[4].innerHTML == "O" &&
      botones[6].innerHTML == "O")
  ) {
    puntosJugador2++;
    partidasJugadas++;
    if (partidasJugadas == partidasMax) {
      botones.forEach((x) => (x.disabled = true));
      muestraDatos();
      turnoDelJugador.style.visibility = "hidden";
      textoVictoriaJugador2.style.visibility = "visible";
      return;
    }
    resetTablero();
  } else if (puestas == 9) {
    textoVictoria.innerHTML = "Empate";
    empates++;
    partidasJugadas++;
    if (partidasJugadas == partidasMax) {
      botones.forEach((x) => (x.disabled = true));
      muestraDatos();
      turnoDelJugador.style.visibility = "hidden";
      if (puntosJugador1 > puntosJugador2) {
        textoVictoriaJugador1.style.visibility = true;
        return;
      } else if (puntosJugador1 < puntosJugador2) {
        textoVictoriaJugador2.style.visibility = true;
        return;
      }
    }
    resetTablero();
  }
}
//Funcion reset
function reset() {
  botones.forEach((x) => (x.innerHTML = ""));
  botones.forEach((x) => (x.disabled = false));
  puntosJugador1 = 0;
  puntosJugador2 = 0;
  partidasJugadas = 0;
  empates = 0;
  puestas = 0;
  turnoDelJugador.style.visibility = "visible";
  textoVictoriaJugador1.style.visibility = "hidden";
  textoVictoriaJugador2.style.visibility = "hidden";
  muestraDatos();
}

//funcion para reset tablero
function resetTablero() {
  puestas = 0;
  botones.forEach((x) => (x.innerHTML = ""));
  muestraDatos();
}
