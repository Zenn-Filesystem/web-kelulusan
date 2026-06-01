const targetDate = new Date("2026-06-02T10:00:00").getTime();

const countdown = setInterval(() => {

  const now = new Date().getTime();

  const distance = targetDate - now;

  if(distance <= 0){

    clearInterval(countdown);

    document
      .getElementById("countdown")
      .style.display = "none";

    document
      .getElementById("formBox")
      .classList.remove("hidden");

    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );

  document.getElementById("days").innerText =
    String(days).padStart(2, "0");

  document.getElementById("hours").innerText =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").innerText =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").innerText =
    String(seconds).padStart(2, "0");

}, 1000);

async function cekKelulusan(){

  const nisn = document
    .getElementById("nisn")
    .value;

  const result = document
    .getElementById("result");

  result.innerHTML = "Loading...";

  try{

    const res = await fetch(
      "http://localhost:3000/api/cek",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ nisn })
      }
    );

    const data = await res.json();

    if(data.error){

      result.innerHTML = `
        <div class="result-box tidak">
          ❌ Data tidak ditemukan
        </div>
      `;

      return;
    }

    if(data.status === "LULUS"){

      result.innerHTML = `
        <div class="result-box lulus">
          🎉 SELAMAT <br><br>
          ${data.nama} <br><br>
          DINYATAKAN LULUS
        </div>
      `;

    }else{

      result.innerHTML = `
        <div class="result-box tidak">
          Tetap semangat ❤️
        </div>
      `;

    }

  }catch(err){

    result.innerHTML = `
      <div class="result-box tidak">
        Server error
      </div>
    `;

  }

}