const PharmacistDetails = ({ pharmacist }) => {
<<<<<<< HEAD
    const handleClick = async () => {
      console.log("el button etdas");
      console.log(pharmacist._id);
  
=======
    const handleClick = async (event) => {
      console.log("el button etdas");
      console.log(pharmacist._id);
     
  event.preventDefault()
>>>>>>> main
      const url = `/admin/remove-pharmacist?doctorId=${pharmacist._id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
      }
    };
  
    return (
      <>
        <div className="doctordetails">
          <h2>{pharmacist.username}</h2>
          <p>{pharmacist.password}</p>
<<<<<<< HEAD
          <button onClick={handleClick}>delete</button>
=======
          <button type="button" onClick={handleClick}>delete</button>
>>>>>>> main
        </div>
      </>
    );
  };
  
  export default PharmacistDetails;
  