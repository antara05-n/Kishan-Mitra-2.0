 const STATES = {
      "Andhra Pradesh": ["Anantapur", "Guntur", "Visakhapatnam"],
      "Bihar": ["Patna", "Gaya", "Bhagalpur"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    };
    const stateSelect = document.getElementById("stateSelect");
    const districtSelect = document.getElementById("districtSelect");
    const monthSelect = document.getElementById("monthSelect");

    // Populate states
    Object.keys(STATES).forEach(st=>{
      let opt=document.createElement("option");
      opt.value=st; opt.textContent=st;
      stateSelect.appendChild(opt);
    });
    stateSelect.onchange=()=>{
      districtSelect.innerHTML="";
      STATES[stateSelect.value].forEach(d=>{
        let o=document.createElement("option");
        o.value=d; o.textContent=d;
        districtSelect.appendChild(o);
      });
    };
    stateSelect.value="Andhra Pradesh"; stateSelect.onchange();

    // Months
    ["January","February","March","April","May","June","July","August","September","October","November","December"].forEach(m=>{
      let opt=document.createElement("option"); opt.value=m; opt.textContent=m;
      monthSelect.appendChild(opt);
    });

    // Analyze Button
    document.getElementById("analyzeBtn").onclick=()=>{
      document.getElementById("farmScore").textContent="82";
      document.getElementById("cropList").innerHTML="<li>Rice</li><li>Maize</li><li>Pulses</li>";
      document.getElementById("compostList").innerHTML="<li>Rice: Use vermicompost</li><li>Maize: Apply green manure</li><li>Pulses: Add farmyard manure</li>";
      document.getElementById("pestList").innerHTML="<li>Rice: Brown planthopper – Neem spray</li><li>Maize: Stem borer – Pheromone traps</li><li>Pulses: Aphids – Soap solution</li>";
      document.getElementById("oneLine").textContent="Rice and Maize are most suitable for your soil and season.";
      document.getElementById("tempVal").textContent="28°C";
      document.getElementById("humidityVal").textContent="65%";
    };

    document.getElementById("clearBtn").onclick=()=>{
      document.getElementById("farmScore").textContent="—";
      document.getElementById("cropList").innerHTML="";
      document.getElementById("compostList").innerHTML="";
      document.getElementById("pestList").innerHTML="";
      document.getElementById("oneLine").textContent="—";
      document.getElementById("tempVal").textContent="—";
      document.getElementById("humidityVal").textContent="—";
    };

    // Voice recognition setup
    const micBtn=document.getElementById("micBtn");
    const voiceStatus=document.getElementById("voiceStatus");
    let recognizing=false;
    let recognition;
    if('webkitSpeechRecognition' in window){
      recognition=new webkitSpeechRecognition();
      recognition.continuous=false;
      recognition.interimResults=false;
      recognition.lang=document.getElementById("langSelect").value;
      recognition.onstart=()=>{voiceStatus.textContent="Listening..."; recognizing=true;};
      recognition.onend=()=>{voiceStatus.textContent="Idle"; recognizing=false;};
      recognition.onresult=(e)=>{
        const speech=e.results[0][0].transcript;
        voiceStatus.textContent="Heard: "+speech;
      };
    }
    micBtn.onclick=()=>{
      if(!recognition) return alert("Speech recognition not supported");
      if(!recognizing) recognition.start();
      else recognition.stop();
    };
    document.getElementById("langSelect").onchange=(e)=>{
      if(recognition) recognition.lang=e.target.value;
    };
