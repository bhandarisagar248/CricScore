import { useState } from "react";

export const CreateTeam = (props) => {
  const host = "http://localhost:5000";
  const tourId = props.id;
  const handleSubmit = async (e) => {

    e.preventDefault();

    const teamName = document.getElementById("teamName").value;
    const squad = document.getElementById("squad").value;
    const teamCoach = document.getElementById("teamCoach").value;

    if(teamName === "" || squad === "" || teamCoach === ""){
      alert("All fields are required");
      return false;
    }

    const response = await fetch(`${host}/api/cricscore/tournament/${tourId}/teams`,{
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        teamName: `${teamName}`,
        squad: `${squad}`,
        teamCoach: `${teamCoach}`
      }),
    });

    const data = await response.json();
    props.setRefresh(props.refresh + 1)
    alert(data.message);
  };

  return (
    <>
      <div className="login" style={{height:'auto'}}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="teamName" placeholder="Team Name" />
            </div>
            <div className="form-group">
              <textarea
                id="squad"
                placeholder="Enter Player's name - seperated by comma(,)"
                cols={50}
                rows={5}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="text" id="teamCoach" placeholder="Team Coach" />
            </div>

            <div className="form-group">
              <input type="submit" className="submit" value="Create Team" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export const EditTeam = (props) => {
  const [teamName,setTeamName]=useState(props.EditTeam.teamName);
  const [squad,setSquad]=useState(props.EditTeam.squad);
  const [teamCoach,setteamCoach]=useState(props.EditTeam.teamCoach);
  const host = "http://localhost:5000";
  // const tourId = props.id;
const handleModalClose = () => {
  props.setIsEdit(false);
  props.setEditTeam(null);
  props.setEditTeamId(null);
};

  const handleEditSubmit = async (e) => {

    e.preventDefault();

    var team_Name =teamName;
    const _squad = squad;
    const team_Coach = teamCoach;

    if(teamName === "" || squad === "" || teamCoach === ""){
      alert("All fields are required");
      return false;
    }

    const response = await fetch(`${host}/api/cricscore/tournament/update/teams`,{
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        _id:`${props.id}`,
        teamName: `${team_Name}`,
        squad: `${_squad}`,
        teamCoach: `${team_Coach}`
      }),
    });

    const data = await response.json();
    props.setRefresh(props.refresh + 1)
    alert(data.message);
  };

  return (
    <>
      <div className="login" style={{height:'auto'}}>
        <div className="form-container">
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <input type="text" id="teamName" placeholder="Team Name" value={teamName} onChange={(e)=>{setTeamName(e.target.value)}} />
            </div>
            <div className="form-group">
              <textarea
              value={squad}
                id="squad"
                placeholder="Enter Player's name - seperated by comma(,)"
                onChange={(e)=>{setSquad(e.target.value)}}
                cols={50}
                rows={5}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="text" id="teamCoach" placeholder="Team Coach" value={teamCoach} onChange={(e)=>{setteamCoach(e.target.value)}} />
            </div>

            <div className="form-group">
              <input type="submit"style={{background:'#0d6efd'}} className="btn btn_primary" value="Update Team" />
              {/* <button className="btn btn_danger" onClick={handleModalClose}>Cancel</button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTeam;
