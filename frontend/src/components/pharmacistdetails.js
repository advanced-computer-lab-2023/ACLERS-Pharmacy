const PharmacistDetails = ({ pharmacist }) => {
    const handleClick = async (event) => {
      console.log("el button etdas");
      console.log(pharmacist._id);
     
  event.preventDefault()
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
          <button type="button" onClick={handleClick}>delete</button>
        </div>
      </>
    );
  };
  
  export default PharmacistDetails;
  