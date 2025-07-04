import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Table = (props) => {
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState(null);
  

  const host = "http://localhost:5000";

  const navigate = useNavigate();

  const handleNavigation = (tourId) => {
    navigate(`/tournament/${tourId}`);
  };
  // const handleEdit = (item) => {
  //   props.setisEdit(true);
  //   setEditId(item._id);
  //   setEditedData({ ...item });
  //    // Clone the data for editing
  // };

  // const handleCancel = () => {
  //  props.setisEdit(false);
  //  setEditId(null);
  //  setEditedData({});
  // };
  
  // const handleChange = (e) => {
  //   setEditedData({ ...editedData, [e.target.name]: e.target.value });
  // };
  
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("You are sure to delete?");
    
    if (isConfirm) {
      const response = await fetch(`${host}/api/cricscore/tournament/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: `${id}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        alert(data.message);
        //refresh table
        props.setRefresh(props.refresh + 1);
      }
    }
  };
  
  const handleEdit = async (item) => {

    //setting boolean true after edit clicked
    props.setisEdit(true);

    //passing data value for edit modal
    props.setEditedData(item)

    // setEditId(item._id);
    // setEditedData({ ...item });
     // Clone the data for editing
    // Call update API or parent method here
    props.openModal();

  };

  //   var _id = editedData._id;
  //   var tournament_name = editedData.tournament_name;
  //   var start_date = editedData.start_date;
  //   var end_date = editedData.end_date;
  //   var locFromMap = editedData.locFromMap;
  //   var venue = editedData.venue;
  //   var location = editedData.location;
  //   var format = editedData.format;
  //   var organizer = editedData.organizer;
  //   var description = editedData.description;

  //   const response = await fetch(`${host}/api/cricscore/tournament/update`, {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: {
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       _id: `${_id}`,
  //       tournament_name: `${tournament_name}`,
  //       start_date: `${start_date}`,
  //       end_date: `${end_date}`,
  //       venue: `${venue}`,
  //       location: `${location}`,
  //       locFromMap: `${locFromMap}`,
  //       format: `${format}`,
  //       organizer: `${organizer}`,
  //       description: `${description}`,
  //     }),
  //   });

  //   const data = await response.json();
  //   alert(data.message);

  //   //refresh table
  //   props.setRefresh(props.refresh + 1);

  //   // Reset state after save
  //   setEditId(null);
  //   setEditedData({});
  // };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tournament Name</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Venue</th>
            <th scope="col">Location</th>
            <th scope="col">Format</th>
            <th scope="col">Organizers</th>
            <th scope="col" colSpan={3}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      item.tournament_name
                    }
                  </td>
                  <td>
                    {
                      new Date(item.start_date).toDateString()
                    }
                  </td>
                  <td>
                    {
                      new Date(item.end_date).toDateString()
                    }
                  </td>
                  <td>
                    {
                      item.venue
                    }
                  </td>
                  <td>
                    {
                      item.location
                    }
                  </td>
                  <td>
                    {
                      item.format
                    }
                  </td>
                  <td>
                    {
                      item.organizer || "-"
                    }
                  </td>
                  <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleNavigation(item._id)}
                      >
                        Setup
                      </button>
                    
                  </td>
                  <td>
                    
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-success"
                      >
                        Edit
                      </button>
                  </td>
                  <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
