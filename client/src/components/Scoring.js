import { useState,useEffect, } from "react";
import'../css/scoring.css';
import Select from 'react-select';
import { useLocation,useNavigate } from "react-router-dom";
import '../css/loading.css';
export const Scoring=()=>{


   const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const navigate = useNavigate(); 

  

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

  }, [user]);

    const host = "http://localhost:5000";

  const location=useLocation();
 const { match }= location.state || {};

 const [loading, setLoading] = useState(true);
 const [progress, setProgress] = useState(0);

const teamA_id=match.teamA_id;
const teamB_id=match.teamB_id;

 console.log(match.tournament_name);
 console.log(match._id);
 console.log("Team A id:"+match.teamA_id);
 console.log("Team B id:"+match.teamA_id);

  const [TeamA,setTeamA]=useState(null);
  const [TeamB,setTeamB]=useState(null);




  // setting the Team na to board if state is present
  // {match? setTeamA(match.TeamA) : setTeamA('Team A')};
  // {match? setTeamB(match.TeamA) : setTeamB('Team B')};

  // /:id/get

  //to styling and editing <select> <option>
  const [selectedBastman1, setSelectedBastman1] = useState(null); 
  const [selectedBastman2, setSelectedBastman2] = useState(null); 

  const [Battingoptions,setBattingoptions] = useState(null)
  const [bowlers,setbowlers]=useState(null);
//   [
//   { value: 'Aarif Sheikh', label: 'Aarif Sheikh' },
//   { value: 'Dipendra Singh Airee', label: 'Dipendra Singh Airee' },
//   { value: 'Kushal Bhurtel', label: 'Kushal Bhurtel' },
//   { value: 'Sandeep Lamichhane', label: 'Sandeep Lamichhane' },
// ];

const [selectedbowler, setSelectedbowler] = useState(null); 
//   { value: 'Dipendra Singh Airee', label: 'Dipendra Singh Airee' },
//   { value: 'Kushal Bhurtel', label: 'Kushal Bhurtel' },
//   { value: 'Sandeep Lamichhane', label: 'Sandeep Lamichhane' },
// ];

 const fetchTeamAData = async () => {
  try{

    const response = await fetch(`${host}/api/cricscore/tournament/${teamA_id}/get`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      }
    });
    
    const result = await response.json();
    const team=result.data;
    setTeamA(team);
    
    // 👇 Convert comma-separated squad string to [{value, label}]
    if (team && team.squad) {
      const squadArray = team.squad.split(',').map(player => player.trim());
      const battingOptions = squadArray.map(player => ({
        value: player,
        label: player,
      }));
      setbowlers(battingOptions); // You should have a state for this
    };
  }  catch(error){
    console.log("NO Team id found");
  };

}
 const fetchTeamBData = async () => {
  try{

    const response = await fetch(`${host}/api/cricscore/tournament/${teamB_id}/get`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    
    const result = await response.json();
    const team=result.data;
    setTeamB(team);
    
    
    // 👇 Convert comma-separated squad string to [{value, label}]
    if (team && team.squad) {
      const squadArray = team.squad.split(',').map(player => player.trim());
      const battingOptions = squadArray.map(player => ({
      value: player,
      label: player,
    }));
    setBattingoptions(battingOptions); // You should have a state for this
  };
}
  catch(error){
    console.log("NO Team id found");
  }
}

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
       setProgress(20); // Start slow

    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 200); // Fake loading forward
    try {
      await Promise.all([fetchTeamAData(), fetchTeamBData()]);
      setProgress(100);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
          setTimeout(() => {
        setLoading(false);
        setProgress(0);
        clearInterval(interval);
      }, 400); // Let the bar stay full for a bit
    }
  };

  fetchData();
}, [match]);



  return (
    
    <>
{loading && (
  <div className="loading-bar-container">
    <div className="loading-bar-progress" style={{ width: `${progress}%` }}></div>
  </div>
)}


<div className="login" style={{height: '93vh'}}>
        <div className="form-container">
          <h1 style={{alignItems:'center',textAlign:'center',marginBottom:'3rem',marginTop:'1.5rem'}}> {match ? match.tournament_name : " "}</h1>
            <div id="scoring_head" className="scoring_head">
            <h2 style={{textAlign:'start',color:'#212529'}}>Scoring</h2>
             <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 2fr',justifyContent:'center',alignItems:'center',gap:"0.5rem"}}>
                <span>{ TeamA? TeamA.teamName : 'Team A' }</span>
                <span> vs </span>
                <span>{TeamB ? TeamB.teamName :'Team B'}</span>
             </div>
            </div>
            <div style={{  width:'auto',borderBottom: '2px solid gray', borderWidth:'medium'}}/>
            
            <form>
                <div id="score" className="score">
                    <div><span>Overs :</span><span>3</span><span>.</span><span>2</span></div>
                    <div>|</div>
                    <div><span>Scores :</span><span>27</span><span>/</span><span>2</span></div>
                    <div></div>
                </div>

                <div className="form-group" style={{  display:'grid' ,gridTemplateColumns:'1fr 1fr',gap:'1.5rem' ,zIndex:'4',position:'relative',fontWeight:'500'}}>

<Select
  id="batsman1" name="batsman1"
  options={Battingoptions?Battingoptions:null}
  value={Battingoptions?Battingoptions.find(opt => opt.value === selectedBastman1) || null  :null}
  onChange={(opt) => setSelectedBastman1(opt?.value)}
  isClearable
  placeholder="Select Batsman"
  styles={{
    placeholder: (base) => ({
      ...base,
        menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      color: '#888',
      marginBottom:'10px',
    }),
  }}
  required
/>
<Select
  id="batsman2" name="batsman2"
  options={Battingoptions?Battingoptions:null}
  value={Battingoptions? Battingoptions.find(opt => opt.value === selectedBastman2) || null :null} 
  onChange={(opt) => setSelectedBastman2(opt?.value)}
  isClearable
  placeholder="Select <Batsman>"
  styles={{
    placeholder: (base) => ({
      ...base,
      color: '#888',
        menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      marginBottom:'10px',
    }),
  }}
  required
/>
                </div>
                <div className="form-group" style={{  display:'grid' ,gridTemplateColumns:'1fr 1fr',gap:'1.5rem' ,zIndex:'3',position:'relative',fontWeight:'500'}}>

<Select
  id="bowler" name="bowler"
  options={bowlers?bowlers:null}
  value={bowlers?bowlers.find(opt => opt.value === selectedbowler) || null:null}
  onChange={(opt) => setSelectedbowler(opt?.value)}
  isClearable
  placeholder="Select Bowler"
  styles={{
    placeholder: (base) => ({
      ...base,
        menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      color: '#888',
      marginBottom:'10px',
    }),
  }}
  required
/><button type="button" id="add_run" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="50" height="50">
  <path fill="#EA685E" d="M10,55c0,0,11.3-0.7,15-3s20.3-25.3,22.5-29c2.4-3.7-11.8-9.6-11.8-9.6s-3.3-2.1-5.3-1.1s0.1,4.3,1.6,6.3c1.5,2,0,4.9-3.2,4.4c-1.4-0.2-7-0.9-7-0.9s0.1,3.8-0.8,8.9c-0.9,5.4-1.2,9.4-3.8,12.8S8.7,48.3,8,51S10,55,10,55z"/>
  <path fill="#E64C3C" d="M38.9,14.9l-0.3,0.3c-2.1,3.8-1,8.6,2.5,11l3.2,1.5c1.6-2.2,2.7-3.9,3.2-4.7C49.1,20.5,43,16.9,38.9,14.9z"/>
  <path fill="#F8B319" d="M46,19.3c0,0-7.9,12-9.8,14.8c-1.9,2.8-11,14.5-14,15.9c-3,1.4-14,3.3-14,3.3C8.8,54.4,10,55,10,55s11.3-0.7,15-3c3.7-2.3,20.3-25.3,22.5-29C48.2,21.9,47.4,20.6,46,19.3z"/>
  <path fill="none" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M10,55c0,0,11.3-0.7,15-3s20.3-25.3,22.5-29c2.4-3.7-11.8-9.6-11.8-9.6s-3.3-2.1-5.3-1.1s0.1,4.3,1.6,6.3c1.5,2,0,4.9-3.2,4.4c-1.4-0.2-7-0.9-7-0.9s0.1,3.8-0.8,8.9c-0.9,5.4-1.2,9.4-3.8,12.8S8.7,48.3,8,51S10,55,10,55z"/>
  <polyline fill="#8C623B" points="28.4,55 39.2,42.2 42.6,55 52.4,42.2 56,55"/>
  <polyline fill="none" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" points="28.4,55 39.2,42.2 42.6,55 52.4,42.2 56,55"/>
  <path fill="none" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M8.2,53.3c0,0,11-1.9,14-3.3s12.1-13.1,14-15.9S46,19.3,46,19.3"/>
  <line x1="21.2" y1="29.3" x2="31.9" y2="34.2" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
  <line x1="20.7" y1="32.8" x2="29.9" y2="37.1" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
  <line x1="20.1" y1="36.3" x2="27.8" y2="40" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
  <path d="M41.1,26.3c-3.5-2.5-4.6-7.2-2.5-11" stroke="#2C3E50" strokeWidth="2" strokeDasharray="0,3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
</svg>
Add run</button>

                </div>
                <div className="form-group" style={{  display:'grid' ,gridTemplateColumns:'1fr 1fr',gap:'1.5rem',direction: 'rtl' ,zIndex:'2',position:'relative',fontWeight:'500'}}>

    <button type="button" id="wicket" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="36" height="36">
  <path fill="#111111" d="M125.991 40.945h10.041v10.041c0 5.5 4.46 9.96 9.96 9.96h70.005c5.5 0 9.96-4.46 9.96-9.96V40.945h10.041c5.5 0 9.96-4.46 9.96-9.96s-4.46-9.96-9.96-9.96h-10.041V10.983c0-5.501-4.46-9.96-9.96-9.96h-70.005c-5.5 0-9.96 4.459-9.96 9.96v10.042h-10.041c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96z"/>
  <path fill="#111111" d="M276.002 40.945h10.041v10.041c0 5.5 4.46 9.96 9.96 9.96h70.005c5.5 0 9.96-4.46 9.96-9.96V40.945h10.041c5.5 0 9.96-4.46 9.96-9.96s-4.46-9.96-9.96-9.96h-10.041V10.983c0-5.501-4.46-9.96-9.96-9.96h-70.005c-5.5 0-9.96 4.459-9.96 9.96v10.042h-10.041c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96z"/>
  <path fill="#87CEEB" d="M431.053 451.054h-10.082V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.083c-10.984 0-19.92 8.936-19.92 19.92v350.106h-60.086V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.082c-10.984 0-19.92 8.936-19.92 19.92v350.106h-60.086V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.083c-10.984 0-19.92 8.936-19.92 19.92v350.106H80.947c-10.984 0-19.92 8.936-19.92 19.92v20.083c0 10.984 8.936 19.92 19.92 19.92h350.105c10.984 0 19.92-8.936 19.92-19.92v-20.083c0-10.984-8.936-19.92-19.919-19.92z"/>
  <path fill="#00BFFF" d="M370.967 100.948h30.083v350.106h-30.083V100.948z"/>
  <path fill="#00BFFF" d="M110.949 100.948h30.083v350.106h-30.083V100.948z"/>
  <path fill="#B0E0E6" d="M80.947 491.057v-20.083c110.749 0 228.966 0 350.105 0v20.082c-35.919 0-340.205.001-350.105.001z"/>
</svg>
Wicket</button>

                </div>
                <div className="form-group" style={{  display:'grid' ,gridTemplateColumns:'1fr 1fr',gap:'1.5rem' ,zIndex:'2',position:'relative',fontWeight:'500'}}>

    <button type="button" id="undo_ball" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="36" height="36">
  <circle cx="256" cy="256" r="238" fill="#4DB6AC"/>
  <polygon fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"
    points="168.5,357 230.3,279.4 106.8,279.4"/>
  <path d="M405.2,279.4c0-165.9-236.7-165.9-236.7,0"
    fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

Undo Last Ball</button>

    <button type="button" id="end_inning" className="btn btn-success">
End Inning <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="35" height="35">
  <circle cx="250" cy="245" r="230" fill="#DC2626"/>
  <line x1="190" y1="120" x2="280" y2="350" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round"/>
  <path d="M190,120 
           c30,10 60,0 90,10 
           s60,0 90,10 
           v60 
           c-30,-10 -60,0 -90,-10 
           s-60,0 -90,-10 
           z"
        fill="#FFFFFF" 
        stroke="#FFFFFF" 
        strokeWidth="4" 
        strokeLinejoin="round"/>
  <rect x="270" y="350" width="35" height="10" rx="4" fill="#FFFFFF"/>
</svg></button>

                </div>



            </form>
        </div>
    </div>
</>
)

}